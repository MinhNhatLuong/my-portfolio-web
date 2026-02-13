"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/language-context";
import { dictionaries } from "@/constants/translations";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const t = dictionaries[language].navbar;

  // Check if we are on the homepage to apply transparent styling
  const isHomePage = pathname === "/";

  const navItems = [
    { name: t.home, href: "/" },
    { name: t.about, href: "/about" },
    { name: t.portfolio, href: "/projects" },
    { name: t.gallery, href: "/gallery" },
    { name: t.contact, href: "/contact" },
  ];

  const labelMap = {
    en: "Language",
    vi: "Ngôn ngữ",
    ja: "言語",
  };

  /**
   * Toggles the theme using the View Transitions API for a circular reveal effect.
   * Falls back to standard toggle if the API is not supported.
   */
  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(document as any).startViewTransition) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    // Calculate the distance to the furthest corner to ensure full coverage
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transition = (document as any).startViewTransition(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          // Target the new view pseudo-element
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  const cycleLanguage = () => {
    if (language === "en") setLanguage("vi");
    else if (language === "vi") setLanguage("ja");
    else setLanguage("en");
  };

  return (
    <nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-500
        ${
          isHomePage
            ? "border-transparent bg-transparent" // Transparent on Home
            : "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" // Solid/Blurred on others
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* change your name here */}
          <Link
            href="/"
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500"
          >
            Asahi.dev
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                  pathname === item.href
                    ? "text-blue-500 font-bold"
                    : "text-foreground/60"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="flex items-center space-x-2 border-l pl-4 border-border/40">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative p-2 rounded-full hover:bg-accent transition-colors group"
                aria-label="Toggle Theme"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
                <Moon className="absolute top-2 left-2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
              </button>

              {/* Language Toggle */}
              <button
                onClick={cycleLanguage}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-accent text-xs font-bold border border-border/50"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{language.toUpperCase()}</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 relative hover:bg-accent rounded-full transition-colors"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
              <Moon className="absolute top-2 left-2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border/40 bg-background/95 backdrop-blur overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground/70 hover:bg-accent/50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="mt-4 pt-4 border-t border-border/40">
                <button
                  onClick={cycleLanguage}
                  className="flex w-full items-center justify-center space-x-2 rounded-md bg-accent/50 py-3 font-bold hover:bg-accent transition-colors"
                >
                  <Globe size={18} />
                  <span>
                    {labelMap[language]}: {language.toUpperCase()}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}