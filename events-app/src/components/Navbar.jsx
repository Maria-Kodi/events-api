import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const btnClass = `btn btn-sm sm:btn-md rounded-full bg-gradient-to-r
  from-indigo-500 via-violet-500 to-purple-600
  text-white border-none hover:scale-105
  hover:shadow-[0_10px_30px_rgba(124,58,237,0.45)]
  transition-all duration-300`;

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  }

  return (
    <div className="flex justify-between items-center py-4 mb-6 border-b border-indigo-600">
      <h1 className="text-2xl font-bold">
        Events
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600">
          App
        </span>
      </h1>

      <div className="flex gap-3">
        <Link className={btnClass} to="/">
          Home
        </Link>

        {!isAuthenticated ? (
          <>
            <Link className={btnClass} to="/login">
              Login
            </Link>
            <Link className={btnClass} to="/signup">
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="btn btn-sm sm:btn-md rounded-full bg-red-500 text-white border-none hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}