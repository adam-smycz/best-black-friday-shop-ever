"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function FloatingCartButton() {
  const [mounted, setMounted] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Link
      href="/cart"
      className="fixed top-8 right-8 z-50 group"
      aria-label="Shopping Cart"
    >
      <div className="relative">
        {/* Main button */}
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 group-hover:rotate-12">
          <ShoppingCart className="w-7 h-7" />
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10" />

        {/* Counter badge */}
        {totalItems > 0 && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-br from-orange-500 to-red-600 text-white text-xs font-black rounded-full w-7 h-7 flex items-center justify-center shadow-lg animate-bounce">
            {totalItems > 99 ? "99+" : totalItems}
          </div>
        )}

        {/* Pulse animation when items in cart */}
        {totalItems > 0 && (
          <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-20" />
        )}
      </div>
    </Link>
  );
}
