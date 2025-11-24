"use client";

import { Sparkles, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Product {
  productId: string;
  productName: string;
  unitPrice: number;
  currency: string;
  itemQuantity: number;
  discount: number;
  stockQuantity: number;
  productCategory: string;
  productCategoryId: string;
  productDescription: string;
  productImageUrls: string[];
  productUrls: string;
  promotionId: string;
  resumedCartItem: boolean;
  shoppingCartUrl: string;
  virtualCategory: string;
  actionState: string;
}

interface CategoryClientProps {
  categoryName: string;
  categoryProducts: Product[];
  maxDiscount: number;
  avgDiscount: number;
}

export default function CategoryClient({
  categoryName,
  categoryProducts,
  maxDiscount,
  avgDiscount,
}: CategoryClientProps) {
  const [particles, setParticles] = useState<Array<{left: number; top: number; delay: number; duration: number}>>([]);

  useEffect(() => {
    const newParticles = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden py-12 sm:py-20">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-900/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-900/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Shop</span>
        </Link>

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-white font-medium">{categoryName}</span>
        </nav>

        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Icon */}
          <div className="flex justify-center mb-6 animate-bounce">
            <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" strokeWidth={1.5} />
          </div>

          {/* Category heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-4 tracking-tight">
            {categoryName}
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-400 font-light mb-8">
            {categoryProducts.length} incredible {categoryProducts.length === 1 ? 'deal' : 'deals'} available
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-1">
                {maxDiscount}%
              </div>
              <div className="text-gray-500 text-xs sm:text-sm font-medium">MAX OFF</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-1">
                {categoryProducts.length}
              </div>
              <div className="text-gray-500 text-xs sm:text-sm font-medium">PRODUCTS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-1">
                {avgDiscount}%
              </div>
              <div className="text-gray-500 text-xs sm:text-sm font-medium">AVG OFF</div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => {
            const discountedPrice = product.unitPrice * (1 - product.discount / 100);

            return (
              <div
                key={product.productId}
                className="group relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20"
              >
                {/* Discount Badge */}
                <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full px-3 py-1 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-white" />
                  <span className="text-white font-bold text-sm">-{product.discount}%</span>
                </div>

                {/* Product Image */}
                <Link href={product.productUrls} className="block">
                  <div className="aspect-square w-full bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                    <img
                      src={product.productImageUrls[0]}
                      alt={product.productName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  <Link href={product.productUrls}>
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-pink-400 transition-colors">
                      {product.productName}
                    </h3>
                  </Link>

                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {product.productDescription}
                  </p>

                  {/* Price */}
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-gray-600 text-sm line-through mb-1">
                      ${product.unitPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={product.productUrls}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>View Deal</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animated particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/30 rounded-full animate-ping"
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
