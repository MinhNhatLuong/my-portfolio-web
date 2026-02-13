"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main Content Area
        - On Homepage: No top padding allows Hero Image to extend behind Navbar.
        - Other Pages: Standard padding to prevent content from being hidden.
      */}
      <main className={`flex-grow flex flex-col ${isHomePage ? "" : "pt-16"}`}>
        {children}
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}