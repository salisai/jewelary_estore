'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/types';

interface ProductCardProps {
    product: Product;
    index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1,
            }}
            className="group block"
        >
            <Link href={`/product/${product.id}`}>
                <div className="aspect-[3/4] relative overflow-hidden bg-neutral-50">
                    <Image
                        src={product.image as string}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {product.stock < 5 && (
                        <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-wider px-2 py-1 font-medium">
                            Low Stock
                        </span>
                    )}
                </div>

                <div className="mt-4 flex flex-col gap-1">
                    <h3 className="text-base font-medium tracking-tight text-neutral-950 group-hover:text-neutral-600 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-[13px] text-neutral-600">
                        {product.category}
                    </p>
                    <p className="text-sm font-medium tracking-tight text-neutral-950 mt-1">
                        ${product.price}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
