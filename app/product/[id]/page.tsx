import { notFound } from "next/navigation";
import { Metadata } from "next";
import productsData from "@/data/products.json";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.productId,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = productsData.find((p) => p.productId === id);

  if (!product) {
    return {};
  }

  const discountedPrice = product.unitPrice * (1 - product.discount / 100);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001/best-black-friday-shop-ever";

  return {
    title: `${product.productName} - ${product.discount}% OFF | Best Black Friday Shop`,
    description: product.productDescription,
    keywords: [
      product.productName,
      product.productCategory,
      product.virtualCategory,
      "Black Friday",
      "discount",
      "sale",
    ],
    openGraph: {
      title: product.productName,
      description: product.productDescription,
      images: product.productImageUrls,
      type: "website",
      siteName: "Best Black Friday Shop Ever",
    },
    twitter: {
      card: "summary_large_image",
      title: product.productName,
      description: product.productDescription,
      images: product.productImageUrls,
    },
    other: {
      // Custom meta tags for product data
      "product:price:amount": discountedPrice.toString(),
      "product:price:currency": product.currency,
      "product:availability": product.actionState,
      "product:category": product.productCategory,
      "product:brand": "Best Black Friday Shop",
      "product:condition": "new",
      "product:retailer_item_id": product.productId,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productsData.find((p) => p.productId === id);

  if (!product) {
    notFound();
  }

  const discountedPrice = product.unitPrice * (1 - product.discount / 100);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001/best-black-friday-shop-ever";

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.productName,
    description: product.productDescription,
    image: product.productImageUrls,
    sku: product.productId,
    brand: {
      "@type": "Brand",
      name: "Best Black Friday Shop",
    },
    category: product.productCategory,
    offers: {
      "@type": "Offer",
      url: `${baseUrl}${product.productUrls}`,
      priceCurrency: product.currency,
      price: discountedPrice.toFixed(2),
      priceValidUntil: "2024-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Best Black Friday Shop Ever",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0.00",
          currency: product.currency,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data in head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ProductDetail product={product} />
    </>
  );
}
