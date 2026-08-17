// Gallery API route temporarily disabled
/*
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch gallery images");
    }

    const data = await response.json();

    // Ensure we have an array of images and format dates
    const images = data.images || [];
    const formattedImages = images.map((image: any) => ({
      ...image,
      created_at: new Date(image.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));

    return NextResponse.json(formattedImages);
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}
*/

import { NextResponse } from "next/server";

// Interface for raw gallery image data from the API
interface RawGalleryImage {
  id: number;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  created_at: string;
}

// Interface for formatted gallery image data
interface GalleryImage extends Omit<RawGalleryImage, "created_at"> {
  created_at: string; // This will be the formatted date string
}

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/gallery/list.php`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch gallery images");
    }

    const data = await response.json();

    // Ensure we have an array of images and format dates
    const images = data.data || [];
    const formattedImages = images.map((image: RawGalleryImage) => ({
      ...image,
      created_at: new Date(image.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));

    return NextResponse.json(formattedImages);
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}

// Export type for use in other files
export type { GalleryImage };
