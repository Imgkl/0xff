import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

const minimalMono = localFont({
  src: [
    {
      path: "./fonts/Minimal-Mono-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/Minimal-Mono-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Minimal-Mono-Regular.otf",
      weight: "400",
      style: "normal",
    }
  ],
  display: "swap",
  variable: "--font-minimal-mono",
  preload: true,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "0xFF [dot] Design",
  description: "⌘ + C and ⌘ + V your next component.",
  openGraph: {
    title: "0xFF [dot] Design",
    description: "⌘ + C and ⌘ + V your next component.",
    url: "https://0xff.design",
    siteName: "0xFF.design",
    locale: "en-US",
    type: "website",
    images: [
      {
        url: "https://i.ibb.co/7tCfFx4/0xff.png",
        width: 1263,
        height: 675,
        alt: "0xFF.design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@GokulaDotDev",
    title: "0xFF [dot] Design",
    description: "⌘ + C and ⌘ + V your next component.",
    images: "https://i.ibb.co/7tCfFx4/0xff.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${minimalMono.variable} antialiased`}>
      <body
        className={`${minimalMono.variable} ${geistMono.variable} ${geistSans.variable}`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
