import type { Metadata } from "next";
import "./globals.css";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Short Video Essay & Script Writer",
  description: "AI-Powered Short Form Script Engine",
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
