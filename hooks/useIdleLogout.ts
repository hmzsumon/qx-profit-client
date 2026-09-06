// hooks/useIdleLogout.ts
"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { useLogoutUserMutation } from "@/redux/features/auth/authApi";
import { logoutUser as logoutAction } from "@/redux/features/auth/authSlice";

const IDLE_MS = 12 * 60 * 60 * 1000; // 12 hours
const LOGIN_URL = "/register-login?tab=signin";
const HIDDEN_AT_KEY = "qx_hidden_at";
const LOGOUT_BROADCAST_KEY = "qx_logout";

const ACTIVITY_EVENTS = [
  "mousemove",
  "keydown",
  "pointerdown",
  "scroll",
  "touchstart",
] as const;

/**
 * Signs the user out after 12 hours with no activity, when the tab has
 * been hidden longer than that, or when another tab signs out.
 */
export function useIdleLogout() {
  const dispatch = useDispatch();
  const [logout] = useLogoutUserMutation();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const doLogout = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      try {
        localStorage.setItem(LOGOUT_BROADCAST_KEY, String(Date.now()));
      } catch {}
      logout(undefined)
        .unwrap()
        .catch(() => {})
        .finally(() => {
          dispatch(logoutAction());
          window.location.assign(LOGIN_URL);
        });
    };

    const arm = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(doLogout, IDLE_MS);
    };

    const onActivity = () => {
      if (document.visibilityState === "hidden") return;
      arm();
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        try {
          localStorage.setItem(HIDDEN_AT_KEY, String(Date.now()));
        } catch {}
        if (timerRef.current) clearTimeout(timerRef.current);
        return;
      }
      // back to visible: logout if we were away too long
      let hiddenAt = 0;
      try {
        hiddenAt = Number(localStorage.getItem(HIDDEN_AT_KEY) || 0);
      } catch {}
      if (hiddenAt && Date.now() - hiddenAt >= IDLE_MS) {
        doLogout();
        return;
      }
      arm();
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === LOGOUT_BROADCAST_KEY && e.newValue) doLogout();
    };

    ACTIVITY_EVENTS.forEach((ev) =>
      window.addEventListener(ev, onActivity, { passive: true }),
    );
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("storage", onStorage);
    arm();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      ACTIVITY_EVENTS.forEach((ev) =>
        window.removeEventListener(ev, onActivity),
      );
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("storage", onStorage);
    };
  }, [dispatch, logout]);
}
