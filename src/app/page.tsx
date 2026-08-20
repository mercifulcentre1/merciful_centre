import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import EventsList from "@/components/EventsList";
import SermonsList from "@/components/SermonsList";
import CountdownTimer from "@/components/CountdownTimer";
import { fetchSermons, fetchEvents } from "@/lib/api";

export default async function Home() {
  const [sermonsData, eventsData] = await Promise.all([
    fetchSermons(),
    fetchEvents()
  ]);
  
  const sermons = Array.isArray(sermonsData) ? sermonsData.slice(0, 6) : [];
  const events = Array.isArray(eventsData) ? eventsData.slice(0, 3) : [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-purple-900/30 z-10" />
          <Image
            src="/images/church-hero.jpg"
            alt="Church building"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Animated Background Shapes */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-slow-spin" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-800/10 to-transparent rounded-full blur-3xl animate-slow-spin-reverse" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Small Heading */}
            <div className="inline-block mb-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                <span className="text-white/90 text-sm font-medium">
                  Live Stream Available
                </span>
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Welcome to Our
              <span className="block mt-2 bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
                Church Community
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              A place of worship, community, and spiritual growth where everyone
              is welcome
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/about"
                className="group relative px-8 py-4 w-full sm:w-auto overflow-hidden rounded-xl bg-white text-purple-900 font-medium text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
              <Link
                href="/contact"
                className="group relative px-8 py-4 w-full sm:w-auto overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm text-white font-medium text-lg border border-white/20 hover:border-white/40 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="w-1 h-3 rounded-full bg-white/60 animate-scroll-down" />
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="relative py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Welcome Text */}
          <div className="max-w-4xl mx-auto text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="text-gray-600 font-poppins text-sm tracking-wide">
                WELCOME TO Merciful Centre
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 font-poppins tracking-tight mine-text-black">
              WELCOME HOME!
            </h1>
            <p className="text-gray-600 text-lg mb-12 font-poppins">
              Dive into our teachings, events and community.
              <br />
              Your journey of faith begins here.
            </p>

            {/* Navigation Arrows */}
          </div>

          {/* Featured Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* About Us Card */}
            <Link
              href="/about"
              className="group relative overflow-hidden rounded-lg aspect-[3/4]"
            >
              <Image
                src="/images/about-us.jpg"
                alt="Who we are"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white/0 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="text-white/80 text-sm font-poppins mb-2 block">
                    WHO WE ARE
                  </span>
                  <h3 className="text-white text-3xl font-bold font-poppins mb-8">
                    About us
                  </h3>
                  <span className="inline-flex items-center text-white font-poppins">
                    LEARN MORE
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>

            {/* Connect Card */}
            <Link
              href="/connect"
              className="group relative overflow-hidden rounded-lg aspect-[3/4]"
            >
              <Image
                src="/images/connect.jpg"
                alt="Join our community"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white/0 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="text-white/80 text-sm font-poppins mb-2 block">
                    JOIN OUR COMMUNITY
                  </span>
                  <h3 className="text-white text-3xl font-bold font-poppins mb-8">
                    Connect with us
                  </h3>
                  <span className="inline-flex items-center text-white font-poppins">
                    CONNECT
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>

            {/* Celebrations Card */}
            <Link
              href="/celebrations"
              className="group relative overflow-hidden rounded-lg aspect-[3/4]"
            >
              <Image
                src="/images/celebrations.jpg"
                alt="Endless celebration"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white/0 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="text-white/80 text-sm font-poppins mb-2 block">
                    WONDERFULL TIME WITH GOD
                  </span>
                  <h3 className="text-white text-3xl font-bold font-poppins mb-8">
                    Celebrations
                  </h3>
                  <span className="inline-flex items-center text-white font-poppins">
                    See Our Service Plan
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Preview Section */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Text Content */}
              <div className="space-y-8">
                <div>
                  <span className="text-purple-600 font-poppins text-sm font-medium tracking-wider">
                    WHO WE ARE
                  </span>
                  <h2 className="mt-4 text-4xl lg:text-5xl font-bold font-poppins text-gray-900">
                    A Life-Giving Church for Everyone
                  </h2>
                </div>

                <div className="space-y-6 text-gray-600">
                  <p className="text-lg leading-relaxed">
                    Merciful Centre is a life-giving, non-denominational, family
                    oriented, multicultural spirit-filled church for everyone.
                    We believe that regardless of your yesterday, God has a
                    great future in store for you.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Our vision is to provide a place of refuge to our community
                    by supporting the poor, saving lost souls, providing a
                    sanctuary for all who seek salvation and spiritual growth.
                  </p>
                  <blockquote className="pl-4 border-l-4 border-purple-500 italic text-xl text-purple-900">
                    &quot;Loving God, Loving Life&quot;
                  </blockquote>
                </div>

                <div className="pt-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-purple-600 font-poppins font-medium hover:text-purple-800 transition-colors group"
                  >
                    Read Our Full Story
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Stats/Values Grid */}
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold font-poppins mb-2 mine-text-black">
                    Worship
                  </h3>
                  <p className="text-gray-600">
                    Feeling and expressing reverence and adoration for God
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold font-poppins mb-2 mine-text-black">
                    Evangelism
                  </h3>
                  <p className="text-gray-600">
                    Spreading the Christian gospel through public preaching and
                    personal witness
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold font-poppins mb-2 mine-text-black">
                    Service
                  </h3>
                  <p className="text-gray-600">
                    Empowering the needy through our food and clothes bank
                    initiatives
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold font-poppins mb-2 mine-text-black">
                    Education
                  </h3>
                  <p className="text-gray-600">
                    Providing systematic instruction and spiritual growth
                    opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="text-purple-600 font-poppins text-sm font-medium tracking-wider">
                JOIN US
              </span>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold font-poppins mine-text-black">
                Upcoming Events
              </h2>
              <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                Be part of our vibrant community and join us in these upcoming
                events. Every gathering is an opportunity to grow in faith and
                fellowship.
              </p>
            </div>

            {/* Events List */}
            <Suspense fallback={<div>Loading events...</div>}>
              <EventsList limit={3} initialEvents={events} />
            </Suspense>

            {/* View All Events Button */}
            <div className="text-center mt-16">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full font-poppins font-medium hover:bg-purple-700 transition-colors group"
              >
                View All Events
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Next Service Countdown Section */}
      <section className="py-24 bg-[#1a0b2e] relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-purple-300 font-medium text-sm tracking-wider uppercase">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-300"></span>
                </span>
                NEXT LIVE SERVICE
              </span>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white">
                Join Us This Sunday
              </h2>
              <p className="mt-4 text-purple-200 text-lg max-w-2xl mx-auto">
                Experience inspiring worship and a practical message that will
                transform your life.
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="max-w-4xl mx-auto">
              <Suspense
                fallback={
                  <div className="text-white text-center">
                    <div className="animate-pulse">
                      <div className="h-8 bg-purple-800 rounded w-1/4 mx-auto mb-10"></div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="h-32 bg-purple-800 rounded-2xl"></div>
                        <div className="h-32 bg-purple-800 rounded-2xl"></div>
                        <div className="h-32 bg-purple-800 rounded-2xl"></div>
                        <div className="h-32 bg-purple-800 rounded-2xl"></div>
                      </div>
                      <div className="h-12 bg-purple-800 rounded-xl w-48 mx-auto"></div>
                    </div>
                  </div>
                }
              >
                <CountdownTimer />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Sermons Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 font-poppins mine-text-black">Recent Sermons</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Listen to our latest sermons and be inspired by the Word of God.
              </p>
            </div>
            <SermonsList sermons={sermons} />
            <div className="text-center mt-12">
              <Link
                href="/sermons"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                View All Sermons
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Giving Section */}
      <section className="py-24 bg-white relative overflow-hidden">
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

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-8">
                <span className="text-purple-600 font-poppins text-sm font-medium tracking-wider">
                  SUPPORT OUR MINISTRY
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900">
                  Give With a Grateful Heart
                </h2>
                <p className="text-lg text-gray-600">
                  Your generous giving helps us continue our mission of
                  spreading God&apos;s love and making a positive impact in our
                  community. Every contribution, big or small, makes a
                  difference in our ministry work.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/give"
                    className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full font-poppins font-medium hover:bg-purple-700 transition-colors"
                  >
                    Give Online
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="/give#ways-to-give"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 px-8 py-4 rounded-full font-poppins font-medium transition-colors"
                  >
                    Other Ways to Give
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right Column - Image/Illustration */}
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/giving-image.jpg"
                  alt="Giving and Supporting Our Ministry"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <blockquote className="text-xl font-medium italic">
                    &quot;Each of you should give what you have decided in your
                    heart to give, not reluctantly or under compulsion, for God
                    loves a cheerful giver.&quot;
                  </blockquote>
                  <p className="mt-2 font-medium">2 Corinthians 9:7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
