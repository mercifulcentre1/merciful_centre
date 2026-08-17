"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChurchService } from "../types";
import { fetchNextService } from "../lib/api";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [nextService, setNextService] = useState<ChurchService | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  useEffect(() => {
    // Fetch next service data
    const loadNextService = async () => {
      try {
        const settings = await fetchNextService();
        if (settings) {
          let serviceDate;
          if (settings.next_service_date) {
            serviceDate = new Date(settings.next_service_date);
          } else {
            // Fallback to next Sunday at 10 AM
            serviceDate = new Date();
            const daysUntilSunday = (7 - serviceDate.getDay()) % 7;
            serviceDate.setDate(serviceDate.getDate() + (daysUntilSunday === 0 ? 7 : daysUntilSunday));
            serviceDate.setHours(10, 0, 0, 0);
          }

          const serviceData: ChurchService = {
            id: (settings as any).id || 0,
            name: (settings as any).next_service_title || "Sunday Service",
            dayOfWeek: serviceDate.toLocaleDateString("en-US", { weekday: "long" }),
            time: serviceDate.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit' }),
            description: (settings as any).next_service_description || "Join us for our weekly service",
            nextServiceDate: serviceDate.toISOString(),
            location: "Main Sanctuary",
            isLiveStreamAvailable: (settings as any).is_live || false,
            streamUrl: (settings as any).channel_url || "/live",
          };

          setTargetDate(serviceDate);
          setNextService(serviceData);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError("Failed to load service information");
        console.error("Error loading next service:", err);
      }
    };

    loadNextService();
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        return {
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0"),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24)
          .toString()
          .padStart(2, "0"),
        minutes: Math.floor((difference / 1000 / 60) % 60)
          .toString()
          .padStart(2, "0"),
        seconds: Math.floor((difference / 1000) % 60)
          .toString()
          .padStart(2, "0"),
      };
    };

    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Service Details */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-5 h-5 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-white font-poppins font-semibold mb-1">Time</h3>
          <p className="text-purple-200">
            {nextService ? (
              <>
                {nextService.dayOfWeek} at {nextService.time}
              </>
            ) : (
              "Loading..."
            )}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-5 h-5 text-purple-400"
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
          </div>
          <h3 className="text-white font-poppins font-semibold mb-1">
            Location
          </h3>
          <p className="text-purple-200">
            {nextService?.location || "Loading..."}
          </p>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center">
          <span className="block text-5xl font-bold text-white mb-2">
            {timeLeft.days}
          </span>
          <span className="text-purple-300 font-poppins">Days</span>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center">
          <span className="block text-5xl font-bold text-white mb-2">
            {timeLeft.hours}
          </span>
          <span className="text-purple-300 font-poppins">Hours</span>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center">
          <span className="block text-5xl font-bold text-white mb-2">
            {timeLeft.minutes}
          </span>
          <span className="text-purple-300 font-poppins">Minutes</span>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center">
          <span className="block text-5xl font-bold text-white mb-2">
            {timeLeft.seconds}
          </span>
          <span className="text-purple-300 font-poppins">Seconds</span>
        </div>
      </div>

      {/* Live Stream Button */}
      {nextService?.isLiveStreamAvailable && (
        <div className="pt-4">
          <Link
            href={nextService.streamUrl || "/live"}
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full font-poppins font-medium hover:bg-purple-700 transition-colors group"
          >
            Watch Live Stream
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
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
