'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/context/StoreContext";
import { ProductCategory, type Product } from "@/types";

const ShopPage = () => {
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
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
        <h1 className="text-4xl font-serif">{categoryFilter || "All Jewelry"}</h1>

        <div className="flex gap-6 text-sm mt-4 md:mt-0 overflow-x-auto pb-2">
          <Link
            href="/shop"
            className={`whitespace-nowrap ${!categoryFilter ? "text-black font-medium border-b border-black" : "text-gray-500 hover:text-black"}`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/shop?cat=${cat}`}
              className={`whitespace-nowrap ${categoryFilter === cat ? "text-black font-medium border-b border-black" : "text-gray-500 hover:text-black"}`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group block">
            <div className="aspect-[4/5] overflow-hidden bg-gray-50 mb-4 relative">
              <img
                src={product.image as string}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {product.stock < 5 && (
                <span className="absolute top-2 right-2 bg-white/80 backdrop-blur text-xs px-2 py-1 uppercase tracking-wider">
                  Low Stock
                </span>
              )}
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif text-lg leading-none mb-1 group-hover:text-gray-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
              </div>
              <span className="text-sm font-medium">${product.price}</span>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500">No products found in this category.</div>
      )}
    </div>
  );
};

export default ShopPage;

