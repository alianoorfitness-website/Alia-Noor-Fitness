import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

import { env } from "@/lib/env";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppFloatButton } from "@/components/layout/whatsapp-float-button";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
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
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-canvas text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppFloatButton />
      </body>
    </html>
  );
}
