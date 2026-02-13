"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { PortableTextBlock } from "next-sanity";
import { Info } from "lucide-react";

import { FullPageLoader } from "@/components/ui/loaders";
import { getAboutPage } from "@/lib/api";
import { AboutPageData } from "@/types";
import { useLanguage } from "@/context/language-context";
import { dictionaries } from "@/constants/translations";
import { urlFor } from "@/lib/sanity";

import { DesktopInfoBox, MobileInfoBox } from "@/components/about/info-box";
import { SkillCategory } from "@/components/about/skill-category";

// Local Types
type LocalizedString = { en?: string; vi?: string; ja?: string };
type LocalizedBlock = { en?: PortableTextBlock[]; vi?: PortableTextBlock[]; ja?: PortableTextBlock[] };

export default function AboutPage() {
  const { language } = useLanguage();
  const t = dictionaries[language].about;
  
  const [data, setData] = useState<AboutPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAboutPage();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch about page:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <FullPageLoader />;

  // Helper functions for localization
  const getLoc = (obj?: LocalizedString) => obj?.[language] || obj?.en || "";
  const getBlock = (obj?: LocalizedBlock): PortableTextBlock[] => obj?.[language] || obj?.en || [];

  // Configuration for PortableText rendering
  const ptComponents: PortableTextComponents = {
    marks: {
      strong: ({children}) => <strong className="font-bold text-foreground">{children}</strong>,
      em: ({children}) => <em className="italic text-foreground">{children}</em>,
      link: ({value, children}) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
        return (
          <a href={value?.href} target={target} className="text-blue-500 hover:underline">
            {children}
          </a>
        )
      },
    },
    block: {
        normal: ({children}) => <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>,
        h1: ({children}) => <h1 className="text-2xl font-bold mb-4 mt-6">{children}</h1>,
        h2: ({children}) => <h2 className="text-xl font-bold mb-3 mt-5">{children}</h2>,
        blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-muted-foreground">{children}</blockquote>,
        ul: ({children}) => <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>,
        ol: ({children}) => <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>,
    }
  };

  if (!data) return null;

  return (
    <div className="min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-normal">
            {t.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 relative">
          
          {/* --- LEFT COLUMN: MAIN CONTENT --- */}
          <div className="flex-1 min-w-0">
            {/* Mobile Header */}
            <div className="lg:hidden mb-8">
               <MobileInfoBox data={data} t={t} getLoc={getLoc} />
            </div>

            <div className="space-y-12">
              {data.sections?.map((section) => {
                const heading = getLoc(section.heading);
                const sectionId = heading.toLowerCase().replace(/\s+/g, '-');

                return (
                  <div key={section._key} id={sectionId} className="scroll-mt-24 group">
                    
                    {/* Section Heading */}
                    <div className="flex items-center gap-2 mb-6 border-b border-border pb-2">
                        <h2 className="text-2xl font-bold text-foreground transition-colors">
                            {heading}
                        </h2>
                    </div>

                    {/* 1. CONTENT BLOCK */}
                    {section._type === 'contentBlock' && (
                      <div className="clearfix block">
                        {section.image && (
                          <figure className={`
                            relative mb-4 rounded-lg border border-border bg-secondary/30 p-1.5
                            ${section.imagePosition === 'center' 
                                ? 'w-full max-w-xl mx-auto block' 
                                : section.imagePosition === 'left'
                                    ? 'float-left mr-6 w-full md:w-[40%] lg:w-[35%]' 
                                    : 'float-right ml-6 w-full md:w-[40%] lg:w-[35%]' 
                            }
                          `}>
                            {/* Image with preserved aspect ratio */}
                            <div className="relative w-full h-auto overflow-hidden rounded">
                                <Image 
                                  src={urlFor(section.image).width(800).url()}
                                  alt={heading}
                                  width={800}
                                  height={0}
                                  style={{ width: '100%', height: 'auto' }}
                                  className="block"
                                />
                            </div>
                            {section.imageCaption && (
                                <figcaption className="text-center text-xs text-muted-foreground mt-2 italic">
                                  {getLoc(section.imageCaption)}
                                </figcaption>
                            )}
                          </figure>
                        )}
                        
                        <div className="text-lg text-muted-foreground font-serif md:font-sans">
                           <PortableText value={getBlock(section.content)} components={ptComponents} />
                        </div>
                        <div className="clear-both"></div>
                      </div>
                    )}

                    {/* 2. TIMELINE BLOCK */}
                    {section._type === 'timelineBlock' && (
                      <div className="space-y-0">
                        {section.items?.map((item, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row border-b border-border/50 py-4 last:border-0 hover:bg-secondary/20 transition-colors px-2 rounded-lg">
                             <div className="w-full sm:w-48 shrink-0 text-sm font-bold text-muted-foreground pt-1 mb-1 sm:mb-0">
                                {item.timePeriod}
                             </div>
                             <div className="flex-1">
                                <h3 className="text-lg font-bold text-foreground">{getLoc(item.company)}</h3>
                                <p className="text-blue-600 font-medium">{getLoc(item.role)}</p>
                             </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 3. SKILLS BLOCK (Categorized) */}
                    {section._type === 'skillsBlock' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
                         <SkillCategory title={t.techLanguages} items={section.pl} />
                         <SkillCategory title={t.techFrameworks} items={section.frameworks} />
                         <SkillCategory title={t.techDatabases} items={section.databases} />
                         <SkillCategory title={t.techTools} items={section.tools} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- RIGHT COLUMN: INFO BOX & TOC (STICKY) --- */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24 space-y-8">
                <DesktopInfoBox data={data} t={t} getLoc={getLoc} />
                
                {/* Table of Contents */}
                <div className="bg-secondary/20 rounded-lg p-4 border border-border">
                    <h3 className="font-bold mb-3 flex items-center gap-2 pb-2 border-b border-border/50">
                        <Info size={16} /> {t.tableOfContents}
                    </h3>
                    <ul className="space-y-1.5 text-sm">
                        {data.sections?.map((section, idx) => {
                            const heading = getLoc(section.heading);
                            const sectionId = heading.toLowerCase().replace(/\s+/g, '-');
                            return (
                                <li key={section._key}>
                                    <a href={`#${sectionId}`} className="flex gap-2 text-muted-foreground hover:text-blue-500 transition-colors">
                                        <span className="text-blue-500/50 font-mono text-xs pt-0.5">{idx + 1}</span>
                                        <span>{heading}</span>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}