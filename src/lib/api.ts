import { client } from "@/lib/sanity";
import { getImagesFromDrive } from "@/lib/drive";
import { 
  Project, 
  Album, 
  SanityAlbum, 
  ContactPageData, 
  AboutPageData, 
  HomePageData, 
  DriveImage 
} from "@/types";

/**
 * Fetches all projects, sorted by publication date.
 */
export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category, 
    publishedAt,
    techStack,
    links,
    mainImage,
    isFeatured
  }`;
  return await client.fetch<Project[]>(query);
}

/**
 * Fetches all albums and their corresponding photos from Google Drive.
 * This function performs parallel fetching for optimization.
 */
export async function getAlbums(): Promise<Album[]> {
  const query = `*[_type == "album"] | order(date desc) {
    _id,
    title,
    description,
    date,
    tags,
    coverImage,
    googleDriveId
  }`;

  const albums = await client.fetch<SanityAlbum[]>(query);

  const albumsWithPhotos = await Promise.all(
    albums.map(async (album) => {
      let photos: DriveImage[] = [];
      
      if (album.googleDriveId) {
        photos = await getImagesFromDrive(album.googleDriveId);
      }
      
      return {
        ...album,
        id: album._id, 
        photos: photos 
      };
    })
  );

  return albumsWithPhotos;
}

/**
 * Fetches configuration data for the Contact page.
 */
export async function getContactData(): Promise<ContactPageData> {
  const query = `*[_type == "contactPage"][0]{
    workContact {
      email,
      phone,
      "resume": resume.asset->url 
    },
    socialLinks[] {
      platform,
      url
    }
  }`;
  return await client.fetch(query);
}

/**
 * Fetches content for the About page.
 */
export async function getAboutPage(): Promise<AboutPageData> {
  const query = `*[_type == "aboutPage"][0]{
    infoBox,
    sections[] {
      ...,
      _type,
      _key
    }
  }`;
  return await client.fetch(query);
}

/**
 * Fetches configuration for the Home page (e.g., Hero Image).
 */
export async function getHomePageData(): Promise<HomePageData> {
  const query = `*[_type == "home"][0]{
    title,
    heroImage,
    showCustomHero
  }`;
  return await client.fetch(query);
}