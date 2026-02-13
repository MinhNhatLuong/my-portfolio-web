"use client";

import { useState, memo } from "react";
import Image from "next/image";
import { RenderImageProps } from "react-photo-album";

interface GalleryPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
  alt?: string;
  albumTitle?: string;
  albumId?: string;
}

interface GalleryImageProps {
  photo: GalleryPhoto;
  onClick?: RenderImageProps['onClick'];
}

// Using memo to prevent unnecessary re-renders when gallery state changes
export const GalleryImage = memo(({ photo, onClick }: GalleryImageProps) => {
  const [aspectRatio, setAspectRatio] = useState(photo.width / photo.height);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${aspectRatio}`,
        marginBottom: "16px"
      }}
      className="overflow-hidden rounded-xl group cursor-zoom-in bg-secondary/20 transition-[aspect-ratio] duration-500 ease-in-out"
    >
      <Image
        fill
        src={photo.src}
        alt={photo.alt || ""}
        className={`object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-105 transition-transform`}
        onClick={onClick}
        unoptimized
        referrerPolicy="no-referrer"
        onLoadingComplete={(img) => {
          setIsLoaded(true);
          const naturalRatio = img.naturalWidth / img.naturalHeight;
          if (Math.abs(naturalRatio - aspectRatio) > 0.05) {
            setAspectRatio(naturalRatio);
          }
        }}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
    </div>
  );
});

GalleryImage.displayName = "GalleryImage";