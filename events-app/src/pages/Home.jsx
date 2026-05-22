import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EventCard from "../components/EventCard";
import EmptyState from "../components/EmptyState";

function SkeletonCard() {
  return (
    <div className="bg-purple shadow-md p-5 animate-pulse rounded-3xl">
      <div className="h-4 bg-purple-300 rounded w-2/3 mb-3"></div>
      <div className="h-4 bg-purple-300 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-purple-300 rounded w-5/6"></div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3001/api/events");
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : data?.events || []);
      } catch (err) {
        console.error(err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const featuredEvent = Array.isArray(events)
    ? [...events]
        .filter((e) => new Date(e.date).getTime() >= Date.now())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .at(0)
    : null;

  const filteredEvents = Array.isArray(events)
    ? events
        .filter((event) =>
          (event.title || "").toLowerCase().includes(search.toLowerCase())
        )
        .filter((event) => event.id !== featuredEvent?.id)
    : [];

  return (
    <section className="py-8 sm:py-16">

      {/* HERO */}
      <div className="grid md:grid-cols-2 gap-8 items-stretch mb-10 sm:mb-16">

        {/* LEFT */}
        <div>
          <span className="inline-block bg-indigo-100 text-purple-700 text-xs sm:text-sm font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-5">
            Discover events around you
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900">
            Discover <br className="sm:hidden" />Amazing{" "}
            <span className="text-purple-700">Events</span>
          </h1>

          <p className="py-4 sm:py-6 text-base sm:text-lg text-gray-600 max-w-lg">
            Explore, create and join exciting events happening in your city.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search events..."
              className="input input-bordered w-full max-w-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* FEATURED */}
        <div
          onClick={() => featuredEvent && navigate(`/events/${featuredEvent.id}`)}
          className="
            relative overflow-hidden rounded-[32px]
            p-5 sm:p-8 min-h-[280px] sm:min-h-[360px]
            bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700
            shadow-[0_20px_60px_rgba(79,70,229,0.35)]
            border border-white/20
            cursor-pointer flex flex-col
          "
        >
          <div className="relative z-10 flex flex-col h-full">

            {/* TOP */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <span className="bg-white/15 text-white text-xs font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                ✨ Featured Event
              </span>
              <span className="text-xs sm:text-sm text-indigo-100">
                {featuredEvent?.date
                  ? new Date(featuredEvent.date).toLocaleDateString()
                  : "—"}
              </span>
            </div>

            {/* TITLE */}
            <h3 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 line-clamp-2">
              {featuredEvent?.title || "No events yet"}
            </h3>

            {/* DESC */}
            <p className="text-indigo-100 text-sm sm:text-lg mb-6 sm:mb-10 line-clamp-3">
              {featuredEvent?.description || "Create your first event"}
            </p>

            {/* BOTTOM */}
            <div className="mt-auto flex items-end justify-between">
              <div>
                <p className="text-xs sm:text-sm text-indigo-200">Location</p>
                <p className="text-sm sm:text-base font-semibold text-white">
                  {featuredEvent?.location || "—"}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  featuredEvent && navigate(`/events/${featuredEvent.id}`);
                }}
                className="
                  btn btn-sm sm:btn-md rounded-full
                  bg-white text-purple-700
                  border-none hover:bg-indigo-50
                  px-4 sm:px-6
                "
              >
                Explore →
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* EVENTS */}
      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Upcoming Events
            </h2>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Explore the latest events.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="flex justify-center mt-8 sm:mt-12">
            <button
              onClick={() => navigate("/events")}
              className="
                btn btn-sm sm:btn-md rounded-full
                bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600
                text-white hover:scale-105 transition-all
              "
            >
              Explore All Events
            </button>
          </div>
        </>
      )}

    </section>
  );
}