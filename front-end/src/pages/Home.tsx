import { Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-pink-100 to-indigo-100 text-gray-800 flex flex-col">
      {/* Navbar */}
      <nav className="w-full px-8 py-4 flex justify-between items-center bg-white/80 backdrop-blur-lg shadow-xl rounded-b-2xl z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="text-pink-400 animate-spin-slow" size={28} />
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-pink-500 to-sky-400 text-transparent bg-clip-text drop-shadow-lg animate-gradient-x">MyDiary</h1>
        </div>
        <div className="space-x-4">
          <button className="text-indigo-600 font-semibold hover:underline transition">Login</button>
          <button className="bg-gradient-to-r from-indigo-500 to-pink-400 text-white px-5 py-2 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-indigo-600 via-pink-400 to-sky-400 text-transparent bg-clip-text animate-gradient-x drop-shadow-xl">
          Your Personal Space <br /> to Capture Every Thought
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl font-medium">
          Reflect, write, and grow with your daily journal. <span className="font-bold text-indigo-500">MyDiary</span> is your safe digital notebook.
        </p>
        <Button onClick={() => navigate("/diary")} className="bg-gradient-to-r from-indigo-500 to-pink-400 text-white px-8 py-3 rounded-full text-xl font-semibold shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200">
          Write a New Entry
        </Button>
      </main>

      {/* Footer */}
      <footer className="text-center text-indigo-400 text-sm py-4 opacity-80">
        &copy; {new Date().getFullYear()} MyDiary. All rights reserved.
      </footer>
      {/* Animated gradient background overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-pink-300/30 via-indigo-200/30 to-sky-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 via-pink-200/20 to-sky-300/20 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>
    </div>
  );
}
