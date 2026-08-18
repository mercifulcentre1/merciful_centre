"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef, useState } from "react";
import {
  HeartIcon,
  UserGroupIcon,
  HomeIcon,
  SparklesIcon,
  HandRaisedIcon,
  LightBulbIcon,
  CalendarDaysIcon,
  SunIcon,
  MoonIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// Animation variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const scaleUp: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Add this to your existing styles or create a new style block
const cardStyles = {
  iconContainer: `
    relative w-16 h-16 mx-auto mb-6 
    before:content-[''] before:absolute before:-inset-1 
    before:bg-gradient-to-r before:from-purple-600 before:to-purple-400 
    before:rounded-full before:blur-lg before:opacity-75
    after:content-[''] after:absolute after:inset-0 
    after:bg-gradient-to-br after:from-white after:to-purple-50 
    after:rounded-full after:p-2
    group-hover:before:opacity-100 group-hover:transform group-hover:scale-110
    transition-all duration-300
  `,
  icon: `
    relative z-10 w-full h-full p-3
    text-purple-600 group-hover:text-purple-700
    transition-colors duration-300
  `,
};

const StatCard = ({ number, label }: { number: string; label: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative bg-white rounded-2xl p-4 md:p-6 shadow-lg overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <motion.div
        className="absolute inset-0 bg-purple-50"
        initial={false}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0, originY: 0 }}
      />
      <div className="relative z-10 text-center">
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 md:mb-2">{number}</p>
        <p className="text-gray-600 text-sm md:text-base">{label}</p>
      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden pt-20 md:pt-24">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/church-hero.jpg"
            alt="Church Community"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

          {/* Animated Pattern Overlay */}
          <div className="absolute inset-0 opacity-30 z-[1]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'url("/images/pattern-grid.svg")',
                backgroundRepeat: "repeat",
                animation: "slide 20s linear infinite",
              }}
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 md:space-y-8"
          >
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6"
            >
              About <span className="text-purple-400">Merciful Centre</span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
            >
              A life-giving, non-denominational, family-oriented, multicultural
              spirit-filled church for everyone
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 md:py-16 bg-white relative z-10 -mt-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn}>
              <StatCard number="2003" label="Year Founded" />
            </motion.div>
            <motion.div variants={fadeIn}>
              <StatCard number="1000+" label="Members" />
            </motion.div>
            <motion.div variants={fadeIn}>
              <StatCard number="50+" label="Ministries" />
            </motion.div>
            <motion.div variants={fadeIn}>
              <StatCard number="24/7" label="Prayer Support" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section
        ref={targetRef}
        className="py-24 bg-white relative overflow-hidden"
      >
        <motion.div
          style={{ opacity, scale }}
          className="container mx-auto px-4"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Left Column - Text */}
              <motion.div variants={fadeIn} className="space-y-8">
                <div className="inline-block">
                  <span className="text-purple-600 font-poppins text-sm font-medium tracking-wider bg-purple-50 px-4 py-2 rounded-full">
                    OUR STORY
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Founded on Faith,{" "}
                  <span className="text-purple-600">Growing in Grace</span>
                </h2>
                <div className="space-y-6 text-gray-600 text-xl">
                  <p>
                    The Merciful Centre was planted from scratch in East London
                    in November 2003. What started as a humble Bible fellowship
                    at the Leytonstone Library quickly multiplied into a church
                    that now has an impact around the globe.
                  </p>
                  <p>
                    At the Merciful Centre, we believe that regardless of your
                    yesterday, God has a great future in store for you. We exist
                    to change lives by leading people to totally love God and to
                    love Life, as a church in the body of Christ.
                  </p>
                  <div className="relative pl-4 border-l-4 border-purple-600 italic text-gray-700">
                    Every week, we join together to experience inspiring worship
                    and practical messages. Our services are led by a talented
                    live band with a style that resonates with today&apos;s
                    culture, creating an engaging two-hour experience that
                    uplifts and transforms.
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Image Grid */}
              <motion.div variants={scaleUp} className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/second-logo.jpg"
                      alt="Church History"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/celebrations.jpg"
                      alt="Church History"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/about-hero.jpg"
                      alt="Church History"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/church-hero.jpg"
                      alt="Church History"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-12"
            >
              {/* Section Header */}
              <div className="text-center space-y-4">
                <motion.span
                  variants={fadeIn}
                  className="inline-block text-purple-600 font-poppins text-sm font-medium tracking-wider bg-purple-50 px-4 py-2 rounded-full"
                >
                  OUR VISION
                </motion.span>
                <motion.h2
                  variants={fadeIn}
                  className="text-4xl md:text-5xl font-bold text-gray-900"
                >
                  Our Purpose & Mission
                </motion.h2>
                <motion.p
                  variants={fadeIn}
                  className="max-w-4xl mx-auto text-gray-600 text-xl leading-relaxed"
                >
                  To provide a place of refuge to our community by supporting
                  the poor, saving lost souls, providing a sanctuary for all who
                  seek salvation and spiritual growth, strengthening youth and
                  families, engaging in social activism, and economic
                  development of our community.
                </motion.p>
              </div>

              {/* Vision Cards Grid */}
              <motion.div
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {/* Community Support Card */}
                <motion.div
                  variants={scaleUp}
                  className="group relative bg-white/80 backdrop-blur-sm border border-purple-100/50 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-purple-900/5 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  {/* Subtle top gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={cardStyles.iconContainer}>
                      <HeartIcon className={cardStyles.icon} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-4 group-hover:text-purple-700 transition-colors duration-300">
                      Supporting the Poor
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Providing essential support and resources to those in need
                      within our community.
                    </p>
                  </div>
                </motion.div>

                {/* Place of Refuge Card */}
                <motion.div
                  variants={scaleUp}
                  className="group relative bg-white/80 backdrop-blur-sm border border-purple-100/50 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-purple-900/5 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  {/* Subtle top gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={cardStyles.iconContainer}>
                      <HomeIcon className={cardStyles.icon} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-4 group-hover:text-purple-700 transition-colors duration-300">
                      Place of Refuge
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Creating a welcoming sanctuary for all who seek salvation
                      and spiritual growth.
                    </p>
                  </div>
                </motion.div>

                {/* Strengthening Families Card */}
                <motion.div
                  variants={scaleUp}
                  className="group relative bg-white/80 backdrop-blur-sm border border-purple-100/50 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-purple-900/5 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  {/* Subtle top gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={cardStyles.iconContainer}>
                      <UserGroupIcon className={cardStyles.icon} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-4 group-hover:text-purple-700 transition-colors duration-300">
                      Strengthening Families
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Empowering youth and families through guidance, support,
                      and community.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("/images/pattern-grid.svg")',
              backgroundRepeat: "repeat",
              transform: "rotate(-3deg) scale(1.2)",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-12"
            >
              {/* Section Header */}
              <div className="text-center space-y-4">
                <motion.span
                  variants={fadeIn}
                  className="inline-block text-purple-600 font-poppins text-sm font-medium tracking-wider bg-purple-50 px-4 py-2 rounded-full"
                >
                  CORE VALUES
                </motion.span>
                <motion.h2
                  variants={fadeIn}
                  className="text-4xl md:text-5xl font-bold text-gray-900"
                >
                  What We Stand For
                </motion.h2>
              </div>

              {/* Core Values Cards */}
              <motion.div
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
              >
                {/* Worship Card */}
                <motion.div
                  variants={scaleUp}
                  className="group relative bg-white/80 backdrop-blur-sm border border-purple-100/50 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-purple-900/5 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  {/* Subtle top gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={cardStyles.iconContainer}>
                      <HandRaisedIcon className={cardStyles.icon} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-4 group-hover:text-purple-700 transition-colors duration-300">
                      Worship
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Expressing reverence and adoration for God through
                      meaningful worship.
                    </p>
                  </div>
                </motion.div>

                {/* Evangelism Card */}
                <motion.div
                  variants={scaleUp}
                  className="group relative bg-white/80 backdrop-blur-sm border border-purple-100/50 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-purple-900/5 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  {/* Subtle top gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={cardStyles.iconContainer}>
                      <SparklesIcon className={cardStyles.icon} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-4 group-hover:text-purple-700 transition-colors duration-300">
                      Evangelism
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Spreading the Christian gospel through public preaching
                      and personal witness.
                    </p>
                  </div>
                </motion.div>

                {/* Service Card */}
                <motion.div
                  variants={scaleUp}
                  className="group relative bg-white/80 backdrop-blur-sm border border-purple-100/50 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-purple-900/5 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  {/* Subtle top gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={cardStyles.iconContainer}>
                      <HeartIcon className={cardStyles.icon} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-4 group-hover:text-purple-700 transition-colors duration-300">
                      Service
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Empowering the needy through our food bank and clothes
                      bank initiatives.
                    </p>
                  </div>
                </motion.div>

                {/* Education Card */}
                <motion.div
                  variants={scaleUp}
                  className="group relative bg-white/80 backdrop-blur-sm border border-purple-100/50 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-purple-900/5 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  {/* Subtle top gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={cardStyles.iconContainer}>
                      <LightBulbIcon className={cardStyles.icon} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-4 group-hover:text-purple-700 transition-colors duration-300">
                      Education
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Providing systematic instruction and spiritual education
                      for growth and development.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-black relative overflow-hidden">
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

        {/* Purple Gradient Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Left Column - Image */}
              <motion.div
                variants={scaleUp}
                className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl group"
              >
                <Image
                  src="/images/head-pastor.jpg"
                  alt="Rev. Adedolapo Agoro (Rev. Dolly)"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl text-white font-semibold">
                    Rev. Adedolapo Agoro
                  </h3>
                  <p className="text-purple-300">(Rev. Dolly)</p>
                </div>
              </motion.div>

              {/* Right Column - Text */}
              <motion.div variants={fadeIn} className="space-y-8">
                <span className="inline-block text-purple-400 font-poppins text-sm font-medium tracking-wider bg-purple-950/50 px-4 py-2 rounded-full border border-purple-800/30">
                  OUR LEADERSHIP
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Meet Our Head Pastor
                </h2>
                <div className="space-y-6 text-gray-300 text-lg">
                  <p>
                    Under the leadership of Rev. Dolly, Merciful Centre has
                    grown from a small Bible fellowship to a vibrant,
                    multicultural congregation that impacts lives across the
                    globe.
                  </p>
                  <p>
                    With a passion for teaching God&apos;s Word and a heart for
                    serving others, Rev. Dolly leads our church in fulfilling
                    its mission of transforming lives and building a strong,
                    faith-filled community.
                  </p>
                  <blockquote className="relative pl-6 border-l-4 border-purple-500 italic text-xl text-white my-8">
                    <div className="absolute -left-3 -top-3 text-purple-800 text-6xl opacity-50">
                      &quot;
                    </div>
                    <p className="relative z-10">
                      Regardless of your yesterday, God has a great future in
                      store for you.
                    </p>
                  </blockquote>

                  {/* Social Links */}
                  <div className="flex items-center gap-4 pt-4">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                      aria-label="Facebook"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                      aria-label="Twitter"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Weekly Services Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-purple-50/50"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-purple-50/50"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 25%),
                             radial-gradient(circle at 98% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 25%)`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-16"
            >
              {/* Section Header */}
              <div className="text-center space-y-4">
                <motion.span
                  variants={fadeIn}
                  className="inline-block text-purple-600 font-poppins text-sm font-medium tracking-wider bg-purple-50 px-4 py-2 rounded-full"
                >
                  WEEKLY SERVICES
                </motion.span>
                <motion.h2
                  variants={fadeIn}
                  className="text-4xl md:text-5xl font-bold text-gray-900"
                >
                  Join Us in Worship
                </motion.h2>
                <motion.p
                  variants={fadeIn}
                  className="max-w-2xl mx-auto text-gray-600 text-lg"
                >
                  Experience the power of worship and fellowship at our weekly
                  services
                </motion.p>
              </div>

              {/* Service Times Grid */}
              <motion.div
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {/* Sunday Service */}
                <motion.div variants={scaleUp} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-50 rounded-[2.5rem] transform rotate-[-2deg] group-hover:rotate-0 transition-transform duration-300"></div>
                  <div className="relative bg-white rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:translate-y-[-8px] border border-purple-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 rounded-full p-3">
                          <SunIcon className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Sunday Service
                        </h3>
                      </div>
                      <div className="bg-purple-50 rounded-full px-4 py-2">
                        <span className="text-purple-600 font-semibold">
                          Main
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <ClockIcon className="w-5 h-5 text-purple-500" />
                        <span>10:30 AM - 12:30 PM</span>
                      </div>
                      <p className="text-gray-600">
                        Join us for praise, worship, and an inspiring message
                        from God&apos;s Word.
                      </p>
                      <div className="pt-4">
                        <span className="inline-block bg-purple-50 text-purple-600 text-sm font-medium px-4 py-2 rounded-full">
                          Children&apos;s Church Available
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Wednesday Bible Study */}
                <motion.div variants={scaleUp} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-50 rounded-[2.5rem] transform rotate-[-2deg] group-hover:rotate-0 transition-transform duration-300"></div>
                  <div className="relative bg-white rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:translate-y-[-8px] border border-purple-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 rounded-full p-3">
                          <CalendarDaysIcon className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Bible Study
                        </h3>
                      </div>
                      <div className="bg-purple-50 rounded-full px-4 py-2">
                        <span className="text-purple-600 font-semibold">
                          Wednesday
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <ClockIcon className="w-5 h-5 text-purple-500" />
                        <span>6:30 PM - 8:00 PM</span>
                      </div>
                      <p className="text-gray-600">
                        Deep dive into God&apos;s Word with interactive teaching
                        and discussion.
                      </p>
                      <div className="pt-4">
                        <span className="inline-block bg-purple-50 text-purple-600 text-sm font-medium px-4 py-2 rounded-full">
                          All Ages Welcome
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Friday Prayer Meeting */}
                <motion.div variants={scaleUp} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-50 rounded-[2.5rem] transform rotate-[-2deg] group-hover:rotate-0 transition-transform duration-300"></div>
                  <div className="relative bg-white rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:translate-y-[-8px] border border-purple-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 rounded-full p-3">
                          <MoonIcon className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Prayer Meeting
                        </h3>
                      </div>
                      <div className="bg-purple-50 rounded-full px-4 py-2">
                        <span className="text-purple-600 font-semibold">
                          Friday
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <ClockIcon className="w-5 h-5 text-purple-500" />
                        <span>7:00 PM - 8:30 PM</span>
                      </div>
                      <p className="text-gray-600">
                        Come together for powerful corporate prayer and
                        spiritual breakthrough.
                      </p>
                      <div className="pt-4">
                        <span className="inline-block bg-purple-50 text-purple-600 text-sm font-medium px-4 py-2 rounded-full">
                          Prayer Requests Welcome
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                variants={fadeIn}
                className="text-center mt-12"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Add custom styles for animations */}
      <style jsx global>{`
        @keyframes slide {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}
