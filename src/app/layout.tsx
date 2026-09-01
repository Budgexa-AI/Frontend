import type { Metadata, Viewport } from "next";
// @ts-ignore: allow side-effect global CSS import without type declarations
import "../styles/globals.css";
import { dmSans, mono, poppins, fraunces } from "@/lib/fonts";
import * as Sentry from '@sentry/nextjs';

export function generateMetadata(): Metadata {
  const title = "Budgexa - Smart Financial Advisor for Young Adults";
  const description = "Budgexa is an AI-powered personal finance advisor built for young adults. Easily track budgets, manage expenses, and build long-term wealth with tailored financial intelligence.";

  return {
    title,
    description,
    keywords: ["fintech", "AI finance", "budgeting", "savings", "wealth management", "Nigeria", "Gen Z", "personal finance"],
    authors: [{ name: "Budgexa Financial Inc." }],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_NG",
      url: "https://Budgexafinance.com", // Replace with your actual production URL
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

export function generateViewport(): Viewport {
  return {
    themeColor: "#254F22",
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${mono.variable} ${poppins.variable} ${fraunces.variable} font-body min-h-screen bg-Budgexa-beige antialiased`}
      >
        {children}
      </body>
    </html>
  );
}