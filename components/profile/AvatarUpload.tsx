"use client";

import {
  useRemoveAvatarMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/auth/authApi";
import { CircleUserRound, Camera } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// Square-crop + downscale to <=512px, returns a jpeg File.
async function normalize(file: File): Promise<File> {
  const img = document.createElement("img");
  const url = URL.createObjectURL(file);
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = rej;
    img.src = url;
  });
  const side = Math.min(img.width, img.height);
  const out = Math.min(512, side);
  const canvas = document.createElement("canvas");
  canvas.width = out;
  canvas.height = out;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    img,
    (img.width - side) / 2,
    (img.height - side) / 2,
    side,
    side,
    0,
    0,
    out,
    out,
  );
  URL.revokeObjectURL(url);
  const blob: Blob = await new Promise((res) =>
    canvas.toBlob((b) => res(b as Blob), "image/jpeg", 0.9),
  );
  return new File([blob], "avatar.jpg", { type: "image/jpeg" });
}

export default function AvatarUpload({ size = 72 }: { size?: number }) {
  const { user } = useSelector((s: any) => s.auth);
  const inputRef = useRef<HTMLInputElement>(null);
  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();
  const [removeAvatar, { isLoading: removing }] = useRemoveAvatarMutation();
  const [busy, setBusy] = useState(false);

  const pick = () => inputRef.current?.click();

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setBusy(true);
    try {
      const norm = await normalize(f);
      const fd = new FormData();
      fd.append("avatar", norm);
      await updateAvatar(fd).unwrap();
      toast.success("Profile picture updated");
    } catch (err: any) {
      toast.error(err?.data?.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const loading = busy || isLoading || removing;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={pick}
        disabled={loading}
        className="relative overflow-hidden rounded-full border border-neutral-700 bg-neutral-800"
        style={{ width: size, height: size }}
        aria-label="Change profile picture"
      >
        {user?.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatar}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-neutral-400">
            <CircleUserRound size={size * 0.6} />
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-black/50 py-0.5 text-white">
          <Camera size={14} />
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onFile}
        className="hidden"
      />

      {user?.avatar && (
        <button
          type="button"
          onClick={async () => {
            try {
              await removeAvatar().unwrap();
            } catch {
              toast.error("Could not remove");
            }
          }}
          disabled={loading}
          className="text-xs text-neutral-400 underline hover:text-neutral-200"
        >
          Remove
        </button>
      )}
    </div>
  );
}
