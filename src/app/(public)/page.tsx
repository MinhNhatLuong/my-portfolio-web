"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Typewriter from "typewriter-effect";

import { useLanguage } from "@/context/language-context";
import { dictionaries } from "@/constants/translations";
import { FullPageLoader } from "@/components/ui/loaders";
import { getHomePageData } from "@/lib/api";
import { urlFor } from "@/lib/sanity";
import { HomePageData } from "@/types";

export default function HomePage() {
  const { language } = useLanguage();
  const t = dictionaries[language].home;

  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHomePageData();
        setHomeData(data);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <FullPageLoader />;

  const useCustomHero = homeData?.showCustomHero && homeData?.heroImage;

  return (
    <div className="relative w-full h-full flex-grow flex flex-col items-center justify-center px-4 text-center animate-in fade-in zoom-in duration-500 overflow-hidden">
      {/* --- CUSTOM HERO BACKGROUND --- */}
      {useCustomHero && (
        <>
          <div className="fixed inset-0 -z-20">
            <Image
              src={urlFor(homeData.heroImage!).width(1920).quality(100).url()}
              alt="Hero Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Overlay Filter for better text contrast */}
          <div className="fixed inset-0 -z-10 bg-white/85 dark:bg-black/80 backdrop-blur-[2px] transition-colors duration-500" />
        </>
      )}

      {/* --- MAIN CONTENT --- */}
      <div className="mb-6 space-y-4 relative z-10">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {t.greeting}
          </span>
        </h1>

        <div className="text-2xl md:text-4xl font-semibold text-gray-500 dark:text-gray-400 h-[40px] md:h-[60px]">
          {/* I have 3 color options */}
          {/* gradient <div className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-[40px] md:h-[60px]"> */}
          {/* Minimalist <div className="text-2xl md:text-4xl font-semibold text-gray-500 dark:text-gray-400 h-[40px] md:h-[60px]"> */}
          {/* Tech Style <div className="text-2xl md:text-4xl font-semibold text-cyan-600 dark:text-cyan-400 h-[40px] md:h-[60px]"> */}
          {/* orange <div className="text-2xl md:text-4xl font-semibold text-orange-600 dark:text-orange-400 h-[40px] md:h-[60px]"> */}
          <Typewriter
            options={{
              strings: t.roles,
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
              delay: 80,
            }}
          />
        </div>
      </div>

      <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed relative z-10">
        {t.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10">
        <Link
          href="/projects"
          className="px-8 py-3.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
        >
          {t.btnCode}
        </Link>
        <Link
          href="/gallery"
          className="px-8 py-3.5 rounded-full border border-border bg-background/50 backdrop-blur-sm font-medium hover:bg-accent hover:text-accent-foreground hover:scale-105 transition-all active:scale-95"
        >
          {t.btnGallery}
        </Link>
      </div>
    </div>
  );
}
