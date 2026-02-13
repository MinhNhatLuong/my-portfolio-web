import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// 1. Configure the Sanity Client
// I use useCdn for faster response times in production
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-02-10",
  useCdn: true, 
});

// 2. Set up the image url builder
const builder = imageUrlBuilder(client);

// 3. Helper function to generate image URLs from Sanity image sources
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}