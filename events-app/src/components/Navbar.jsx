import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center py-4 mb-6 border-b border-indigo-600">
<h1 className="text-2xl font-bold tracking-tight text-gray-900">
  Events<span className="text-indigo-600">App</span>
</h1>

      <div className="flex gap-4">
        <Link to="/" className="btn rounded-full bg-indigo-600 hover:bg-indigo-700 text-white">Home</Link>
        <Link to="/login" className="btn rounded-full bg-indigo-600 hover:bg-indigo-700 text-white">Login</Link>
        <Link to="/signup" className="btn rounded-full bg-indigo-600 hover:bg-indigo-700 text-white">Sign Up</Link>
      </div>
    </div>
  );
}
