import SocketProvider from "@/providers/SocketProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import StoreProvider from "./StoreProvider";
import Providers from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Upbit - Trade",
  description: "Trade on your favorite trading platforms with Upbit Trade",
  openGraph: {
    title: "Upbit - Trade",
    description: "Trade on your favorite trading platforms with Upbit Trade",
    url: "https://www.upbittrade.com/",
    siteName: "Upbit",
    images: [
      {
        url: "https://www.upbittrade.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Upbit Trade",
      },
    ],
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: "#0B0D12" }} // ⬅️ background এখানে
        suppressHydrationWarning={true}
      >
        <StoreProvider>
          <SocketProvider>
            <Providers>{children}</Providers>
          </SocketProvider>
        </StoreProvider>

        <Toaster />
      </body>
    </html>
  );
}
