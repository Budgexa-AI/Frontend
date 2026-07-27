import type { Metadata } from "next";
// @ts-ignore: allow side-effect global CSS import without type declarations
import "../styles/globals.css";
import { dmSans, mono } from "@/lib/fonts";
import * as Sentry from '@sentry/nextjs';

export function generateMetadata(): Metadata {
  const title = "Rayo AI - Smart Financial Advisor for Young Adults";
  const description = "Rayo AI is an AI-powered personal finance advisor built for young adults. Easily track budgets, manage expenses, and build long-term wealth with tailored financial intelligence.";

  return {
    title,
    description,
    keywords: ["fintech", "AI finance", "budgeting", "savings", "wealth management", "Nigeria", "Gen Z", "personal finance"],
    authors: [{ name: "Rayo Financial Inc." }],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_NG",
      url: "https://rayo-prototype-frontend.vercel.app", // Replace with your actual production URL
    },
    themeColor: "#254F22",
    icons: {
      icon: [
        { url: "/logo.svg", type: "image/svg+xml" },
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
      <body
        className={`${dmSans.variable} ${mono.variable} font-body min-h-screen bg-rayo-beige antialiased`}
      >
        {children}
      </body>
    </html>
  );
}