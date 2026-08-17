"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sermon } from "../types";
import { fetchRecentSermons } from "../lib/api";

interface SermonPlaylistProps {
  limit?: number;
}

const SermonPlaylist = ({ limit = 4 }: SermonPlaylistProps) => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSermonId, setActiveSermonId] = useState<number | null>(null);

  useEffect(() => {
    const loadSermons = async () => {
      try {
        const data = await fetchRecentSermons(limit);
        setSermons(data);
        if (data.length > 0) {
          setActiveSermonId(data[0].id);
        }
      } catch {
        setError("Failed to fetch sermons. Please try again later.");
        setLoading(false);
      }
    };

    loadSermons();
  }, [limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error}</p>
      </div>
    );
  }

  const activeSermon = sermons.find((sermon) => sermon.id === activeSermonId);

  return (
    <div className="space-y-8">
      {/* Active Sermon Player */}
      {activeSermon && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                {activeSermon.title}
              </h3>
              <span className="text-sm text-gray-500">
                {activeSermon.duration}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{activeSermon.preacher}</span>
              <span>•</span>
              <span>{new Date(activeSermon.date).toLocaleDateString()}</span>
            </div>
            {activeSermon.audioUrl ? (
              <audio
                className="w-full"
                controls
                src={activeSermon.audioUrl}
                preload="metadata"
              >
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p className="text-gray-500 text-sm">
                Audio not available for this sermon.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Sermon List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sermons.map((sermon) => (
          <div
            key={sermon.id}
            className={`group cursor-pointer rounded-lg p-4 transition-all duration-200 ${
              sermon.id === activeSermonId
                ? "bg-purple-50 border-purple-200"
                : "hover:bg-gray-50 border-transparent"
            } border`}
            onClick={() => setActiveSermonId(sermon.id)}
          >
            <div className="flex items-start space-x-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={sermon.thumbnailUrl || "/images/sermon-placeholder.jpg"}
                  alt={sermon.title}
                  fill
                  className="object-cover rounded-lg"
                />
                {sermon.id !== activeSermonId && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-opacity rounded-lg flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-medium text-gray-900 line-clamp-1">
                  {sermon.title}
                </h4>
                <p className="mt-1 text-sm text-gray-600 line-clamp-1">
                  {sermon.preacher}
                </p>
                <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                  <span>{new Date(sermon.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{sermon.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center">
        <Link
          href="/sermons"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
        >
          View All Sermons
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default SermonPlaylist;
