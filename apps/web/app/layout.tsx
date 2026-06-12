import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { CookieBanner } from "@/components/layout/cookie-banner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eventhivez.com"),
  title: {
    template: "%s | EventHivez",
    default: "EventHivez — Decentralized Event Ticketing on Stellar",
  },
  description:
    "Host events, sell tickets, and get paid instantly in USDC on Stellar. No middlemen, no delays — just you and your community.",
  keywords: ["events", "ticketing", "stellar", "USDC", "blockchain", "decentralized", "soroban"],
  openGraph: {
    title: "EventHivez — Decentralized Event Ticketing on Stellar",
    description:
      "Host events, sell tickets, and get paid instantly in USDC on Stellar.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EventHivez — Decentralized Event Ticketing",
      },
    ],
    type: "website",
    siteName: "EventHivez",
  },
  twitter: {
    card: "summary_large_image",
    title: "EventHivez — Decentralized Event Ticketing on Stellar",
    description: "Host events, sell tickets, and get paid instantly in USDC.",
  },
};

import { Suspense } from "react";
import LoadingBar from "@/components/ui/loading-bar";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-dark-deep text-white`}>
        <Providers>
          <Suspense fallback={null}>
            <LoadingBar />
          </Suspense>
          <Toaster position="top-right" richColors theme="dark" />
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
