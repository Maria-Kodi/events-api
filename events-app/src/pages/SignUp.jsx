import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await fetch(`${API_URL}/users`, {
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

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
        Create Account
      </h2>

      <p className="text-gray-500 text-center mb-6">
        Join EventsApp and discover amazing events.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          className="input input-bordered w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="btn w-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 text-white border-none"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <p className="text-sm text-center mt-5 text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-purple-600 font-semibold">
          Sign in
        </Link>
      </p>
    </div>
  );
}