"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Sparkles,
  PartyPopper,
  ShoppingCart,
  CreditCard,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </main>
    );
  }

  const totalPrice = getTotalPrice();
  const totalSavings = items.reduce((total, item) => {
    const originalPrice = item.unitPrice * item.quantity;
    const discountedPrice = item.unitPrice * (1 - item.discount / 100) * item.quantity;
    return total + (originalPrice - discountedPrice);
  }, 0);

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-900/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-900/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Empty cart content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <ShoppingCart className="w-32 h-32 text-gray-600 animate-pulse" strokeWidth={1} />
                <div className="absolute inset-0 blur-2xl bg-gray-600/30 animate-pulse" />
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 mb-6">
              Your Cart is Empty
            </h1>

            <p className="text-xl text-gray-400 mb-8">
              Looks like you haven't added any amazing deals yet!
              <br />
              <span className="text-gray-500 text-base italic">
                (Don't worry, we won't judge... much)
              </span>
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Start Shopping!</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-pink-900/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-900/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Continue Shopping</span>
            </Link>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-600 mb-2">
                  Your Cart
                </h1>
                <p className="text-gray-400">
                  {items.length} {items.length === 1 ? "item" : "items"} ready for checkout
                </p>
              </div>

              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Cart
                </button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const discountedPrice = item.unitPrice * (1 - item.discount / 100);
                const itemTotal = discountedPrice * item.quantity;
                const itemSavings = (item.unitPrice - discountedPrice) * item.quantity;

                return (
                  <div
                    key={item.productId}
                    className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-pink-500/30 transition-all duration-300"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <Link
                        href={`/product/${item.productId}`}
                        className="flex-shrink-0"
                      >
                        <div className="w-32 h-32 bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-pink-500 transition-all duration-300">
                          <img
                            src={item.productImageUrls[0]}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-4 mb-4">
                          <div>
                            <Link href={`/product/${item.productId}`}>
                              <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 hover:text-pink-400 transition-colors cursor-pointer">
                                {item.productName}
                              </h3>
                            </Link>
                            <Link
                              href={`/product/${item.productId}`}
                              className="flex items-center gap-2 mb-2 w-fit"
                            >
                              <span className="text-2xl font-black text-pink-400 hover:text-pink-300 transition-colors cursor-pointer">
                                ${discountedPrice.toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-600 line-through">
                                ${item.unitPrice.toFixed(2)}
                              </span>
                              <span className="text-xs bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2 py-1 rounded-full font-bold">
                                {item.discount}% OFF
                              </span>
                            </Link>
                            {itemSavings > 0 && (
                              <div className="text-xs text-green-400 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                You save ${itemSavings.toFixed(2)}!
                              </div>
                            )}
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-gray-500 hover:text-red-400 transition-colors p-2"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-2 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-white font-bold text-lg w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-2 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-gray-500 mb-1">Item Total</div>
                            <div className="text-2xl font-black text-white">
                              ${itemTotal.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Summary Card */}
                <div className="bg-gradient-to-br from-pink-900/20 to-purple-950/20 backdrop-blur-sm rounded-3xl p-8 border border-pink-500/30">
                  <div className="flex items-center gap-2 mb-6">
                    <PartyPopper className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-2xl font-black text-white">Order Summary</h2>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span className="font-bold">
                        ${(totalPrice + totalSavings).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-400">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        Savings
                      </span>
                      <span className="font-bold">-${totalSavings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span className="font-bold text-green-400">FREE</span>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between text-white text-xl font-black">
                        <span>Total</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5" />
                    <span>Proceed to Checkout</span>
                  </button>

                  {/* Trust Badges */}
                  <div className="space-y-2 text-center text-sm text-gray-400">
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-green-400" />
                      <span>100% Secure Checkout</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span>Free Shipping on All Orders</span>
                    </div>
                  </div>
                </div>

                {/* Promo Banner */}
                <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
                  <div className="text-center">
                    <div className="text-yellow-400 font-black text-lg mb-2">
                      🔥 BLACK FRIDAY SPECIAL 🔥
                    </div>
                    <div className="text-white text-sm">
                      You've already saved{" "}
                      <span className="font-black text-green-400">
                        ${totalSavings.toFixed(2)}
                      </span>{" "}
                      with these deals!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
