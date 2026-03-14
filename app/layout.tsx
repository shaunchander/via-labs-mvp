import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Via — Skin That Knows You",
  description:
    "AI-powered skin analysis, product grading, and expert consultations. Join the Via waitlist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body className="antialiased">{children}</body>
    </html>
  );
}
