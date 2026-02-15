"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

import { useLanguage } from "@/context/language-context";
import { dictionaries } from "@/constants/translations";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  const router = useRouter();
  const { language } = useLanguage();
  
  // Lấy data đa ngôn ngữ từ file chung
  const t = dictionaries[language].notFound;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl md:text-[150px] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 drop-shadow-sm">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 mt-4"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {t.title}
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white transition-all rounded-full bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg shadow-blue-500/20 active:scale-95 w-full sm:w-auto"
            >
              <Home size={18} />
              {t.goHome}
            </Link>
            
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all rounded-full text-foreground bg-secondary hover:bg-secondary/80 active:scale-95 w-full sm:w-auto"
            >
              <ArrowLeft size={18} />
              {t.goBack}
            </button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}