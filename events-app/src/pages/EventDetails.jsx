import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:3001/api/events/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Event not found");
        }

        setEvent(data);

      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 font-medium">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost mb-6"
      >
        ← Back
      </button>

      <div className="card bg-white shadow-2xl rounded-3xl p-8">

        <div className="mb-4">
          <span className="bg-indigo-100 text-indigo-700 text-sm px-4 py-1 rounded-full font-medium">
            Event
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {event.title}
        </h1>

        <p className="text-gray-500 mb-8 text-lg">
          📅 {formatDate(event.date)}
        </p>

        <p className="text-gray-700 leading-8 text-lg whitespace-pre-line">
          {event.description}
        </p>

      </div>
    </div>
  );
}