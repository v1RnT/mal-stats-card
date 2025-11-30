import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyAnimeList Stats Card",
  description: "Made by v1RnT on Github",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
