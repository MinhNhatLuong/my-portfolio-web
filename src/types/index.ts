import { PortableTextBlock } from "next-sanity";

/**
 * This section is for common typess
 */

// Definition for Sanity Image Object
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

/**
 * Project section
 */

// Interface matching the Sanity 'project' schema
export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: {
    en?: string;
    vi?: string;
    ja?: string;
  };
  category: string;
  techStack: string[];
  links: {
    demo?: string;
    repo?: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: any; 
  isFeatured: boolean;
  publishedAt: string;
}

/**
 * Albums & Gallery section
 */

// Represents an image fetched from Google Drive
export type DriveImage = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

// Interface matching the Sanity 'album' schema
interface SanityAlbum {
  _id: string;
  title: string;
  description: {
    en?: string;
    vi?: string;
    ja?: string;
  };
  date: string;
  tags: string[];
  coverImage: SanityImage;
  googleDriveId: string;
}

// Extended interface for Frontend use (includes fetched photos)
export interface Album extends SanityAlbum {
  id: string; 
  photos: DriveImage[]; 
}

/**
 * Contact & About page section
 */

export interface ContactPageData {
  workContact?: {
    email?: string;
    phone?: string;
    resume?: string;
  };
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

export interface AboutPageData {
  infoBox?: {
    avatar: SanityImage;
    name: string;
    roles: string[];
    location: { en?: string; vi?: string; ja?: string };
    status: { en?: string; vi?: string; ja?: string };
    nationality: { en?: string; vi?: string; ja?: string };
    languages: Array<{
        lang: { en?: string; vi?: string; ja?: string };
        isNative: boolean;
        level: { en?: string; vi?: string; ja?: string };
    }>;
  };
  sections?: Array<{
    _key: string;
    _type: 'contentBlock' | 'timelineBlock' | 'skillsBlock';
    heading: { en?: string; vi?: string; ja?: string };
    
    // Content Block Fields
    content?: { en?: PortableTextBlock[]; vi?: PortableTextBlock[]; ja?: PortableTextBlock[] };
    image?: SanityImage;
    imagePosition?: 'left' | 'right' | 'center';
    imageCaption?: { en?: string; vi?: string; ja?: string };

    // Timeline Block Fields
    items?: Array<{
      timePeriod: string;
      role: { en?: string; vi?: string; ja?: string };
      company: { en?: string; vi?: string; ja?: string };
    }>;

    // Skills Block Fields
    pl?: string[];
    frameworks?: string[];
    databases?: string[];
    tools?: string[];
  }>;
}

export interface HomePageData {
  title?: string;
  heroImage?: SanityImage;
  showCustomHero?: boolean;
}