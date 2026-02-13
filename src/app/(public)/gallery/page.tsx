"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { MasonryPhotoAlbum, RenderImageProps, RenderImageContext } from "react-photo-album";
import "react-photo-album/masonry.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import { motion } from "framer-motion";
import { Grid, Layers, ArrowLeft, Image as ImageIcon, Calendar, ExternalLink, ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";

import { useLanguage } from "@/context/language-context";
import { dictionaries } from "@/constants/translations";
import { FullPageLoader, InlineLoader } from "@/components/ui/loaders";
import { getAlbums } from "@/lib/api";
import { Album } from "@/types";
import { urlFor } from "@/lib/sanity";
import { shuffleArray } from "@/lib/utils";

import { GalleryImage } from "@/components/gallery/gallery-image";

// Local Interface for Lightbox
interface GalleryPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
  alt?: string;
  albumTitle?: string;
  albumId?: string;
}

export default function GalleryPage() {
  const { language } = useLanguage();
  const t = dictionaries[language].gallery;
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentView = (searchParams.get("view") as "explore" | "albums" | "single") || "explore";
  const currentAlbumId = searchParams.get("albumId");

  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [randomizedPhotos, setRandomizedPhotos] = useState<GalleryPhoto[]>([]);

  // Memoized Album Selection
  const selectedAlbum = useMemo(() => 
    albums.find(a => a.id === currentAlbumId) || null
  , [albums, currentAlbumId]);

  // Memoized Sorted Albums
  const sortedAlbums = useMemo(() => {
    return [...albums].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [albums, sortOrder]);

  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [currentPhotos, setCurrentPhotos] = useState<GalleryPhoto[]>([]);

  const [visibleCount, setVisibleCount] = useState(50);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAlbums();
        setAlbums(data);
      } catch (error) {
        console.error("Failed to fetch albums:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const allPhotos = useMemo(() => {
    return albums.flatMap((album) => 
      album.photos.map(photo => ({
        id: photo.id,
        src: photo.src,
        width: photo.width,
        height: photo.height,
        alt: photo.alt || "Gallery Photo",
        albumTitle: album.title,
        albumId: album.id
      }))
    );
  }, [albums]);

  // Initial Shuffle
  useEffect(() => {
    if (allPhotos.length > 0) {
      setRandomizedPhotos(shuffleArray(allPhotos));
    }
  }, [allPhotos]);

  // View Switching Logic
  useEffect(() => {
    setVisibleCount(50);
    if (currentView === "explore") {
      setCurrentPhotos(randomizedPhotos.length > 0 ? randomizedPhotos : allPhotos);
    } else if (currentView === "single" && selectedAlbum) {
      setCurrentPhotos(selectedAlbum.photos.map(p => ({
        id: p.id,
        src: p.src,
        width: p.width,
        height: p.height,
        alt: p.alt,
        albumTitle: selectedAlbum.title,
        albumId: selectedAlbum.id
      })));
    }
  }, [currentView, selectedAlbum, allPhotos, randomizedPhotos]);

  // Infinite Scroll Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisibleCount((prev) => prev + 40);
      },
      { threshold: 0.1, rootMargin: "400px" }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [currentPhotos, currentView]);

  const visiblePhotos = currentPhotos.slice(0, visibleCount);

  // Handlers
  const handleSwitchView = (view: "explore" | "albums") => {
    router.push(`/gallery?view=${view}`, { scroll: false });
  };

  const handleOpenAlbum = (albumId: string) => {
    router.push(`/gallery?view=single&albumId=${albumId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToAlbums = () => {
    router.push(`/gallery?view=albums`);
  };

  const handleNavigateToAlbum = (albumId?: string) => {
    if (!albumId) return;
    setLightboxIndex(-1);
    setTimeout(() => {
      handleOpenAlbum(albumId);
    }, 100);
  };

  const renderNextImage = useCallback(
    (props: RenderImageProps, context: RenderImageContext<GalleryPhoto>) => {
      return <GalleryImage photo={context.photo} onClick={props.onClick} />;
    }, 
    []
  );

  if (isLoading) return <FullPageLoader />;

  return (
    <div className="min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* HEADER */}
        <div className="flex flex-col items-center md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400 leading-normal">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {currentView === "explore" ? t.subtitleExplore : t.subtitleAlbums}
            </p>
          </div>

          {currentView !== "single" && (
            <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
              
              {/* View Switcher */}
              <div className="flex bg-secondary p-1 rounded-xl w-full sm:w-auto">
                <button
                  onClick={() => handleSwitchView("explore")}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    currentView === "explore" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid size={18} /> {t.explore}
                </button>
                <button
                  onClick={() => handleSwitchView("albums")}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    currentView === "albums" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Layers size={18} /> {t.albums}
                </button>
              </div>

              {/* Sort Controls (Albums Only) */}
              {currentView === "albums" && (
                <div className="flex bg-secondary p-1 rounded-xl ml-auto sm:ml-0">
                   <button
                      onClick={() => setSortOrder("newest")}
                      className={`p-2.5 rounded-lg transition-all ${
                        sortOrder === "newest" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                      title={dictionaries[language].projects.newest || "Mới nhất"}
                   >
                      <ArrowDownWideNarrow size={20} />
                   </button>
                   <button
                      onClick={() => setSortOrder("oldest")}
                      className={`p-2.5 rounded-lg transition-all ${
                        sortOrder === "oldest" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                      title={dictionaries[language].projects.oldest || "Cũ nhất"}
                   >
                      <ArrowUpNarrowWide size={20} />
                   </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* VIEW 1: EXPLORE */}
        {currentView === "explore" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <MasonryPhotoAlbum
              photos={visiblePhotos}
              onClick={({ index }) => setLightboxIndex(index)}
              columns={(containerWidth) => {
                if (containerWidth < 640) return 2; 
                if (containerWidth < 1024) return 2;
                return 3;
              }}
              spacing={16}
              render={{ image: renderNextImage }}
            />
             {visibleCount < currentPhotos.length && (
               <div ref={loadMoreRef}>
                  <InlineLoader />
               </div>
            )}
             {allPhotos.length === 0 && (
               <div className="text-center py-20 text-muted-foreground">Chưa có ảnh nào được tải lên.</div>
            )}
          </motion.div>
        )}

        {/* VIEW 2: ALBUMS LIST */}
        {currentView === "albums" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {sortedAlbums.map((album) => (
              <div 
                key={album.id}
                onClick={() => handleOpenAlbum(album.id)}
                className="group cursor-pointer flex flex-col gap-3"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/50 bg-secondary">
                   {album.coverImage ? (
                      <Image 
                         src={urlFor(album.coverImage).width(600).height(450).url()}
                         alt={album.title}
                         fill
                         className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                   ) : (
                      album.photos[0] ? (
                        <Image 
                           src={album.photos[0].src}
                           alt={album.title}
                           fill
                           unoptimized
                           referrerPolicy="no-referrer"
                           className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-muted-foreground">Empty Album</div>
                      )
                   )}
                   <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <ImageIcon size={14}/> {album.photos.length}
                   </div>
                </div>
                <div>
                   <h3 className="text-sm md:text-xl font-bold group-hover:text-pink-500 transition-colors line-clamp-1">{album.title}</h3>
                   <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mt-1">
                      <Calendar size={14} />
                      {/* Localized Date */}
                      <span>
                        {new Date(album.date).toLocaleDateString(
                            language === 'vi' ? 'vi-VN' : (language === 'ja' ? 'ja-JP' : 'en-US'), 
                            { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                      </span>
                      <span className="hidden md:inline w-1 h-1 bg-border rounded-full"></span>
                      <span className="hidden md:inline">{album.photos.length} {t.photosCount}</span>
                   </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* VIEW 3: SINGLE ALBUM */}
        {currentView === "single" && selectedAlbum && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <button 
              onClick={handleBackToAlbums}
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
               <div className="p-2 rounded-full bg-secondary group-hover:bg-accent transition-colors">
                 <ArrowLeft size={20} />
               </div>
               <span className="font-medium">{t.back || "Quay lại"}</span>
            </button>

            <div className="mb-10 text-center max-w-2xl mx-auto">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">{selectedAlbum.title}</h2>
               <p className="text-muted-foreground text-lg leading-relaxed">
                 {selectedAlbum.description?.[language as "en"|"vi"|"ja"] || selectedAlbum.description?.en || ""}
               </p>
               {selectedAlbum.tags && (
                 <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {selectedAlbum.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium px-3 py-1 bg-secondary rounded-full">#{tag}</span>
                    ))}
                 </div>
               )}
            </div>

            <MasonryPhotoAlbum
              photos={visiblePhotos}
              onClick={({ index }) => setLightboxIndex(index)}
              columns={(containerWidth) => {
                if (containerWidth < 640) return 2;
                if (containerWidth < 1024) return 2;
                return 3;
              }}
              spacing={16}
              render={{ image: renderNextImage }}
            />
             {visibleCount < currentPhotos.length && (
               <div ref={loadMoreRef}>
                  <InlineLoader />
               </div>
            )}
          </motion.div>
        )}

        {/* LIGHTBOX */}
        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
          slides={currentPhotos.map((photo) => ({
            src: photo.src,
            title: photo.alt,
            description: photo.albumTitle ? (
              <div 
                className="flex items-center justify-center gap-2 mt-2 cursor-pointer group hover:text-blue-400 transition-colors select-none"
                onClick={() => handleNavigateToAlbum(photo.albumId)}
              >
                <span className="font-medium opacity-80 group-hover:opacity-100">Album: {photo.albumTitle}</span>
                <ExternalLink size={14} className="opacity-50 group-hover:opacity-100" />
              </div>
            ) : undefined,
          }))}
          plugins={[Captions, Zoom]}
          zoom={{
            maxZoomPixelRatio: 3, 
            scrollToZoom: true,
          }}
          captions={{ showToggle: true, descriptionTextAlign: 'center' }}
        />
      </div>
    </div>
  );
}