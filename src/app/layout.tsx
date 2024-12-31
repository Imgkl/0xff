import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const panchang = localFont({
  src: [
    {
      path: './fonts/Panchang.ttf',
      weight: '300',
      style: 'normal',
    }
  ],
  display: 'swap',
  variable: '--font-panchang',
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
    <html lang="en" className={`${panchang.variable}`}>
      <body className="antialiased bg-white m-0 p-0 overflow-hidden">{children}</body>
    </html>
  );
}
