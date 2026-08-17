"use client";

import { useState } from "react";
import { motion, easeOut } from "framer-motion";
import {
  EnvelopeIcon,
  UserIcon,
  PhoneIcon,
  ChatBubbleBottomCenterTextIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
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

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: <MapPinIcon className="w-6 h-6" />,
    title: "Visit Us",
    details: "13 Scot Lane, Doncaster, DN1 1EW",
  },
  {
    icon: <PhoneIcon className="w-6 h-6" />,
    title: "Call Us",
    details: "+44 (0) 123 456 7890",
  },
  {
    icon: <EnvelopeIcon className="w-6 h-6" />,
    title: "Email Us",
    details: "info@mercifulcentre.com",
  },
  {
    icon: <ClockIcon className="w-6 h-6" />,
    title: "Service Hours",
    details: "Sunday: 10:00 AM - 12:00 PM",
  },
];

const inputStyles =
  "block w-full pl-10 pr-4 py-3 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200 placeholder-gray-400 text-gray-900";
const textareaStyles =
  "block w-full pl-10 pr-4 py-3 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200 placeholder-gray-400 text-gray-900 min-h-[150px]";

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to send message");
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/connect.jpg"
            alt="Contact Hero"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/90 to-black/70" />
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
              Contact <span className="text-purple-400">Us</span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              We&apos;d love to hear from you. Send us a message and we&apos;ll
              respond as soon as possible.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      {info.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {info.title}
                    </h3>
                    <p className="text-gray-600">{info.details}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={scaleUp}
              className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-purple-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-white rounded-3xl" />

              <div className="relative">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Send us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Your Name
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500">
                          <UserIcon className="h-5 w-5" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={inputStyles}
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500">
                          <EnvelopeIcon className="h-5 w-5" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={inputStyles}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500">
                          <PhoneIcon className="h-5 w-5" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={inputStyles}
                          placeholder="+44 (0) 123 456 7890"
                        />
                      </div>
                    </div>

                    {/* Subject Input */}
                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Subject
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500">
                          <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                        </div>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className={inputStyles}
                          placeholder="How can we help?"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Message
                    </label>
                    <div className="relative group">
                      <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none text-gray-400 group-focus-within:text-purple-500">
                        <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className={textareaStyles}
                        placeholder="Write your message here..."
                      />
                    </div>
                  </div>

                  {/* Success/Error Messages */}
                  {success && (
                    <div className="p-4 bg-green-50 text-green-700 rounded-xl">
                      Message sent successfully! We&apos;ll get back to you
                      soon.
                    </div>
                  )}
                  {error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-xl">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
