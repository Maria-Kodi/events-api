import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading event...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="card bg-white shadow-xl p-6">

        <h1 className="text-3xl font-bold mb-2">
          {event.title}
        </h1>

        <p className="text-gray-500 mb-4">
          {event.date}
        </p>

        <p className="text-gray-700 leading-relaxed">
          {event.description}
        </p>

      </div>
    </div>
  );
}