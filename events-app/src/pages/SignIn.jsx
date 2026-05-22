import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

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

      login(data.token);

      toast.success("Login successful!");

      navigate("/");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8">

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
          autoComplete="email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="
            btn w-full rounded-full
            bg-gradient-to-r
            from-indigo-500 via-violet-500 to-purple-600
            text-white border-none

            hover:scale-[1.02]
            hover:brightness-110
            hover:shadow-[0_10px_30px_rgba(124,58,237,0.35)]

            transition-all duration-300

            disabled:opacity-70
          "
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

      </form>
    </div>
  );
}