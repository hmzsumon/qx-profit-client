import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Qx Broker",
    short_name: "Qx Broker",
    description: "Qx Broker trading platform",
    // installed app opens on the sign-in screen; the site root stays the
    // marketing home for regular browsers
    start_url: "/register-login?tab=signin",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0B0D12",
    theme_color: "#0B0D12",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
