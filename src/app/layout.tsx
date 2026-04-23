import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { GlobalBackground } from "@/components/layout/global-background";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "WarpTalk — AI-Powered Meeting Translation",
    template: "%s | WarpTalk",
  },
  description:
    "Real-time multilingual meeting translation and transcription platform for global teams.",
  keywords: [
    "meeting translation",
    "real-time transcription",
    "multilingual",
    "AI",
    "WarpTalk",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-screen font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-700 ease-in-out">
        <Providers>
          <GlobalBackground />
          {children}
        </Providers>
      </body>
    </html>
  );
}
