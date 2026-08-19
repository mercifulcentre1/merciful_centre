import EventsList from "@/components/EventsList";
import Image from "next/image";
import { fetchEvents } from "@/lib/api";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default async function EventsPage() {
  const events = await fetchEvents();
  
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px]">
        <div className="absolute inset-0">
          <Image
            src="/images/church-hero.jpg"
            alt="Events Hero"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Church Events
            </h1>
            <p className="text-xl">
              Join us in our upcoming activities and celebrations
            </p>
          </div>
        </div>
      </section>

      {/* Events List Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <EventsList initialEvents={events} />
        </div>
      </section>

      {/* Newsletter Section with Floating Elements */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-white"></div>
          {/* Decorative elements */}
        </div>

        <div className="container mx-auto px-4 relative">
            <div className="text-center space-y-4">
              <span className="text-purple-600 font-medium tracking-wider text-sm uppercase bg-purple-50 px-4 py-2 rounded-full">
                Newsletter
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Stay Connected
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Subscribe to our newsletter for the latest updates on events and
                activities
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-4 rounded-xl transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Subscribe</span>
                  <ArrowLongRightIcon className="w-5 h-5" />
                </button>
              </form>
            </div>
        </div>
      </section>
    </main>
  );
}
