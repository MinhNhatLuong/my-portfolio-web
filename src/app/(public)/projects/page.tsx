"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Layers, X, Check, ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";

import { useLanguage } from "@/context/language-context";
import { dictionaries } from "@/constants/translations";
import { FullPageLoader } from "@/components/ui/loaders";
import { getProjects } from "@/lib/api";
import { Project } from "@/types";
import { PROJECT_CATEGORIES, TECH_OPTIONS } from "@/constants/options";

import { ProjectCard } from "@/components/projects/project-card";
import { ProjectModal } from "@/components/projects/project-modal";

export default function ProjectsPage() {
  const { language } = useLanguage();
  const t = dictionaries[language].projects;

  // --- STATE ---
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- HANDLERS ---
  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]);
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedTechs([]);
    setSortOrder("newest");
  };

  // --- FILTER & SORT LOGIC ---
  const featuredProjects = useMemo(() => {
    return projects.filter((p) => p.isFeatured).slice(0, 3);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchCategory = selectedCategory === "All" || project.category === selectedCategory; 
        const matchTech = selectedTechs.length === 0 || 
          project.techStack?.some((tech: string) => selectedTechs.includes(tech));
        return matchCategory && matchTech;
      })
      .sort((a, b) => {
         const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
         const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
         return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [projects, selectedCategory, selectedTechs, sortOrder]);

  if (isLoading) return <FullPageLoader />;

  return (
    <div className="min-h-screen space-y-16 pb-20 pt-10">
      
      {/* HEADER */}
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4 leading-normal">
          {t.title} 
        </h1>
        <p className="text-muted-foreground text-lg">{t.subtitle}</p>
      </div>

      {/* SECTION 1: FEATURED PROJECTS */}
      <section className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1.5 bg-purple-600 rounded-full"></div>
          <h2 className="text-2xl font-bold">{t.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <div key={`${project._id}-featured-${language}`} className="w-full">
               <ProjectCard 
                  project={project} language={language} t={t} index={index} 
                  onClick={handleOpenModal} 
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: ALL PROJECTS ARCHIVE */}
      <section className="container mx-auto px-4 max-w-7xl">
        
        {/* Toolbar: Title & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-t pt-10 border-border/50">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold">{t.archiveTitle || "Project Archive"}</h2>
          </div>
          
          <div className="flex bg-secondary/50 p-1 rounded-lg w-full sm:w-auto">
             <button 
               onClick={() => setSortOrder("newest")}
               className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-medium ${sortOrder === "newest" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
             >
               <ArrowDownWideNarrow size={16} /> 
               {t.newest || "Newest"}
             </button>
             <button 
               onClick={() => setSortOrder("oldest")}
               className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-medium ${sortOrder === "oldest" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
             >
               <ArrowUpNarrowWide size={16} />
               {t.oldest || "Oldest"}
             </button>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="bg-card border border-border rounded-xl p-6 mb-10 shadow-sm">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
              {PROJECT_CATEGORIES.map((cat) => (
                 <button key={cat} onClick={() => setSelectedCategory(cat)}
                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                     selectedCategory === cat ? "bg-blue-600 text-white" : "bg-secondary text-foreground hover:bg-secondary/80"
                   }`}
                >{cat}</button>
               ))}
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
             <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
               <Layers size={16}/> {t.filterTech || "Filter by Tech"}
             </div>
             <div className="flex flex-wrap gap-2">
               {TECH_OPTIONS.map((tech) => (
                 <button key={tech} onClick={() => toggleTech(tech)}
                   className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all flex items-center gap-1.5 ${
                     selectedTechs.includes(tech) ? "bg-blue-500/10 border-blue-500 text-blue-600" : "bg-background border-border text-muted-foreground hover:border-foreground/50"
                   }`}
                 >
                   {selectedTechs.includes(tech) && <Check size={12}/>} {tech}
                 </button>
               ))}
               {(selectedTechs.length > 0) && (
                 <button onClick={resetFilters} className="ml-auto text-xs text-red-500 hover:underline flex items-center gap-1">
                   <X size={12}/> {t.resetFilters || "Reset"}
                 </button>
               )}
             </div>
           </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={`${project._id}-archive-${language}`} 
                project={project} language={language} t={t} index={0} onClick={handleOpenModal}
              />
            ))}
          </AnimatePresence>
        </motion.div>
         
        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center py-20 text-muted-foreground">
             <Filter className="mx-auto h-12 w-12 mb-4 opacity-50"/>
             <p>Không tìm thấy dự án nào.</p>
             <button onClick={resetFilters} className="text-blue-500 hover:underline mt-2">Xóa bộ lọc</button>
          </div>
        )}
      </section>

      {/* Modal */}
      <ProjectModal 
        project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} language={language}
      />
    </div>
  );
}