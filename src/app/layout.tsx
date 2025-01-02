import type { Metadata } from "next";
import { Instrument_Serif } from 'next/font/google';
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

const panchang = localFont({
  src: [
    {
      path: "./fonts/Panchang.ttf",
      weight: "400",
      style: "regular",
    },
  ],
  display: "swap",
  variable: "--font-panchang",
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  title: "0xff.design",
  description: "Design Explorations",
  openGraph: {
    title: "0xff.design",
    description: "Design Explorations",
    url: "https://0xff.design",
    siteName: "0xff.design",
    locale: "en-US",
    type: "website",
    images: [
      {
        url: "https://i.ibb.co/jhRQqQ4/0xff.jpg",
        width: 1263,
        height: 675,
        alt: "0xff.design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@GokulaDotDev",
    title: "0xff.design",
    description: "Design Explorations",
    images: "https://i.ibb.co/jhRQqQ4/0xff.jpg",
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
        className={`${minimalMono.variable} ${panchang.variable} ${instrumentSerif.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
