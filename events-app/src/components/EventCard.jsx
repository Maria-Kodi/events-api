import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  function formatDate(dateString) {
    if (!dateString) return "No date";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div
      onClick={() => event?.id && navigate(`/events/${event.id}`)}
      className="group relative overflow-hidden bg-white border border-indigo-100 rounded-3xl p-7 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(99,102,241,0.18)] hover:border-indigo-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full">
            {formatDate(event?.date)}
          </span>
          {event?.location && (
            <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
              📍 {event.location}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-200 leading-snug">
          {event?.title || "Untitled Event"}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-5">
          {event?.description || "No description available."}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-indigo-50">
          <span className="text-xs text-gray-400">Click to explore</span>
          <span className="text-xs font-semibold text-purple-600 group-hover:translate-x-1 transition-transform duration-200">
            View details →
          </span>
        </div>
      </div>
    </div>
  );
}