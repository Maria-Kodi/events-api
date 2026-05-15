export default function Home() {
  return (
    <section className="py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Discover Amazing
            <span className="text-indigo-600"> Events</span>
          </h1>

          <p className="py-6 text-gray-600">
            Explore, create and join events happening around you.
          </p>

          <button className="btn rounded-full bg-indigo-600 text-white border-none">
            Browse Events
          </button>
        </div>

        <div className="card bg-white shadow-xl p-8">
          <h3 className="font-bold text-lg">React Conference</h3>
          <p>Düsseldorf• May 22</p>
        </div>
      </div>
    </section>
  );
}