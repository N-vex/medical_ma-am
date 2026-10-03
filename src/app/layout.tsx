import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Mediwell | Better care starts with a good match",
    template: "%s | Mediwell",
  },
  description: "Explore a healthcare directory preview with sample provider profiles, specialty discovery and appointment-request flows.",
  openGraph: {
    title: "Mediwell | Better care starts with a good match",
    description: "A healthcare directory preview for thoughtful care discovery.",
    siteName: "Mediwell",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
