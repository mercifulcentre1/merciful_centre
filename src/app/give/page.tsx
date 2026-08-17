"use client";

import { motion, easeOut } from "framer-motion";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};
const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const givingMethods = [
  {
    name: "UK Bank",
    details: [
      { label: "Account Name", value: "Merciful Centre" },
      { label: "Account Number", value: "12345678" },
      { label: "Sort Code", value: "12-34-56" },
    ],
    icon: "bank",
    bg: "from-purple-100 to-white",
  },
  {
    name: "PayPal",
    details: [{ label: "PayPal Email", value: "donate@mercifulcentre.com" }],
    icon: "paypal",
    bg: "from-blue-100 to-white",
  },
  {
    name: "Vimeo",
    details: [
      { label: "Vimeo Giving Link", value: "vimeo.com/give/mercifulcentre" },
    ],
    icon: "vimeo",
    bg: "from-cyan-100 to-white",
  },
];

function renderIcon(icon: string) {
  if (icon === "paypal") {
    return (
      <span className="w-10 h-10 block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="7.056000232696533 3 37.35095977783203 45"
        >
          <g clipPath="url(#a)">
            <path
              fill="#002991"
              d="M38.914 13.35c0 5.574-5.144 12.15-12.927 12.15H18.49l-.368 2.322L16.373 39H7.056l5.605-36h15.095c5.083 0 9.082 2.833 10.555 6.77a9.687 9.687 0 0 1 .603 3.58z"
            ></path>
            <path
              fill="#60CDFF"
              d="M44.284 23.7A12.894 12.894 0 0 1 31.53 34.5h-5.206L24.157 48H14.89l1.483-9 1.75-11.178.367-2.322h7.497c7.773 0 12.927-6.576 12.927-12.15 3.825 1.974 6.055 5.963 5.37 10.35z"
            ></path>
            <path
              fill="#008CFF"
              d="M38.914 13.35C37.31 12.511 35.365 12 33.248 12h-12.64L18.49 25.5h7.497c7.773 0 12.927-6.576 12.927-12.15z"
            ></path>
          </g>
        </svg>
      </span>
    );
  }
  if (icon === "vimeo") {
    return (
      <span className="w-10 h-10 block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="24" fill="#1ab7ea" />
          <path
            d="M36.7 17.6c-.2 4.2-3.1 9.9-8.7 17.1-5.8 7.5-10.7 11.2-14.7 11.2-2.5 0-4.6-2.3-6.3-6.8-.7-2.5-1.4-5.1-2.1-7.6l4.2-1.3c.6 2.1 1.2 4.2 1.8 6.3.7 2.2 1.5 3.3 2.4 3.3 1.1 0 2.7-1.4 4.7-4.2 2-2.8 3.1-5 3.3-6.5.3-1.5-.4-2.3-2.1-2.3-.7 0-1.5.1-2.3.3l.7-4.1c.9.1 1.7.2 2.4.2 2.2 0 3.6-1.1 4.2-3.2.5-1.7.8-3.1.8-4.2 0-1.2-.4-1.8-1.2-1.8-.7 0-1.5.4-2.4 1.2l-1.2-3.1c1.5-1.2 3.1-1.8 4.8-1.8 3.3 0 5 2.1 5 6.2 0 1.7-.3 3.5-.8 5.3-.5 1.8-1.2 3.2-2.1 4.2-.9 1-1.9 1.5-3.1 1.5-.7 0-1.3-.1-1.8-.3l-.7 4.1c.7.1 1.4.2 2.1.2 2.2 0 4.1-1.1 5.7-3.3 1.6-2.2 2.4-4.2 2.4-6.1 0-1.2-.4-2.2-1.2-2.9-.8-.7-1.7-1.1-2.7-1.1-.7 0-1.3.1-1.8.3l-.7 4.1c.7.1 1.4.2 2.1.2 2.2 0 4.1-1.1 5.7-3.3 1.6-2.2 2.4-4.2 2.4-6.1 0-1.2-.4-2.2-1.2-2.9-.8-.7-1.7-1.1-2.7-1.1-.7 0-1.3.1-1.8.3l-.7 4.1c.7.1 1.4.2 2.1.2 2.2 0 4.1-1.1 5.7-3.3 1.6-2.2 2.4-4.2 2.4-6.1 0-1.2-.4-2.2-1.2-2.9-.8-.7-1.7-1.1-2.7-1.1-.7 0-1.3.1-1.8.3l-.7 4.1c.7.1 1.4.2 2.1.2z"
            fill="#fff"
          />
        </svg>
      </span>
    );
  }
  // Default: bank icon
  return <BanknotesIcon className="w-10 h-10 text-purple-600" />;
}

export default function GivePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/giving-image.jpg"
            alt="Give Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-black/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6"
          >
            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-6xl font-bold mb-2"
            >
              Give <span className="text-purple-400">Generously</span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              Your giving makes a difference. Choose a method below to support
              our mission.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Giving Methods Cards */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto"
          >
            {givingMethods.map((method) => (
              <motion.div
                key={method.name}
                variants={scaleUp}
                className={`group relative bg-gradient-to-br ${method.bg} rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:translate-y-[-8px] border border-purple-100`}
              >
                <div className="flex items-center justify-center mb-6">
                  {renderIcon(method.icon)}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                  {method.name}
                </h3>
                <ul className="space-y-2 mb-4">
                  {method.details.map((d) => (
                    <li
                      key={d.label}
                      className="flex justify-between text-gray-700 bg-white/60 rounded-lg px-4 py-2"
                    >
                      <span className="font-medium text-gray-500">
                        {d.label}:
                      </span>
                      <span className="font-mono text-gray-900">{d.value}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
