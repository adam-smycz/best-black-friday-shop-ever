"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Heart, Share2, Tag, Truck, Shield, RotateCcw } from "lucide-react";

interface Product {
  productId: string;
  productName: string;
  unitPrice: number;
  currency: string;
  itemQuantity: number;
  discount: number;
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

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const discountedPrice = product.unitPrice * (1 - product.discount / 100);
  const totalPrice = discountedPrice * quantity;
  const savedAmount = (product.unitPrice - discountedPrice) * quantity;

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Hidden microdata elements */}
      <meta itemProp="sku" content={product.productId} />
      <meta itemProp="mpn" content={product.productId} />
      <meta itemProp="brand" content="Best Black Friday Shop" />
      <link itemProp="url" href={product.productUrls} />
      <link itemProp="image" href={product.productImageUrls[0]} />

      {/* Product offer data */}
      <div itemProp="offers" itemScope itemType="https://schema.org/Offer" style={{ display: 'none' }}>
        <meta itemProp="price" content={discountedPrice.toFixed(2)} />
        <meta itemProp="priceCurrency" content={product.currency} />
        <meta itemProp="availability" content="https://schema.org/InStock" />
        <meta itemProp="itemCondition" content="https://schema.org/NewCondition" />
        <meta itemProp="url" content={product.productUrls} />
        <link itemProp="seller" href="https://best-black-friday-shop.com" />
      </div>

      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-900/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-900/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Shop</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="sticky top-8">
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5 text-white" />
                    <span className="text-white font-bold text-lg">-{product.discount}% OFF</span>
                  </div>
                </div>

                {/* Main Image */}
                <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl overflow-hidden border border-gray-800/50 shadow-2xl">
                  <img
                    src={product.productImageUrls[0]}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              {/* Category & Status */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-semibold text-pink-400 bg-pink-400/10 px-3 py-1 rounded-full"
                  itemProp="category"
                >
                  {product.virtualCategory}
                </span>
                <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-3 py-1 rounded-full flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span itemProp="availability" content="https://schema.org/InStock">In Stock</span>
                </span>
              </div>

              {/* Product Name */}
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
                itemProp="name"
              >
                {product.productName}
              </h1>

              {/* Description */}
              <p
                className="text-gray-400 text-lg mb-6 leading-relaxed"
                itemProp="description"
              >
                {product.productDescription}
              </p>

              {/* Pricing */}
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 mb-6">
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-2xl text-gray-600 line-through mb-2">
                    ${product.unitPrice.toFixed(2)}
                  </span>
                </div>
                <div className="text-green-400 font-semibold text-sm">
                  You save ${savedAmount.toFixed(2)} ({product.discount}%)
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="text-gray-400 font-medium mb-3 block">Quantity:</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-gray-900/50 rounded-lg border border-gray-800">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-white hover:text-pink-400 transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="px-6 py-3 text-white font-bold border-x border-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 text-white hover:text-pink-400 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                  {quantity > 1 && (
                    <div className="text-gray-400 text-sm">
                      Total: <span className="text-white font-bold">${totalPrice.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-8">
                <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    isLiked
                      ? "bg-pink-500 border-pink-500 text-white"
                      : "border-gray-800 text-gray-400 hover:border-pink-500 hover:text-pink-500"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                </button>
                <button className="p-4 rounded-xl border border-gray-800 text-gray-400 hover:border-purple-500 hover:text-purple-500 transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50">
                  <Truck className="w-6 h-6 text-pink-400 mb-2" />
                  <div className="text-white font-semibold text-sm mb-1">Free Shipping</div>
                  <div className="text-gray-500 text-xs">On orders over $50</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50">
                  <Shield className="w-6 h-6 text-purple-400 mb-2" />
                  <div className="text-white font-semibold text-sm mb-1">Secure Payment</div>
                  <div className="text-gray-500 text-xs">100% protected</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50">
                  <RotateCcw className="w-6 h-6 text-yellow-400 mb-2" />
                  <div className="text-white font-semibold text-sm mb-1">Easy Returns</div>
                  <div className="text-gray-500 text-xs">30-day guarantee</div>
                </div>
              </div>

              {/* Product Details */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800/50">
                <h3 className="text-white font-bold text-lg mb-4">Product Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-400">Product ID:</span>
                    <span className="text-white font-mono">{product.productId}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white">{product.productCategory}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-400">Promotion:</span>
                    <span className="text-pink-400 font-semibold">{product.promotionId}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Currency:</span>
                    <span className="text-white">{product.currency}</span>
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
