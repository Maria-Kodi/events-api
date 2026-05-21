import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/events/${event.id}`)}
      className="card bg-white shadow-md p-5 cursor-pointer hover:shadow-xl transition border border-gray-100"
    >
      <h2 className="text-xl font-semibold text-gray-900">
        {event.title}
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        {event.date}
      </p>

      <p className="text-gray-600 mt-3 line-clamp-2">
        {event.description}
      </p>
    </div>
  );
}


