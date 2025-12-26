'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";
import { useStore } from "@/context/StoreContext";
import { ProductCategory, type Product } from "@/types";
import ProductCard from "@/components/ProductCard";

const ShopContent = () => {
  const { products } = useStore();
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const categoryFilter = searchParams.get("cat");

  useEffect(() => {
    if (categoryFilter) {
      setFilteredProducts(products.filter((p) => p.category === categoryFilter));
    } else {
      setFilteredProducts(products);
    }
  }, [categoryFilter, products]);

  const categories = useMemo(() => Object.values(ProductCategory), []);

  return (
    <>
      {/* Header & Filters */}
      <div className="flex flex-col items-center mb-20 space-y-8">
        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-neutral-950">
          {categoryFilter || "All Collection"}
        </h1>

        <div className="flex flex-wrap justify-center gap-8 text-[13px] tracking-widest uppercase">
          <Link
            href="/shop"
            className={`${!categoryFilter ? "text-neutral-950 border-b border-neutral-950 pb-1" : "text-neutral-400 hover:text-neutral-950 transition-colors"}`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/shop?cat=${cat}`}
              className={`${categoryFilter === cat ? "text-neutral-950 border-b border-neutral-950 pb-1" : "text-neutral-400 hover:text-neutral-950 transition-colors"}`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-32 text-neutral-400 font-light">
          No pieces found in this category.
        </div>
      )}
    </>
  );
};

const ShopPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 min-h-screen">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400 text-[13px] uppercase tracking-widest">Loading Collection...</div>}>
        <ShopContent />
      </Suspense>
    </div>
  );
};

export default ShopPage;
