"use client";

import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function FloatingCartButton() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Check if on cart page - handle both with and without trailing slash
  const isOnCartPage = pathname?.includes("/cart");

  useEffect(() => {
    setMounted(true);
    console.log("Current pathname:", pathname);
    console.log("Is on cart page:", pathname?.includes("/cart"));
  }, [pathname]);

  const handleClick = () => {
    if (isOnCartPage) {
      router.back();
    } else {
      router.push("/cart");
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed top-8 right-8 z-50 group"
      aria-label={isOnCartPage ? "Go Back" : "Shopping Cart"}
    >
      <div className="relative">
        {/* Main button */}
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 group-hover:rotate-12">
          {isOnCartPage ? (
            <ArrowLeft className="w-7 h-7" />
          ) : (
            <ShoppingCart className="w-7 h-7" />
          )}
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10" />

        {/* Counter badge - always show when there are items */}
        {totalItems > 0 && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-br from-orange-500 to-red-600 text-white text-xs font-black rounded-full w-7 h-7 flex items-center justify-center shadow-lg animate-bounce">
            {totalItems > 99 ? "99+" : totalItems}
          </div>
        )}

        {/* Pulse animation when items in cart - only show when not on cart page */}
        {!isOnCartPage && totalItems > 0 && (
          <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-20" />
        )}
      </div>
    </button>
  );
}
