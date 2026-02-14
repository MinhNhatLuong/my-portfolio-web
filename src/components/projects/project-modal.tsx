"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { urlFor } from "@/lib/sanity";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  language: "en" | "vi" | "ja";
}

export function ProjectModal({
  project,
  isOpen,
  onClose,
  language,
}: ProjectModalProps) {
  if (!project) return null;

  const description = project.description?.[language] || project.description?.en || "";
  
  // Format date for Modal
  const formattedDate = project.publishedAt
    ? new Date(project.publishedAt).toLocaleDateString(
        language === "vi" ? "vi-VN" : language === "ja" ? "ja-JP" : "en-US",
        { year: "numeric", month: "long", day: "numeric" },
      )
    : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full md:max-w-3xl h-full md:h-auto md:max-h-[85vh] overflow-y-auto bg-background rounded-none md:rounded-2xl shadow-2xl modal-scrollbar flex flex-col"
          >
            {/* Sticky Close Button */}
            <div className="sticky top-0 left-0 right-0 z-50 flex justify-end p-4 pointer-events-none">
              <button
                onClick={onClose}
                className="pointer-events-auto p-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-all shadow-lg border border-white/10"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Wrapper */}
            <div className="relative -mt-20">
              
              {/* Cover Image */}
              <div className="relative w-full h-72 md:h-96 shrink-0">
                {project.mainImage && (
                  <Image
                    src={urlFor(project.mainImage)
                      .width(1920)
                      .quality(100)
                      .auto("format")
                      .url()}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
                {/* Gradient overlay for better text contrast */}
                <div className="absolute -bottom-px left-0 w-full h-[calc(50%+1px)] bg-gradient-to-t from-background via-background/60 to-background/0 pointer-events-none" />
              </div>

              {/* Detailed Content */}
              <div className="px-6 md:px-8 pb-8 -mt-20 relative">
                
                {/* Category Badge */}
                {project.category && (
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-white uppercase bg-blue-600 rounded-full shadow-lg">
                    {project.category}
                  </span>
                )}

                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {project.title}
                </h2>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground border-b border-border/50 pb-6">
                  {formattedDate && (
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-blue-500" />
                      <span className="font-medium">{formattedDate}</span>
                    </div>
                  )}
                  <div className="w-px h-4 bg-border/50 hidden sm:block"></div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="text-foreground font-medium bg-secondary px-2 py-0.5 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Description */}
                <div className="prose dark:prose-invert max-w-none mb-8">
                  <p className="whitespace-pre-wrap text-lg leading-relaxed text-foreground/90">
                    {description}
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
                  {project.links?.repo && (
                    <Link
                      href={project.links.repo}
                      target="_blank"
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-secondary/80 font-medium transition-colors"
                    >
                      <Github size={20} /> Source Code
                    </Link>
                  )}
                  {project.links?.demo && (
                    <Link
                      href={project.links.demo}
                      target="_blank"
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-medium shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                    >
                      <ExternalLink size={20} /> Live Demo
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}