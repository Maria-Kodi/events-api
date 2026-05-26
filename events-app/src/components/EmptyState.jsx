import { useNavigate } from "react-router-dom";

export default function EmptyState() {

  const navigate = useNavigate();

  return (
    <div className="text-center py-16">

      <div className="text-4xl mb-4">🎉</div>

      <h2 className="text-2xl font-bold text-gray-800">
        No events found
      </h2>

      <p className="text-gray-500 mt-2">
        Be the first to create an event and start something amazing.
      </p>

      <button
        onClick={() => navigate("/create")}
        className="
          mt-6
          btn rounded-full
          bg-gradient-to-r
          from-indigo-500 via-violet-500 to-purple-600
          text-white border-none
          hover:scale-105
          hover:shadow-[0_0_25px_rgba(139,92,246,0.7)]
          transition-all duration-300
        "
      >
        Create New Event
      </button>

    </div>
  );
}