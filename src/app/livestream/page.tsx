"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  VideoCameraIcon,
  CalendarDaysIcon,
  ClockIcon,
  ShareIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { fetchLivestreamSettings, apiCall } from "@/lib/api";
import { LivestreamArchive } from "@/types";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface StreamInfo {
  platform: "youtube" | "facebook";
  channel_url: string;
  is_live: boolean;
  next_service_date: string | null;
  next_service_title: string | null;
  stream_title: string | null;
  stream_description: string | null;
}

export default function LivestreamPage() {
  const [streamInfo, setStreamInfo] = useState<StreamInfo | null>(null);
  const [archives, setArchives] = useState<LivestreamArchive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStreamInfo();
  }, []);

  const loadStreamInfo = async () => {
    try {
      const [data, archivesData] = await Promise.all([
        fetchLivestreamSettings().catch(() => null),
        apiCall("/livestream/archives").catch(() => ({ archives: [] }))
      ]);
      setStreamInfo(data);
      if (archivesData && archivesData.archives) {
        setArchives(archivesData.archives);
      }
      setError(null);
    } catch {
      setError("Failed to fetch livestream settings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getEmbedUrl = (
    url: string,
    platform: "youtube" | "facebook"
  ): string => {
    try {
      if (platform === "youtube") {
        // Handle different YouTube URL formats
        const videoId = url.includes("youtube.com/watch?v=")
          ? new URL(url).searchParams.get("v")
          : url.includes("youtu.be/")
          ? url.split("youtu.be/")[1]
          : url.includes("youtube.com/embed/")
          ? url.split("youtube.com/embed/")[1]
          : url;
        return `https://www.youtube.com/embed/${videoId}`;
      } else {
        // Handle Facebook video URL
        if (url.includes("facebook.com/plugins/video.php")) {
          return url; // Already an embed URL
        }
        // Convert Facebook video URL to embed URL
        const videoUrl = encodeURIComponent(url);
        return `https://www.facebook.com/plugins/video.php?href=${videoUrl}&show_text=false`;
      }
    } catch (err) {
      console.error("Error parsing video URL:", err);
      return url; // Return original URL if parsing fails
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/livestream-hero.jpg"
              alt="Church Livestream"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/75"></div>
          {/* Decorative Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 25%)`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeIn} className="inline-block">
              <span className="inline-flex items-center space-x-2 text-purple-300 font-medium text-sm tracking-wider bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-white/20">
                <VideoCameraIcon className="w-5 h-5" />
                <span>LIVE STREAM</span>
              </span>
            </motion.div>
            {/* Dynamic Title and Description */}
            {streamInfo?.stream_title && (
              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              >
                {streamInfo.stream_title}
              </motion.h1>
            )}
            {streamInfo?.stream_description && (
              <motion.p
                variants={fadeIn}
                className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
              >
                {streamInfo.stream_description}
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 bg-red-50 rounded-lg p-4">
              {error}
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              {/* Live Stream or Next Service */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
                <div className="aspect-video relative">
                  {streamInfo?.is_live && streamInfo.channel_url ? (
                    <iframe
                      src={getEmbedUrl(
                        streamInfo.channel_url,
                        streamInfo.platform
                      )}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  ) : (
                    // Next Service Info
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-purple-700 flex items-center justify-center p-8">
                      <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                          {streamInfo?.stream_title || "Next Live Service"}
                        </h2>
                        <p className="text-xl text-purple-200 mb-8">
                          {streamInfo?.stream_description ||
                            "Join us for our next service"}
                        </p>
                        {streamInfo?.next_service_date && (
                          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                            <div className="flex items-center text-purple-200">
                              <CalendarDaysIcon className="w-6 h-6 mr-2" />
                              {new Date(
                                streamInfo.next_service_date
                              ).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                            <div className="flex items-center text-purple-200">
                              <ClockIcon className="w-6 h-6 mr-2" />
                              {new Date(
                                streamInfo.next_service_date
                              ).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        )}
                        <h3 className="text-xl text-purple-200 mb-8">
                          {streamInfo?.next_service_title || "Sunday Service"}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stream Controls */}
                <div className="p-6 border-t border-gray-100">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {streamInfo?.is_live
                          ? "Live Now"
                          : streamInfo?.next_service_title || "Next Service"}
                      </h3>
                      {streamInfo?.is_live && (
                        <div className="flex items-center mt-2">
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                            <span className="text-red-500 font-medium">
                              LIVE
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                        <ShareIcon className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                      {streamInfo?.is_live && streamInfo.channel_url && (
                        <a
                          href={streamInfo.channel_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                          <span>
                            Watch on{" "}
                            {streamInfo.platform === "youtube"
                              ? "YouTube"
                              : "Facebook"}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Previous Live Streams Section */}
      {archives.length > 0 && (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Previous Live Streams</h2>
              <p className="text-gray-600 text-lg">Watch recent services and teachings</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {archives.map((archive) => (
                <motion.div
                  key={archive.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="aspect-video relative bg-slate-900">
                    <iframe
                      src={getEmbedUrl(archive.video_id, archive.platform)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-purple-600 mb-3 font-medium">
                      <CalendarDaysIcon className="w-4 h-4 mr-1.5" />
                      {new Date(archive.stream_date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{archive.title}</h3>
                    <div className="flex items-center gap-2 mt-4">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                        {archive.platform}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
