import type { Metadata } from "next";
// @ts-ignore: allow side-effect global CSS import without type declarations
import "../styles/globals.css";
import { dmSans, mono } from "@/lib/fonts";
import * as Sentry from "@sentry/nextjs";

export function generateMetadata(): Metadata {
  return {
    title: "Rayo AI",
    description:
      "Rayo AI is a financial intelligence platform with a public landing site and a prototype product dashboard.",
    keywords: ["fintech", "AI finance", "budgeting", "savings", "Nigeria", "Gen Z"],
    authors: [{ name: "Rayo Financial Inc." }],
    openGraph: {
      title: "Rayo AI",
      description:
        "Public landing site and prototype product dashboard for Rayo AI.",
      type: "website",
      locale: "en_NG",
    },
    themeColor: "#254F22",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/logo.svg",    type: "image/svg+xml" },
      ],
      apple: "/logo.svg",
    },
    other: {
      ...Sentry.getTraceData(),
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${dmSans.variable} ${mono.variable} font-body min-h-screen bg-rayo-beige antialiased`}
      >
        {children}
      </body>
    </html>
  );
}