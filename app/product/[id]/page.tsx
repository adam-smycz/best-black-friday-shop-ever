import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.productId,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productsData.find((p) => p.productId === id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
