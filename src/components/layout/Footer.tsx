"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchSettings } from "@/lib/api";

interface Settings {
  church_name?: string;
  church_address?: string;
  church_phone?: string;
  church_email?: string;
  facebook_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  service_times?: string;
}

const Footer = () => {
  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchSettings();
        setSettings(data);
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    loadSettings();
  }, []);

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/images/pattern-grid.svg")',
            backgroundRepeat: "repeat",
          }}
        ></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        {/* Top Section with Logo and Mission */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Link href="/" className="inline-block">
                  <Image
                    src="/footer-logo.png"
                    alt="Merciful Centre"
                    width={180}
                    height={60}
                    className="h-16 w-auto"
                  />
                </Link>
                <p className="text-gray-400 text-lg max-w-lg">
                  Loving God, Loving Life. We are a vibrant community of
                  believers dedicated to spreading God&apos;s love and providing
                  sanctuary for all who seek it.
                </p>
                <div className="flex space-x-4">
                  {settings.facebook_url && (
                    <a
                      href={settings.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <span className="sr-only">Facebook</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                  )}
                  {settings.youtube_url && (
                    <a
                      href={settings.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <span className="sr-only">YouTube</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  )}
                  {settings.instagram_url && (
                    <a
                      href={settings.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <span className="sr-only">Instagram</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-12">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Quick Links
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/about"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/events"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Events
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/sermons"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Sermons
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/give"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Give
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Service Times
                  </h3>
                  <div
                    className="space-y-3 text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html:
                        settings.service_times?.replace(/\n/g, "<br>") || "",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-4">
              <div className="flex items-center gap-6">
                {settings.church_address && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{settings.church_address}</span>
                  </div>
                )}
                {settings.church_email && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href={`mailto:${settings.church_email}`}
                      className="hover:text-purple-400 transition-colors"
                    >
                      {settings.church_email}
                    </a>
                  </div>
                )}
              </div>
              {settings.church_phone && (
                <div className="flex items-center gap-2 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href={`tel:${settings.church_phone}`}
                    className="hover:text-purple-400 transition-colors"
                  >
                    {settings.church_phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()}{" "}
              {settings.church_name || "Merciful Centre"}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
