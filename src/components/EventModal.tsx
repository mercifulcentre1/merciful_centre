import { Event } from "@/types";
import { getStorageUrl } from "@/lib/api";
import { CalendarDays, Clock, MapPin, X } from "lucide-react";

interface EventModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventModal({
  event,
  isOpen,
  onClose,
}: EventModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-white bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl transform transition-all">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Section */}
          <div className="relative h-64 rounded-t-2xl overflow-hidden">
            {(event.image || (event as any).image_url) ? (
              <img
                src={getStorageUrl(event.image || (event as any).image_url)}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)] opacity-50"></div>
                <CalendarDays className="w-20 h-20 text-white/90" />
              </div>
            )}
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Featured Badge */}
            {event.is_featured && (
              <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                Featured Event
              </div>
            )}

            {/* Date Badge */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 text-center shadow-lg min-w-[4rem]">
              <div className="text-2xl font-bold text-purple-600">
                {new Date((event.date || (event as any).event_date)).getDate() || "-"}
              </div>
              <div className="text-sm font-medium text-gray-600 uppercase">
                {new Date((event.date || (event as any).event_date)).toLocaleDateString("en-US", {
                  month: "short",
                })}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {event.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
                  <CalendarDays className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="text-sm">
                    {new Date((event.date || (event as any).event_date)).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {event.time && (
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Time</p>
                    <p className="text-sm">
                      {new Date(`2000-01-01T${event.time}`).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </p>
                  </div>
                </div>
              )}

              {event.location && (
                <div className="flex items-center space-x-3 text-gray-600 md:col-span-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Location
                    </p>
                    <p className="text-sm">{event.location}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600">{event.description}</p>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="mr-3 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Close
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
