"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SermonsList from "@/components/SermonsList";
import { fetchSermons } from "@/lib/api";
import { Sermon } from "@/types";

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

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadSermons = async () => {
      try {
        const data = await fetchSermons();
        setSermons(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading sermons:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSermons();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/sermons-hero.jpg"
              alt="Church Sermons"
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
                <span>LATEST SERMONS</span>
              </span>
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Listen to God&apos;s
              <span className="text-purple-300"> Word</span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              Explore our collection of inspiring messages that will strengthen
              your faith
            </motion.p>

            {/* Search Bar */}
            <motion.div variants={fadeIn} className="max-w-xl mx-auto relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search sermons by title, preacher, or series..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sermons List Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SermonsList sermons={sermons} isLoading={isLoading} />
        </div>
      </section>
    </main>
  );
}
