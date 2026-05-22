export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">
            Events<span className="text-purple-600">App</span>
          </h2>
          <p className="text-sm mt-1">
            Discover and create unforgettable experiences.
          </p>
        </div>

        <p className="text-sm">
          © {new Date().getFullYear()} EventsApp
        </p>
      </div>
    </footer>
  );
}