import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-indigo-50">
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 flex flex-col flex-1">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}