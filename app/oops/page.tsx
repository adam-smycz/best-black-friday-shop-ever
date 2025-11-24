"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, Home, ShoppingBag, Zap } from "lucide-react";
import productsData from "@/data/products.json";
import { useState, useEffect } from "react";

export default function OopsPage() {
  const [randomProducts, setRandomProducts] = useState<typeof productsData>([]);
  const [particles, setParticles] = useState<Array<{left: number; top: number; delay: number; duration: number}>>([]);

  useEffect(() => {
    // Pick 3 random products that "definitely work"
    const shuffled = [...productsData].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 3));

    // Generate random particles positions and animations
    const newParticles = [...Array(10)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-red-900/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-orange-900/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Error Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <AlertTriangle className="w-24 h-24 sm:w-32 sm:h-32 text-orange-500 animate-bounce" strokeWidth={1.5} />
              <div className="absolute inset-0 blur-2xl bg-orange-500/50 animate-pulse" />
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 mb-6">
              OOPS!
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Something Went Wrong...
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-6 max-w-2xl mx-auto">
              Well, this is awkward. Our server just tripped over a cable or something.
              <br />
              <span className="text-gray-500 text-base italic">
                (Probably Steve's fault, he never ties his shoelaces)
              </span>
            </p>
          </div>

          {/* Funny Error Code */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30 mb-12">
            <div className="font-mono text-red-400 text-sm mb-2">ERROR_CODE: 418</div>
            <div className="text-gray-500 text-sm">
              "I'm a teapot" - The server refuses to brew coffee because it is, permanently, a teapot.
              <br />
              <span className="text-xs text-gray-600 italic">
                (Yes, this is a real HTTP status code. We're not making this up.)
              </span>
            </div>
          </div>

          {/* The Sales Pitch Disguised as Help */}
          <div className="bg-gradient-to-br from-green-900/20 to-emerald-950/20 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-yellow-400" />
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                BUT WAIT! Good News!
              </h3>
            </div>
            <p className="text-gray-300 text-lg mb-6">
              While our developers frantically debug this mess, you can check out these{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 font-bold">
                ACTUALLY WORKING
              </span>{" "}
              products that{" "}
              <span className="underline decoration-green-400">definitely won't error out</span>:
            </p>

            {/* Product Suggestions */}
            {randomProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {randomProducts.map((product) => {
                  const discountedPrice = product.unitPrice * (1 - product.discount / 100);
                  return (
                    <Link
                      key={product.productId}
                      href={product.productUrls}
                      className="group bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-green-500 transition-all duration-300 hover:scale-105"
                    >
                      <div className="aspect-square bg-gray-800 rounded-lg mb-3 overflow-hidden">
                        <img
                          src={product.productImageUrls[0]}
                          alt={product.productName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="text-white font-semibold text-sm mb-1 line-clamp-2">
                        {product.productName}
                      </div>
                      <div className="text-green-400 font-bold">
                        ${discountedPrice.toFixed(2)}
                        <span className="text-xs text-gray-600 line-through ml-2">
                          ${product.unitPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-xs text-green-400 mt-1">
                        ✓ Error-free guarantee*
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <p className="text-xs text-gray-600 italic">
              *Not an actual guarantee. But like, probably fine. We think. Maybe. 🤞
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/"
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
            >
              <Home className="w-5 h-5" />
              <span>Take Me Home</span>
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="group flex items-center justify-center gap-2 bg-gray-900 text-white font-bold py-4 px-8 rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:scale-105"
            >
              <Zap className="w-5 h-5 text-orange-400" />
              <span>Try Again (Why Not?)</span>
            </button>
          </div>

          {/* Fun Facts */}
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50">
            <div className="text-center text-gray-500 text-sm space-y-2">
              <p>
                💡 <span className="text-gray-400">Fun Fact:</span> This error page has a 0% error rate!
              </p>
              <p>
                🎯 <span className="text-gray-400">Pro Tip:</span> Buying something might make you feel better about this error.
              </p>
              <p className="text-xs text-gray-600 italic">
                (Statistically unproven but emotionally sound advice)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated error particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-500/30 rounded-full animate-ping"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
    </main>
  );
}
