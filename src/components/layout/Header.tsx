"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/sermons", label: "Sermons" },
    { href: "/events", label: "Events" },
    // { href: "/gallery", label: "Gallery" }, // Temporarily disabled
    { href: "/livestream", label: "Live Stream" },
    { href: "/give", label: "Give" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-gradient-to-b from-black/50 to-transparent py-4"
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/logo.png"
              alt="Church Logo"
              width={1280}
              height={720}
              className="h-16 w-auto transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-all duration-300 hover:opacity-75 ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/give"
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                isScrolled
                  ? "bg-purple-800 text-white hover:bg-purple-900"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              Give
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-colors duration-300 ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl absolute left-4 right-4 top-full border border-gray-100">
            <div className="flex flex-col py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-800 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/give"
                className="mx-6 mt-4 bg-purple-800 text-white px-6 py-3 rounded-xl hover:bg-purple-900 transition-all duration-300 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Give
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
