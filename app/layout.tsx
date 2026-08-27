import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { env } from "@/lib/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Placeholder copy — final title, description, and OG/Twitter assets are
// written in a later phase once the site's content and design are defined.
export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: "Alia Noor Fitness Coaching",
    template: "%s | Alia Noor Fitness Coaching",
  },
  description:
    "Certified personal training and fitness coaching with Alia Noor, South Delhi.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Alia Noor Fitness Coaching",
    title: "Alia Noor Fitness Coaching",
    description:
      "Certified personal training and fitness coaching with Alia Noor, South Delhi.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alia Noor Fitness Coaching",
    description:
      "Certified personal training and fitness coaching with Alia Noor, South Delhi.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
