import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: false,
});

export const metadata: Metadata = {
  title: "SplitTubeYT - Youtube Video Split Testing",
  description: "SplitTubeYT is a youtube video split testing application, which you can use to get more engagement on your videos.",
  keywords: ["youtube seo", "youtube split testing", "youtube video views", "grow on youtube", "get more views", "split testing service", "ab testing youtube", "get more views on youtube"],
  applicationName: "SplitTubeYT"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} antialiased bg-slate-50 container m-auto`}
        >
          <Navbar />
          <main>{children}</main>
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
