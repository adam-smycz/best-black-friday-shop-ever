import productsData from "@/data/products.json";
import { notFound } from "next/navigation";
import CategoryClient from "./CategoryClient";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all categories
export function generateStaticParams() {
  // Get unique categories
  const categories = [...new Set(productsData.map(product => product.productCategory))];

  return categories.map((category) => ({
    slug: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  // Decode slug and normalize category name - convert dashes back to spaces
  const categorySlug = decodeURIComponent(slug).replace(/-/g, ' ');

  // Filter products by category
  const categoryProducts = productsData.filter(
    (product) => product.productCategory.toLowerCase() === categorySlug.toLowerCase()
  );

  // If no products found, show 404
  if (categoryProducts.length === 0) {
    notFound();
  }

  // Get the actual category name from the first product
  const categoryName = categoryProducts[0].productCategory;

  // Calculate category stats
  const maxDiscount = Math.max(...categoryProducts.map(p => p.discount));
  const avgDiscount = Math.round(
    categoryProducts.reduce((sum, p) => sum + p.discount, 0) / categoryProducts.length
  );

  return (
    <CategoryClient
      categoryName={categoryName}
      categoryProducts={categoryProducts}
      maxDiscount={maxDiscount}
      avgDiscount={avgDiscount}
    />
  );
}
