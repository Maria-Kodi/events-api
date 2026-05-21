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
        card bg-white shadow-md p-6 cursor-pointer
        hover:shadow-2xl hover:-translate-y-1
        transition duration-300
        border border-gray-100 rounded-3xl
      "
    >
      <div className="flex items-center justify-between mb-4">

        <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
          Upcoming Event
        </span>

        <span className="text-sm text-gray-400">
          {formatDate(event.date)}
        </span>

      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        {event.title}
      </h2>

      <p className="text-gray-600 line-clamp-3">
        {event.description}
      </p>

      <div className="mt-6 flex items-center justify-between">

        <span className="text-sm text-gray-400">
          View details
        </span>

        <div className="text-indigo-600 text-xl">
          →
        </div>

      </div>
    </div>
  );
}