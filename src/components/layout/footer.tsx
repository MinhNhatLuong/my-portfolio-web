"use client";

export function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-gray-500 mt-auto relative z-10 backdrop-blur-sm">
      © {new Date().getFullYear()} Asahi.dev
    </footer>
  );
}