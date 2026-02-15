import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://asahiminh.vercel.app"),
  title: "Asahi Portfolio",
  description:
    "Personal portfolio of Asahi. Showcasing software development projects and photography gallery.",
  keywords: [
    "Asahi",
    "Nhật",
    "Portfolio",
    "Software Engineer",
    "Photographer",
    "Cosplay",
    "Next.js",
    "Spring Boot",
  ],
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Asahi Portfolio",
    description:
      "Personal portfolio of Asahi. Showcasing software development projects and photography gallery.",
    url: "https://asahiminh.vercel.app", // Change into your link
    siteName: "Asahi Portfolio",
    images: [
      {
        url: "/opengraph.png", // Ensure the file is in your public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}