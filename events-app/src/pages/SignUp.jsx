import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await fetch(
        "http://localhost:3001/api/users",
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

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
          className="input input-bordered w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* BUTTON */}
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
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

      </form>

      {/* FOOTER */}
      <p className="text-sm text-center mt-5 text-gray-500">

        Already have an account?{" "}

        <Link
          to="/login"
          className="
            text-purple-600 font-semibold
            hover:text-purple-800
            transition
          "
        >
          Sign in
        </Link>

      </p>

    </div>
  );
}