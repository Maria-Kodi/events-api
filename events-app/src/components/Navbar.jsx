import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex justify-between items-center py-4 mb-6 border-b border-indigo-600">

      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        Events<span className="text-indigo-600">App</span>
      </h1>

      <div className="flex gap-4">

        <Link
          to="/"
          className="btn rounded-full bg-indigo-600 hover:bg-indigo-700 text-white border-none"
        >
          Home
        </Link>

        {isAuthenticated ? (
          <>
            <Link
              to="/create"
              className="btn rounded-full bg-indigo-600 hover:bg-indigo-700 text-white border-none"
            >
              Create Event
            </Link>

            <button
              onClick={logout}
              className="btn rounded-full bg-red-500 hover:bg-red-600 text-white border-none"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn rounded-full bg-indigo-600 hover:bg-indigo-700 text-white border-none"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="btn rounded-full bg-indigo-600 hover:bg-indigo-700 text-white border-none"
            >
              Sign Up
            </Link>
          </>
        )}

      </div>
    </div>
  );
}