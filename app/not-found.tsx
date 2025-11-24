"use client";

import Link from "next/link";
import { SearchX, Home, ShoppingBag, MapPin, Compass } from "lucide-react";
import productsData from "@/data/products.json";
import { useState, useEffect } from "react";

export default function NotFoundPage() {
  const [randomProducts, setRandomProducts] = useState<typeof productsData>([]);
  const [floatingIcons, setFloatingIcons] = useState<Array<{left: number; top: number; delay: number; duration: number}>>([]);

  useEffect(() => {
    // Pick 3 random products for "maybe you were looking for these?"
    const shuffled = [...productsData].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 3));

    // Generate random floating icons
    const newIcons = [...Array(8)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }));
    setFloatingIcons(newIcons);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-900/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-900/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* 404 Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <SearchX className="w-24 h-24 sm:w-32 sm:h-32 text-purple-500 animate-pulse" strokeWidth={1.5} />
              <div className="absolute inset-0 blur-2xl bg-purple-500/50 animate-pulse" />
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center mb-12">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-600 mb-6">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              You're Lost in the Void!
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-6 max-w-2xl mx-auto">
              This page doesn't exist... or maybe it's in a parallel universe where Black Friday is actually on a Tuesday.
              <br />
              <span className="text-gray-500 text-base italic mt-2 block">
                (Either way, you definitely took a wrong turn somewhere)
              </span>
            </p>
          </div>

          {/* Fun 404 Message */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 mb-12">
            <div className="font-mono text-purple-400 text-sm mb-2">ERROR_CODE: 404</div>
            <div className="text-gray-500 text-sm">
              "Page Not Found" - The page you're looking for went out for coffee and never came back.
              <br />
              <span className="text-xs text-gray-600 italic mt-2 block">
                Last seen: Never. Because it doesn't exist. Sorry about that.
              </span>
            </div>
          </div>

          {/* The Redirect Sales Pitch */}
          <div className="bg-gradient-to-br from-blue-900/20 to-purple-950/20 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="w-8 h-8 text-pink-400" />
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                But Hey, Look What We Found!
              </h3>
            </div>
            <p className="text-gray-300 text-lg mb-6">
              Since you're already here (and clearly lost), check out these{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 font-bold">
                AMAZING DEALS
              </span>{" "}
              that{" "}
              <span className="underline decoration-blue-400">actually exist</span>:
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
                      className="group bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:scale-105"
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
                      <div className="text-purple-400 font-bold">
                        ${discountedPrice.toFixed(2)}
                        <span className="text-xs text-gray-600 line-through ml-2">
                          ${product.unitPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-xs text-blue-400 mt-1">
                        ✓ This one exists, we promise!
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <p className="text-xs text-gray-600 italic">
              *Unlike the page you were looking for, these products are 100% real and ready to ship!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/"
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              <Home className="w-5 h-5" />
              <span>Take Me Home</span>
            </Link>
            <Link
              href="/"
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop All Deals</span>
            </Link>
          </div>

          {/* Fun Facts */}
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50">
            <div className="text-center text-gray-500 text-sm space-y-2">
              <p>
                <Compass className="w-4 h-4 inline mr-2 text-purple-400" />
                <span className="text-gray-400">Navigation Tip:</span> Try using the home button. It works 100% of the time, 60% of the time.
              </p>
              <p>
                <MapPin className="w-4 h-4 inline mr-2 text-blue-400" />
                <span className="text-gray-400">Fun Fact:</span> You're the {Math.floor(Math.random() * 1000 + 100)}th person to get lost here today!
              </p>
              <p className="text-xs text-gray-600 italic">
                (We made that number up, but you're definitely not alone)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating question marks and icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((icon, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-10 animate-bounce"
            style={{
              left: `${icon.left}%`,
              top: `${icon.top}%`,
              animationDelay: `${icon.delay}s`,
              animationDuration: `${icon.duration}s`,
            }}
          >
            {i % 3 === 0 ? "?" : i % 3 === 1 ? "🔍" : "🗺️"}
          </div>
        ))}
      </div>
    </main>
  );
}
