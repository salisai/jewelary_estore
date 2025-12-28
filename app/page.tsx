'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

const HomePage = () => {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 9);

  return (
    <div className="overflow-x-hidden">

      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-[90vh] w-full bg-neutral-50 flex flex-col items-center pt-24 pb-20 px-4">

        {/* Typography */}
        <div className="text-center z-10 max-w-4xl mx-auto mb-16 relative">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-serif text-4xl md:text-6xl text-neutral-950 italic">
              LUXURIOUS <span className="font-light not-italic font-sans text-2xl md:text-3xl tracking-widest mx-2">and</span>
            </span>
            <span className="font-sans text-4xl md:text-6xl font-normal tracking-tight text-neutral-950 uppercase selection:bg-neutral-200">
              Contemporary Jewelry
            </span>
            <span className="font-serif text-2xl md:text-4xl text-neutral-500 italic mt-2">
              — for EVERY WOMAN
            </span>
          </motion.h1>
        </div>

        {/* Staggered Image Grid */}
        <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start h-full">

          {/* Left Image (Tall) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-3 md:mt-20"
          >
            <div className="aspect-[3/4] relative overflow-hidden bg-neutral-200">
              <Image
                src="/ring2.jpg"
                alt="Necklace Detail"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
          </motion.div>

          {/* Center Image (Large/Main) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-6 relative z-10"
          >
            <div className="aspect-[4/5] relative overflow-hidden shadow-2xl shadow-neutral-200/50">
              <Image
                src='/ring.jpg'
                alt="Gold Chains"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
          </motion.div>

          {/* Right Image (Offset) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-3 md:mt-40"
          >
            <div className="aspect-[3/4] relative overflow-hidden bg-neutral-200">
              <Image
                src="/rings.jpg"
                alt="Earrings"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-500 mb-2 block">New Arrivals</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-950">Latest Curations</h2>
          </div>
          <Link href="/shop" className="text-[13px] font-medium tracking-wide border-b border-neutral-300 pb-1 hover:border-neutral-950 transition-colors uppercase">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* Craftsmanship Section - Split Animation */}
      <section className="py-24 md:py-32 bg-neutral-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image - Slide from Left */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1 relative aspect-[4/5] md:aspect-auto md:h-[700px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=80"
              alt="Craftsmanship"
              fill
              className="object-cover grayscale contrast-[0.9]"
            />
          </motion.div>

          {/* Content - Slide from Right */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 md:order-2"
          >
            <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-500 mb-4 block">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-neutral-950 mb-8 leading-tight">
              Conscious <br /> Craftsmanship
            </h2>
            <p className="text-neutral-600 mb-8 leading-loose font-light text-[15px] max-w-md">
              We believe luxury shouldn't cost the earth. Every piece is crafted using 100% recycled metals and ethically sourced stones.
              Our design philosophy centers on longevity—creating pieces you will cherish for a lifetime.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-[13px] font-medium tracking-widest uppercase border-b border-neutral-950 pb-1 hover:text-neutral-600 hover:border-neutral-600 transition-colors">
              Read Our Story <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

