import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function CreateEvent() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [date, setDate] = useState("");

  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    setIsSubmitting(true);

    try {

      if (!token) {

        throw new Error("You must be logged in to create an event.");

      }

      const response = await fetch("http://localhost:3001/api/events", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,

        },

        body: JSON.stringify({

          title,

          date,

          description,

        }),

      });

      const data = await response.json();

      if (!response.ok) {

        throw new Error(data.message || "Failed to create event.");

      }

      alert("Event created successfully!");

      navigate("/");

    } catch (err) {

      setError(err.message);

    } finally {

      setIsSubmitting(false);

    }

  }

  return (

    <div className="max-w-xl mx-auto mt-10 card bg-white shadow-xl p-8">

      <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">

        Create New Event

      </h2>

      <p className="text-center text-gray-500 mb-8">

        Share your event with the community.

      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>

          <label className="label">

            <span className="label-text font-medium">

              Event Title

            </span>

          </label>

          <input

            type="text"

            placeholder="React Meetup"

            className="input input-bordered w-full"

            value={title}

            onChange={(e) => setTitle(e.target.value)}

            required

          />

        </div>

        <div>

          <label className="label">

            <span className="label-text font-medium">

              Event Date

            </span>

          </label>

          <input

            type="date"

            className="input input-bordered w-full"

            value={date}

            onChange={(e) => setDate(e.target.value)}

            required

          />

        </div>

        <div>

          <label className="label">

            <span className="label-text font-medium">

              Description

            </span>

          </label>

          <textarea

            placeholder="Describe your event..."

            className="textarea textarea-bordered w-full min-h-32"

            value={description}

            onChange={(e) => setDescription(e.target.value)}

            required

          />

        </div>

        {error && (

          <div className="alert alert-error">

            <span>{error}</span>

          </div>

        )}

        <button

          type="submit"

          disabled={isSubmitting}

          className="btn w-full rounded-full bg-indigo-600 text-white border-none hover:bg-indigo-700"

        >

          {isSubmitting ? "Creating..." : "Create Event"}

        </button>

      </form>

    </div>

  );

}