import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 card bg-white shadow-xl p-8">

      <h2 className="text-2xl font-bold text-center mb-2">
        Create account
      </h2>

      <p className="text-sm text-gray-500 text-center mb-6">
        Join EventsApp and discover amazing events
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="input input-bordered w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn w-full rounded-full bg-indigo-600 text-white border-none hover:bg-indigo-700"
        >
          Sign Up
        </button>

      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 font-medium">
          Sign in
        </Link>
      </p>

    </div>
  );
}