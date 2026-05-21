import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:3001/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // save token
      login(data.token);

      // redirect
      navigate("/");

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 card bg-white shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">
        Welcome Back
      </h2>

      <p className="text-center text-gray-500 mb-6">
        Sign in to continue exploring events.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn w-full rounded-full bg-indigo-600 text-white border-none hover:bg-indigo-700"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

      </form>
    </div>
  );
}