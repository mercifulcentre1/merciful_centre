"use client";

import { useState, useEffect } from "react";
import { Sermon } from "@/types";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import Image from "next/image";

interface SermonsListProps {
  sermons?: Sermon[];
  isLoading?: boolean;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost/church-website/backend";

export default function SermonsList({
  sermons = [],
  isLoading = false,
}: SermonsListProps) {
  const { playSermon } = useAudioPlayer();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Debug log for sermons data
  useEffect(() => {
    console.log("Sermons data:", sermons);
  }, [sermons]);

  const handlePlaySermon = (sermon: Sermon) => {
    console.log("Attempting to play sermon:", sermon); // Debug log
    if (!sermon.audioUrl) {
      console.log("No audio URL available for sermon:", sermon.title);
      return;
    }
    try {
      // Add API base URL if the URL is relative
      const fullAudioUrl = sermon.audioUrl.startsWith("http")
        ? sermon.audioUrl
        : `${API_BASE_URL}/${sermon.audioUrl}`;
      playSermon(fullAudioUrl, sermon.title, sermon.preacher || undefined);
      console.log("Successfully called playSermon");
    } catch (error) {
      console.error("Error playing sermon:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!sermons.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No sermons available at this time.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sermons.map((sermon) => (
        <div
          key={sermon.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200"
          onMouseEnter={() => setHoveredId(sermon.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="relative aspect-video bg-gray-100">
            {sermon.thumbnailUrl && (
              <Image
                src={
                  sermon.thumbnailUrl.startsWith("http")
                    ? sermon.thumbnailUrl
                    : `${API_BASE_URL}/${sermon.thumbnailUrl}`
                }
                alt={sermon.title}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("Play button clicked for sermon:", sermon.title); // Debug log
                  handlePlaySermon(sermon);
                }}
                className={`w-16 h-16 flex items-center justify-center rounded-full 
                  ${
                    !sermon.audioUrl
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                      : hoveredId === sermon.id
                      ? "bg-purple-600 text-white"
                      : "bg-white/80 text-purple-600"
                  } transition-colors backdrop-blur-sm 
                  ${
                    sermon.audioUrl
                      ? "hover:bg-purple-600 hover:text-white"
                      : ""
                  }
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                disabled={!sermon.audioUrl}
                title={sermon.audioUrl ? "Play sermon" : "Audio not available"}
              >
                {sermon.audioUrl ? (
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
              {sermon.title}
            </h3>
            {sermon.preacher && (
              <p className="text-sm text-gray-600 mb-2">{sermon.preacher}</p>
            )}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(sermon.date).toLocaleDateString()}</span>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  sermon.audioUrl
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {sermon.audioUrl ? "Audio available" : "No audio"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
