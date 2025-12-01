'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const HomePage = () => {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-[80vh] w-full bg-gray-50 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=2000&q=80"
            alt="Minimalist Jewelry"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight text-gray-900">
              Timeless <br /> Elegance.
            </h1>
            <p className="text-lg md:text-xl text-gray-800 mb-8 font-light">
              Discover our collection of ethically crafted, minimalist jewelry designed for everyday luxury.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-sm font-medium tracking-widest hover:bg-gray-800 transition-all uppercase"
            >
              Shop Collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-serif">New Arrivals</h2>
          <Link href="/shop" className="text-sm underline hover:text-gray-600">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-4">
                <img
                  src={product.image as string}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-serif mb-1 group-hover:underline decoration-1 underline-offset-4">
                {product.name}
              </h3>
              <p className="text-gray-500">${product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=80"
              alt="Craftsmanship"
              className="w-full h-[600px] object-cover grayscale opacity-80"
            />
          </div>
          <div>
            <h2 className="text-4xl font-serif mb-6">Conscious Craftsmanship</h2>
            <p className="text-gray-400 mb-8 leading-relaxed font-light text-lg">
              We believe luxury shouldn't cost the earth. Every piece is crafted using 100% recycled metals and ethically sourced stones.
              Our design philosophy centers on longevity—creating pieces you will cherish for a lifetime.
            </p>
            <a href="#" className="text-white border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors">
              Read Our Story
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

