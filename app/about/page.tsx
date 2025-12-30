'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutPage() {
    /* tailwind-ignore */
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const }
    };

    /* tailwind-ignore */
    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/about.jpg"
                        alt="Lumière Craftsmanship"
                        fill
                        className="object-cover brightness-95"
                        priority
                    />
                </motion.div>
                <div className="relative z-10 text-center px-6">
                    <motion.h1
                        {...fadeIn}
                        className="text-4xl md:text-6xl font-medium tracking-[0.2em] uppercase text-white mb-6"
                    >
                        The Art of Elegance
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-white/90 text-[13px] md:text-sm tracking-widest uppercase max-w-2xl mx-auto leading-relaxed"
                    >
                        Defining modern luxury through minimalist design and ethical craftsmanship.
                    </motion.p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-8"
                    >
                        <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-400">Our Story</h2>
                        <h3 className="text-3xl md:text-4xl font-light leading-snug text-neutral-950">
                            Founded in 2020, Lumière was born from a desire to create jewelry that speaks through silence.
                        </h3>
                        <div className="space-y-6 text-[15px] leading-relaxed text-neutral-600 font-light">
                            <p>
                                We believe that true luxury isn't about excess—it's about the essential. Our journey began in a small atelier, where we set out to redefine what fine jewelry could be for the modern individual.
                            </p>
                            <p>
                                Each piece in our collection is a testament to the beauty of simplicity. We strip away the unnecessary to reveal the soul of the material, creating timeless designs that transition seamlessly from day to night, year to year.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative aspect-[4/5] bg-neutral-50 overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="/rings.jpg"
                            alt="Lumière Collection"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Craftsmanship & Ethics */}
            <section className="bg-neutral-50 py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto mb-24 space-y-4"
                    >
                        <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-400">Our Philosophy</h2>
                        <h3 className="text-3xl md:text-4xl font-light text-neutral-950">Conscious Creation</h3>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-16"
                    >
                        {[
                            { title: "Ethically Sourced", text: "We trace every stone and every gram of gold back to its origin. Our commitment to ethical sourcing ensures that your jewelry carries a legacy of kindness." },
                            { title: "Master Craftsmanship", text: "Our artisans combine traditional techniques with modern precision. Every weld, polish, and setting is executed with obsessive attention to detail." },
                            { title: "Timeless Design", text: "We design for longevity. Our pieces are not subject to trends, but are crafted to be cherished for a lifetime and passed down through generations." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeIn}
                                className="space-y-6"
                            >
                                <h4 className="text-[13px] font-medium uppercase tracking-widest text-neutral-900">{item.title}</h4>
                                <p className="text-[14px] leading-relaxed text-neutral-500 font-light">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-40 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="max-w-4xl mx-auto space-y-12"
                >
                    <blockquote className="text-2xl md:text-4xl font-serif italic text-neutral-900 leading-relaxed">
                        "Jewelry is more than an adornment; it is a reflection of the light within."
                    </blockquote>
                    <div className="w-12 h-[1px] bg-neutral-300 mx-auto" />
                    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-400">Maya Chen, Founder</p>
                </motion.div>
            </section>
        </div>
    );
}

