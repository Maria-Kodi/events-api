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
      className="group relative overflow-hidden bg-white border border-indigo-100 rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,0.18)]"
    >
      {/* content */}
    </div>
  );
}