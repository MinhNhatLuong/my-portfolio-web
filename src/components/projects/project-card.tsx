"use client";

import Image from "next/image";
import { ExternalLink, Calendar } from "lucide-react";
import { motion } from "framer-motion";

import { Project } from "@/types";
import { urlFor } from "@/lib/sanity";

// Define local types for translation
type TranslationProps = {
  viewCode: string;
  viewDemo: string;
  [key: string]: string;
};

// SVG Icon Component
function GithubIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
  );
}

interface ProjectCardProps {
  project: Project;
  language: "en" | "vi" | "ja";
  t: TranslationProps;
  index: number;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, language, t, index, onClick }: ProjectCardProps) {
  // Fallback to English if current language description is missing
  const description = project.description?.[language] || project.description?.en || "";
  
  const hasGithub = project.links?.repo && project.links.repo.trim() !== "";
  const hasDemo = project.links?.demo && project.links.demo.trim() !== "";
  const hasFooter = hasGithub || hasDemo;

  // Format date based on locale
  const formattedDate = project.publishedAt 
    ? new Date(project.publishedAt).toLocaleDateString(
        language === 'vi' ? 'vi-VN' : (language === 'ja' ? 'ja-JP' : 'en-US'), 
        { year: 'numeric', month: 'short', day: 'numeric' }
      )
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => onClick(project)}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 h-full cursor-pointer"
    >
      {/* THUMBNAIL IMAGE */}
      <div className="relative aspect-video w-full overflow-hidden shrink-0">
        {project.mainImage ? (
          <Image
            src={urlFor(project.mainImage).width(1200).height(675).quality(95).fit('crop').crop('center').auto('format').url()}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground">No Image</div>
        )}
        
        {/* Category Badge */}
        {project.category && (
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold shadow-sm border border-white/10">
                {project.category}
            </div>
        )}
      </div>

      {/* CARD CONTENT */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Published Date */}
        {formattedDate && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2 font-medium">
                <Calendar size={14} className="text-blue-500" />
                <span>{formattedDate}</span>
            </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-500 transition-colors line-clamp-2 min-h-[3.5rem] leading-7">
          {project.title}
        </h3>
        
        {/* Short Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 h-[60px]">
           {description}
        </p>

        {/* Tech Stack Tags */}
        <div className={`relative ${hasFooter ? 'mb-4' : 'mb-0'}`}>
          <div className="flex flex-wrap gap-2 h-[2.75rem] overflow-hidden content-start">
            {project.techStack?.map((tech) => (
              <span 
                key={tech} 
                className="px-2 py-1 text-[11px] uppercase font-bold tracking-wider rounded-md bg-secondary text-secondary-foreground border border-border whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
          {/* Fade effect at bottom of tags */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        </div>

        {/* Footer Actions */}
        {hasFooter && (
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            {hasGithub ? (
              <div 
                onClick={(e) => { e.stopPropagation(); window.open(project.links.repo, "_blank"); }} 
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <GithubIcon className="h-4 w-4" />
                {t.viewCode}
              </div>
            ) : <div />}
            
            {hasDemo && (
               <div 
                onClick={(e) => { e.stopPropagation(); window.open(project.links.demo, "_blank"); }} 
                className="flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors ml-auto cursor-pointer"
              >
                {t.viewDemo}
                <ExternalLink className="h-4 w-4" />
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}