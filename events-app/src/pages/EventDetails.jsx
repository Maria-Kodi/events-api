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
  }, [id]);

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

      if (!res.ok) throw new Error();

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

      if (!res.ok) throw new Error();

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

  return (
    <div className="max-w-3xl mx-auto mt-10">
    </div>
  );
}