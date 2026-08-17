"use client";

import { useState, useEffect } from "react";
import { fetchEvents } from "@/lib/api";
import { Event } from "@/types";
import { CalendarDays, Clock, MapPin, ChevronRight } from "lucide-react";
import EventModal from "./EventModal";

interface EventsListProps {
  limit?: number;
}

export default function EventsList({ limit }: EventsListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEvents();
        console.log("Fetched events:", data);
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading events:", err);
        setError("Failed to load events");
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    console.log("Current events state:", events);
  }, [events]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  if (!events.length) {
    return (
      <div className="text-center text-gray-600 py-8">
        No upcoming events at this time.
      </div>
    );
  }

  const displayEvents = limit ? events.slice(0, limit) : events;

  const getImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:8080";
    return `${baseUrl}/${url}`;
  };

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer border border-gray-200"
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              {(event.image || (event as any).image_url) ? (
                <img
                  src={getImageUrl(event.image || (event as any).image_url)}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)] opacity-50"></div>
                  <CalendarDays className="w-16 h-16 text-white/90" />
                </div>
              )}
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Date Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 text-center shadow-lg min-w-[3.5rem]">
                <div className="text-xl font-bold text-purple-600">
                  {new Date((event.date || (event as any).event_date)).getDate() || "-"}
                </div>
                <div className="text-xs font-medium text-gray-600 uppercase">
                  {new Date((event.date || (event as any).event_date)).toLocaleDateString("en-US", {
                    month: "short",
                  })}
                </div>
              </div>

              {/* Featured Badge */}
              {event.is_featured && (
                <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Featured
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                {event.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="space-y-2 mb-4">
                {event.time && (
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="text-sm">
                      {new Date(`2000-01-01T${event.time}`).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </span>
                  </div>
                )}

                {event.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="text-sm truncate">{event.location}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-purple-600 hover:text-purple-700 font-semibold text-sm transition-colors inline-flex items-center group/btn">
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(event);
                  }}
                  className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}
