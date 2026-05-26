import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`${API_URL}/events/${id}`);

        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();

        setEvent(data);

        setTitle(data.title || "");
        setDate(data.date?.split("T")[0] || "");
        setDescription(data.description || "");
        setLocation(data.location || "");

      } catch (err) {
        toast.error("Failed to load event");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id, API_URL]);

  async function handleUpdate() {
    try {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          date,
          description,
          location,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      const data = await res.json();

      setEvent(data);

      toast.success("Event updated!");

    } catch {
      toast.error("Update failed");
    }
  }

  async function handleDelete() {
    try {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Event deleted");

      navigate("/");

    } catch {
      toast.error("Delete failed");
    }
  }

  if (loading) {
    return (
      <p className="text-center mt-16 text-gray-500">
        Loading...
      </p>
    );
  }

  if (!event) {
    return (
      <p className="text-center mt-16 text-red-500">
        Event not found
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">

      {/* HERO CARD */}
      <div
        className="
          relative overflow-hidden
          rounded-[32px]
          p-8 mb-8

          bg-gradient-to-br
          from-indigo-600
          via-violet-600
          to-purple-700

          shadow-[0_20px_60px_rgba(79,70,229,0.35)]

          border border-white/20
        "
      >

        {/* glow */}
        <div
          className="
            absolute -top-16 -right-16
            w-56 h-56
            bg-white/20
            rounded-full
            blur-3xl
          "
        ></div>

        <div
          className="
            absolute bottom-0 left-0
            w-40 h-40
            bg-pink-400/20
            rounded-full
            blur-3xl
          "
        ></div>

        <div className="relative z-10">

          <span
            className="
              inline-block
              bg-white/15
              text-white
              text-xs
              font-semibold
              px-4 py-2
              rounded-full
              mb-5
            "
          >
            ✨ Event Details
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center gap-3 text-indigo-100">

            <p>
              📍 {location || "Germany"}
            </p>

            <p>
              📅 {date}
            </p>

          </div>

        </div>
      </div>

      {/* EDIT CARD */}
      <div
        className="
          bg-white
          rounded-[32px]
          shadow-xl
          border border-indigo-100
          p-8
        "
      >

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Edit Event
        </h2>

        {/* TITLE */}
        <div className="mb-5">

          <label className="block text-sm font-medium text-gray-600 mb-2">
            Event Title
          </label>

          <input
            id="title"
            name="title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

        </div>

        {/* DATE */}
        <div className="mb-5">

          <label className="block text-sm font-medium text-gray-600 mb-2">
            Event Date
          </label>

          <input
            id="date"
            name="date"
            type="date"
            className="input input-bordered w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

        </div>

        {/* LOCATION */}
        <div className="mb-5">

          <label className="block text-sm font-medium text-gray-600 mb-2">
            Location
          </label>

          <input
            id="location"
            name="location"
            type="text"
            className="input input-bordered w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

        </div>

        {/* DESCRIPTION */}
        <div className="mb-6">

          <label className="block text-sm font-medium text-gray-600 mb-2">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            className="textarea textarea-bordered w-full min-h-[140px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4">

          <button
            onClick={handleUpdate}
            className="
              btn rounded-full flex-1

              bg-gradient-to-r
              from-indigo-500 via-violet-500 to-purple-600

              text-white border-none

              hover:scale-[1.02]
              hover:brightness-110
              hover:shadow-[0_10px_30px_rgba(124,58,237,0.35)]

              transition-all duration-300
            "
          >
            Save Changes
          </button>

          <button
            onClick={handleDelete}
            className="
              btn rounded-full flex-1

              bg-red-500 text-white
              border-none

              hover:bg-red-600
              hover:scale-[1.02]

              transition-all duration-300
            "
          >
            Delete Event
          </button>

        </div>

      </div>
    </div>
  );
}