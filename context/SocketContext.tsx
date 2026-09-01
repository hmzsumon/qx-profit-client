"use client";

import socketUrl from "@/config/socketUrl";
import { apiSlice } from "@/redux/features/api/apiSlice";
import { SocketUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

interface iSocketContextType {
  socket: Socket | null;
  isSocketConnected: boolean;
  onlineUsers: SocketUser[];
}

export const SocketContext = createContext<iSocketContextType | null>(null);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useSelector((state: any) => state.auth);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<SocketUser[]>([]);
  const dispatch = useDispatch();

  /* ── connect + join the user's room ── */
  useEffect(() => {
    if (!user || !user._id) return;

    const newSocket = io(socketUrl, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });

    const joinRoom = () => {
      newSocket.emit("join-room", user._id);
      setSocket(newSocket);
      setIsSocketConnected(true);
    };

    newSocket.on("connect", joinRoom);
    newSocket.on("disconnect", () => setIsSocketConnected(false));
    newSocket.on("connect_error", (err) => {
      console.warn("[socket] connect_error:", err?.message || err);
    });

    return () => {
      newSocket.removeListener("connect", joinRoom);
      newSocket.disconnect();
      setSocket(null);
      setIsSocketConnected(false);
    };
  }, [user?._id]);

  /* ── runtime listeners: every notice pushes to the UI live ── */
  useEffect(() => {
    if (!socket) return;

    const onUsers = (users: SocketUser[]) => setOnlineUsers(users);

    // Any per-user notification (deposit / withdraw / KYC / rank / wallet …):
    // refresh the bell count + list, and the KYC banner.
    const onNewNotif = () => {
      dispatch(
        apiSlice.util.invalidateTags([
          "MyUnreadNotifications",
          "MyUnreadNotificationsCount",
          "Kyc",
        ]),
      );
    };
    const onCount = () => {
      dispatch(apiSlice.util.invalidateTags(["MyUnreadNotificationsCount"]));
    };

    // Show the message immediately, without opening the bell.
    const onUserNotification = (evt: { message?: string }) => {
      if (evt?.message) toast(evt.message, { icon: "🔔" });
    };

    // Admin created / updated an announcement -> refresh the feed for everyone.
    const onAnnouncement = () => {
      dispatch(apiSlice.util.invalidateTags(["Announcements"]));
      toast("New announcement", { icon: "📣" });
    };

    socket.on("getUsers", onUsers);
    socket.on("notifications:new", onNewNotif);
    socket.on("notifications:count", onCount);
    socket.on("user-notification", onUserNotification);
    socket.on("announcement:new", onAnnouncement);

    return () => {
      socket.off("getUsers", onUsers);
      socket.off("notifications:new", onNewNotif);
      socket.off("notifications:count", onCount);
      socket.off("user-notification", onUserNotification);
      socket.off("announcement:new", onAnnouncement);
    };
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, isSocketConnected, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx)
    throw new Error("useSocket must be used within a SocketContextProvider");
  return ctx;
};
