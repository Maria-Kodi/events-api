import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import EmptyState from "../components/EmptyState";

function SkeletonCard() {
  return (
    <div className="card bg-white shadow-md p-5 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-2/3 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
}

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:3001/api/events");
        const data = await res.json();

        console.log("API response:", data);

        setEvents(Array.isArray(data) ? data : data?.events || []);
      } catch (err) {
        console.error(err);
        setEvents([]); // fallback
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const filteredEvents = Array.isArray(events)
    ? events.filter((event) =>
        (event.title || "")
          .toLowerCase()
          .includes((search || "").toLowerCase())
      )
    : [];

  return (
    <section className="py-16">

      {/* HERO */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Discover Amazing{" "}
            <span className="text-indigo-600">Events</span>
          </h1>

          <p className="py-6 text-gray-600">
            Explore, create and join events happening around you.
          </p>

          <input
            type="text"
            placeholder="Search events..."
            className="input input-bordered w-full max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="card bg-white shadow-xl p-8">
          <h3 className="font-bold text-lg">React Conference</h3>
          <p>Düsseldorf • 22 May 2026</p>
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

    </section>
  );
}