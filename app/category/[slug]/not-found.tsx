import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function CategoryNotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-900/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-900/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Search className="w-32 h-32 text-gray-600 animate-pulse" strokeWidth={1} />
              <div className="absolute inset-0 blur-2xl bg-gray-600/30 animate-pulse" />
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 mb-6">
            Category Not Found
          </h1>

          <p className="text-xl text-gray-400 mb-8">
            We couldn't find any products in this category.
            <br />
            <span className="text-gray-500 text-base italic">
              (But we have plenty of other amazing deals!)
            </span>
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
