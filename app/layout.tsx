import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageTransition } from "@/components/page-transition";
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
  metadataBase: new URL("https://portfolio-example.vercel.app"),
  title: {
    default: "Christopher Kopiwoda | Portfolio",
    template: "%s | Christopher Kopiwoda",
  },
  description: "Mechanical engineering, software, and research portfolio.",
  openGraph: {
    title: "Christopher Kopiwoda | Portfolio",
    description: "Mechanical engineering, software, and research portfolio.",
    type: "website",
    url: "https://portfolio-example.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Kopiwoda | Portfolio",
    description: "Mechanical engineering, software, and research portfolio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-background text-foreground">
          <SiteHeader />
          <PageTransition>{children}</PageTransition>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
