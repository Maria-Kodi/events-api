import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div
      onClick={() => navigate(`/events/${event.id}`)}
      className="
        group relative overflow-hidden
        bg-white
        border border-indigo-100
        rounded-3xl
        p-6
        cursor-pointer
        transition-all duration-300

        hover:-translate-y-1
        hover:shadow-[0_20px_60px_rgba(99,102,241,0.18)]
      "
    >

      {/* subtle purple glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition" />

      {/* TOP BADGE */}
      <div className="flex items-center justify-between mb-4">

        <span className="
          text-xs font-semibold
          bg-gradient-to-r from-indigo-100 to-purple-100
          text-indigo-700
          px-3 py-1 rounded-full
        ">
          Upcoming Event
        </span>

        <span className="text-xs text-gray-400">
          {formatDate(event.date)}
        </span>

      </div>

      {/* TITLE */}
      <h2 className="
        text-2xl font-bold text-gray-900 mb-2
        group-hover:text-indigo-700 transition
      ">
        {event.title}
      </h2>

      {/* LOCATION */}
      <p className="text-sm text-gray-500 mb-3">
        📍 {event.location}
      </p>

      {/* DESCRIPTION */}
      <p className="text-gray-600 line-clamp-3 mb-6">
        {event.description}
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between">

        <span className="text-sm text-gray-400 group-hover:text-indigo-500 transition">
          View details
        </span>

        <div className="
          text-indigo-500 text-xl
          group-hover:translate-x-1
          transition
        ">
          →
        </div>

      </div>

    </div>
  );
}