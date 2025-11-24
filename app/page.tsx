import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-900/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-900/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-8 animate-bounce">
          <Sparkles className="w-16 h-16 sm:w-24 sm:h-24 text-yellow-400" strokeWidth={1.5} />
        </div>

        {/* Main heading */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-6 tracking-tight leading-tight">
          BEST BLACK
          <br />
          FRIDAY SHOP
          <br />
          <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">EVER</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-light mb-12 max-w-3xl mx-auto">
          Coming soon with the most incredible deals you've ever seen
        </p>

        {/* CTA Button */}
        <button className="group relative px-8 py-4 sm:px-12 sm:py-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-bold text-lg sm:text-xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 active:scale-95">
          <span className="relative z-10">Get Notified</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
        </button>

        {/* Stats */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
              90%
            </div>
            <div className="text-gray-500 text-sm sm:text-base font-medium">OFF EVERYTHING</div>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">
              24H
            </div>
            <div className="text-gray-500 text-sm sm:text-base font-medium">FLASH SALES</div>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-2">
              1000+
            </div>
            <div className="text-gray-500 text-sm sm:text-base font-medium">PRODUCTS</div>
          </div>
        </div>
      </div>

      {/* Animated particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </main>
  );
}
