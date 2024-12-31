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
  title: "0xff",
  description: "Design. Develop. Deploy.",
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
