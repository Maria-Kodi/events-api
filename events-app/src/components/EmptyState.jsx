import { Link } from "react-router-dom";

export default function EmptyState() {
  return (
    <div className="text-center py-16">

      <div className="text-4xl mb-4">🎉</div>

      <h2 className="text-2xl font-bold text-gray-800">
        No events found
      </h2>

      <p className="text-gray-500 mt-2">
        Be the first to create an event and start something amazing.
      </p>

      <Link
        to="/create"
        className="mt-6 p-4 btn rounded-full bg-indigo-600 text-white border-none hover:bg-indigo-700"
      >
        Create Event
      </Link>

    </div>
  );
}