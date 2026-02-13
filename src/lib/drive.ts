import { DriveImage } from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

interface GoogleFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  imageMediaMetadata?: {
    width?: number | string;
    height?: number | string;
  };
}

interface GoogleApiResponse {
  files?: GoogleFile[];
  nextPageToken?: string;
}

/**
 * Fetches images from a public Google Drive folder using the Drive API.
 * Uses a high-resolution thumbnail trick (=s3000) to avoid rate limits on direct download links.
 * * @param folderId The ID of the Google Drive folder
 * @returns Array of DriveImage objects
 */
export async function getImagesFromDrive(folderId: string): Promise<DriveImage[]> {
  try {
    let allFiles: GoogleFile[] = [];
    let pageToken = "";
    
    // 1. Fetch data loop (handling pagination)
    do {
      const params: Record<string, string> = {
        key: API_KEY || "",
        fields: "nextPageToken, files(id, name, mimeType, thumbnailLink, imageMediaMetadata)",
        pageSize: "1000",
        orderBy: "createdTime desc", 
      };

      if (pageToken) {
        params.pageToken = pageToken;
      } else {
        // Query: Parent folder is 'folderId', is image, not trashed
        params.q = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
      }

      const queryParams = new URLSearchParams(params);
      const url = `https://www.googleapis.com/drive/v3/files?${queryParams.toString()}`;
      
      // Revalidate every hour
      const res = await fetch(url, { next: { revalidate: 3600 } });
      const data = (await res.json()) as GoogleApiResponse;

      if (data.files) {
        allFiles = [...allFiles, ...data.files];
      }

      pageToken = data.nextPageToken || "";

    } while (pageToken);

    // 2. Process and map data
    return allFiles
      .filter((file) => file.thumbnailLink)
      .map((file) => {
        // Hack: Request high-res image via thumbnail link parameter
        const highResLink = file.thumbnailLink!.replace(/=s\d+/, "=s3000");
        
        let width = Number(file.imageMediaMetadata?.width);
        let height = Number(file.imageMediaMetadata?.height);

        // Fallback dimensions if metadata is missing to prevent layout breaks
        if (!width || !height || isNaN(width) || isNaN(height)) {
            width = 800;
            height = 600;
        }

        return {
          id: file.id,
          src: highResLink, 
          width: width,
          height: height,
          alt: file.name ? file.name.replace(/\.[^/.]+$/, "") : "Untitled",
        };
      });
      
  } catch (error) {
    console.error("Error fetching images from Drive:", error);
    return [];
  }
}