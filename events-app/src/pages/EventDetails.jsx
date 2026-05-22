import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`http://localhost:3001/api/events/${id}`);
        const data = await res.json();

        setEvent(data);
        setTitle(data.title);
        setDate(data.date);
        setDescription(data.description);
      } catch (err) {
        toast.error("Failed to load event");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  // ✏️ UPDATE
  async function handleUpdate() {
    try {
      const res = await fetch(
        `http://localhost:3001/api/events/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, date, description }),
        }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      setEvent(data);

      toast.success("Event updated!");
    } catch {
      toast.error("Update failed");
    }
  }

  // 🗑️ DELETE
  async function handleDelete() {
    try {
      const res = await fetch(
        `http://localhost:3001/api/events/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Event deleted");
      navigate("/");
    } catch {
      toast.error("Delete failed");
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 card bg-white shadow-xl p-6">

      <input
        className="input input-bordered w-full mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        className="input input-bordered w-full mb-3"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <textarea
        className="textarea textarea-bordered w-full mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-3 mt-4">

        <button
          onClick={handleUpdate}
          className="btn bg-indigo-600 text-white"
        >
          Update
        </button>

        <button
          onClick={handleDelete}
          className="btn bg-red-500 text-white"
        >
          Delete
        </button>

      </div>
    </div>
  );
}