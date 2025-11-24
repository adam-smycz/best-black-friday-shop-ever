import { Sparkles, ShoppingCart, Tag } from "lucide-react";
import Link from "next/link";
import productsData from "@/data/products.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden py-12 sm:py-20">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-900/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-900/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        {/* Icon */}
        <div className="flex justify-center mb-8 animate-bounce">
          <Sparkles className="w-16 h-16 sm:w-24 sm:h-24 text-yellow-400" strokeWidth={1.5} />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-6 tracking-tight leading-tight">
          BEST BLACK
          <br />
          FRIDAY SHOP
          <br />
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">EVER</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light mb-8 max-w-3xl mx-auto">
          Insane deals on the hottest products
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-1">
              90%
            </div>
            <div className="text-gray-500 text-xs sm:text-sm font-medium">OFF</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-1">
              24H
            </div>
            <div className="text-gray-500 text-xs sm:text-sm font-medium">FLASH</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-1">
              10+
            </div>
            <div className="text-gray-500 text-xs sm:text-sm font-medium">DEALS</div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsData.map((product) => {
            const discountedPrice = product.unitPrice * (1 - product.discount / 100);

            return (
              <Link
                key={product.productId}
                href={product.productUrls}
                className="group relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20"
              >
                {/* Discount Badge */}
                <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full px-3 py-1 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-white" />
                  <span className="text-white font-bold text-sm">-{product.discount}%</span>
                </div>

                {/* Product Image */}
                <div className="aspect-square w-full bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                  <img
                    src={product.productImageUrls[0]}
                    alt={product.productName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-pink-400 transition-colors">
                    {product.productName}
                  </h3>

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

                  {/* CTA */}
                  <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>View Deal</span>
                  </button>
                </div>
              </Link>
            );
          })}
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
