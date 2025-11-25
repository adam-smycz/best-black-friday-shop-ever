"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Package,
  Truck,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  User,
  Lock,
  Calendar,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SHIPPING_OPTIONS = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 0,
    icon: Package,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    price: 15.99,
    icon: Truck,
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day",
    price: 29.99,
    icon: Sparkles,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push("/cart");
    }
  }, [mounted, items, router]);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </main>
    );
  }

  if (items.length === 0) {
    return null;
  }

  const subtotal = getTotalPrice();
  const shippingCost = SHIPPING_OPTIONS.find(opt => opt.id === selectedShipping)?.price || 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is just a fake checkout - no actual processing
    alert("This is a demo checkout! No actual payment will be processed.");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-green-900/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-900/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Cart</span>
            </Link>

            <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-2">
              Checkout
            </h1>
            <p className="text-gray-400">Complete your order</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Information */}
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-xl">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Shipping Information</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Shipping Method</h2>
                  </div>

                  <div className="space-y-3">
                    {SHIPPING_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      return (
                        <label
                          key={option.id}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedShipping === option.id
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
                          }`}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            checked={selectedShipping === option.id}
                            onChange={(e) => setSelectedShipping(e.target.value)}
                            className="w-5 h-5 text-blue-500"
                          />
                          <Icon className="w-6 h-6 text-gray-400" />
                          <div className="flex-1">
                            <div className="font-bold text-white">{option.name}</div>
                            <div className="text-sm text-gray-400">{option.description}</div>
                          </div>
                          <div className="font-bold text-white">
                            {option.price === 0 ? "FREE" : `$${option.price.toFixed(2)}`}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Payment Information</h2>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <CreditCard className="w-4 h-4 inline mr-2" />
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        <Lock className="w-4 h-4 inline mr-2" />
                        CVV
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-yellow-200">
                        <span className="font-bold">Demo Mode:</span> This is a fake checkout page.
                        No actual payment will be processed. Feel free to use any test data.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Summary Card */}
                  <div className="bg-gradient-to-br from-green-900/20 to-blue-950/20 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30">
                    <div className="flex items-center gap-2 mb-6">
                      <PartyPopper className="w-6 h-6 text-yellow-400" />
                      <h2 className="text-2xl font-black text-white">Order Summary</h2>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-300">
                        <span>Subtotal ({items.length} items)</span>
                        <span className="font-bold">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Shipping</span>
                        <span className="font-bold">
                          {shippingCost === 0 ? (
                            <span className="text-green-400">FREE</span>
                          ) : (
                            `$${shippingCost.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Tax (8%)</span>
                        <span className="font-bold">${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-700 pt-4">
                        <div className="flex justify-between text-white text-xl font-black">
                          <span>Total</span>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="mb-6">
                      <div className="text-sm font-bold text-gray-400 mb-3">Items in Order:</div>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {items.map((item) => (
                          <div
                            key={item.productId}
                            className="flex items-center gap-3 p-2 bg-gray-800/30 rounded-lg"
                          >
                            <img
                              src={item.productImageUrls[0]}
                              alt={item.productName}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-white font-medium truncate">
                                {item.productName}
                              </div>
                              <div className="text-xs text-gray-400">Qty: {item.quantity}</div>
                            </div>
                            <div className="text-sm font-bold text-white">
                              ${(item.unitPrice * (1 - item.discount / 100) * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-black py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 mb-4"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Place Order</span>
                    </button>

                    {/* Trust Badges */}
                    <div className="space-y-2 text-center text-sm text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4 text-green-400" />
                        <span>256-bit SSL Encryption</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span>Money-Back Guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
