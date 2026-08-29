import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { env } from "@/lib/env";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppFloatButton } from "@/components/layout/whatsapp-float-button";
import { SanityLive } from "@/lib/sanity/live";
import { getSiteSettings } from "@/lib/sanity/queries";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  const title = siteSettings?.seoTitle || siteSettings?.siteTitle || "Alia Noor Fitness Coaching";
  const description =
    siteSettings?.seoDescription ||
    "Certified personal training and fitness coaching with Alia Noor, South Delhi.";

  return {
    metadataBase: new URL(env.siteUrl),
    title: {
      default: title,
      template: `%s | ${siteSettings?.siteTitle ?? "Alia Noor Fitness Coaching"}`,
    },
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: "/",
      siteName: siteSettings?.siteTitle ?? "Alia Noor Fitness Coaching",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const siteSettings = await getSiteSettings();

  // Fallback contact details so the footer/WhatsApp button never crash or
  // show "undefined" if Site Settings hasn't been created in Sanity yet.
  // These are NOT displayed as fake content — they're only used if the
  // singleton document is genuinely missing during setup.
  const siteTitle = siteSettings?.siteTitle ?? "Alia Noor Fitness";
  const location = siteSettings?.location ?? "South Delhi, India";
  const email = siteSettings?.email ?? "";
  const whatsappNumber = siteSettings?.whatsappNumber ?? "";
  const profession = siteSettings?.profession ?? "Certified Personal Trainer";

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-canvas text-ink">
        <SiteHeader whatsappNumber={whatsappNumber} />
        <main className="flex-1">{children}</main>
        <SiteFooter
          siteTitle={siteTitle}
          location={location}
          email={email}
          whatsappNumber={whatsappNumber}
          profession={profession}
        />
        {whatsappNumber ? (
          <WhatsAppFloatButton whatsappNumber={whatsappNumber} />
        ) : null}
        {/*
          Opens a live event connection to Sanity so that when a document is
          published in Studio, the cached tags affected by that change are
          revalidated on the running production server immediately — no
          Vercel redeploy required. See lib/sanity/live.ts.
        */}
        <SanityLive />
      </body>
    </html>
  );
}
