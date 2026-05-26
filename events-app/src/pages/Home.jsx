import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EventCard from "../components/EventCard";
import EmptyState from "../components/EmptyState";

function SkeletonCard() {
  return (
    <div className="bg-white shadow-md p-5 animate-pulse rounded-3xl">
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // FETCH EVENTS 
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/events`
        );

        const data = await res.json();

        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const now = Date.now();

  const upcomingEvents = Array.isArray(events)
  ? events
  : [];

  const featuredEvent =
    upcomingEvents
      .sort((a, b) => new Date(a.date) - new Date(b.date))[0] || null;

  const filteredEvents = Array.isArray(events)
    ? events
        .filter((event) =>
          (event.title || "")
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .filter((event) => event.id !== featuredEvent?.id)
    : [];

  return (
    <section className="py-10 sm:py-16">

      <div className="grid md:grid-cols-2 gap-10 items-stretch mb-12 sm:mb-16">

        <div>
          <span className="inline-block bg-indigo-100 text-purple-700 text-xs sm:text-sm font-medium px-4 py-2 rounded-full mb-4">
            Discover events around you
          </span>

          <h1 className="text-4xl sm:text-6xl font-bold leading-tight text-gray-900">
            Discover{" "}
            <span className="text-purple-700">Events</span>
          </h1>

          <p className="py-5 text-gray-600 text-base sm:text-lg max-w-lg">
            Explore, create and join events happening near you.
          </p>

          <input
            type="text"
            placeholder="Search events..."
            className="input input-bordered w-full max-w-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FEATURED CARD */}
        <div
          onClick={() =>
            featuredEvent && navigate(`/events/${featuredEvent.id}`)
          }
          className="
            relative overflow-hidden
            rounded-[32px] p-8
            min-h-[320px]
            bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700
            shadow-[0_20px_60px_rgba(79,70,229,0.35)]
            border border-white/20
            cursor-pointer flex flex-col
          "
        >
          <div className="relative z-10 flex flex-col h-full">

            {/* TOP */}
            <div className="flex items-center justify-between mb-6">
              <span className="bg-white/15 text-white text-xs font-semibold px-4 py-2 rounded-full">
                ✨ Featured Event
              </span>

              <span className="text-sm text-indigo-100">
                {featuredEvent
                  ? new Date(featuredEvent.date).toLocaleDateString()
                  : "No date"}
              </span>
            </div>

            {/* TITLE */}
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {featuredEvent?.title || "No upcoming events"}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-indigo-100 mb-8 line-clamp-3">
              {featuredEvent?.description ||
                "Create your first event and start exploring!"}
            </p>

            {/* BOTTOM */}
            <div className="mt-auto flex items-end justify-between">

              <div>
                <p className="text-sm text-indigo-200">Location</p>
                <p className="text-white font-semibold">
                  {featuredEvent?.location || "—"}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  featuredEvent &&
                    navigate(`/events/${featuredEvent.id}`);
                }}
                className="btn rounded-full bg-white text-purple-700 border-none"
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
          <h2 className="text-3xl font-bold mb-6">
            Upcoming Events
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => navigate("/events")}
              className="
                btn rounded-full
                bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600
                text-white hover:scale-105 transition
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