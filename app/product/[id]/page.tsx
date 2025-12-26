'use client';

import { useParams } from "next/navigation";
import Image from "next/image";
import { Check, Truck, ShieldCheck } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import Link from 'next/link';

const ProductDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  const product = products.find((p) => p.id === params?.id);

  if (!product) {
    return <div className="text-center py-40 text-neutral-500">Product not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

        {/* Product Image */}
        <div className="w-full lg:w-3/5">
          <div className="aspect-[3/4] bg-neutral-50 relative overflow-hidden">
            <Image
              src={product.image as string}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center pt-8 lg:pt-0">
          <nav className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-neutral-400 mb-8">
            <Link href="/shop" className="hover:text-neutral-950 transition-colors">Shop</Link>
            <span>/</span>
            <Link href={`/shop?cat=${product.category}`} className="hover:text-neutral-950 transition-colors">{product.category}</Link>
          </nav>

          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-neutral-950 mb-6 leading-tight">
            {product.name}
          </h1>
          <p className="text-2xl font-medium tracking-tight text-neutral-950 mb-10">
            ${product.price}
          </p>

          <div className="space-y-6 mb-12">
            <p className="text-[14px] leading-relaxed text-neutral-600 font-light">
              {product.description}
            </p>
            <p className="text-[14px] leading-relaxed text-neutral-600 font-light">
              Handcrafted with attention to detail, this piece embodies timeless elegance and modern sophistication. Perfect for any occasion.
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-neutral-950 text-white py-4 text-[13px] font-medium tracking-widest uppercase hover:bg-neutral-800 transition-colors mb-12"
          >
            Add to Bag
          </button>

          <div className="border-t border-neutral-100 pt-8 space-y-4">
            <div className="flex items-center gap-4 text-[13px] text-neutral-600">
              <Truck size={16} strokeWidth={1.5} />
              <span>Free worldwide shipping</span>
            </div>
            <div className="flex items-center gap-4 text-[13px] text-neutral-600">
              <ShieldCheck size={16} strokeWidth={1.5} />
              <span>2-year warranty included</span>
            </div>
            <div className="flex items-center gap-4 text-[13px] text-neutral-600">
              <Check size={16} strokeWidth={1.5} />
              <span>Ethically sourced materials</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

