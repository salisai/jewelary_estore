'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { submitContactMessage } from "@/lib/actions/messages";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string,
        };

        const result = await submitContactMessage(data);

        if (result.success) {
            setIsSuccess(true);
            (e.target as HTMLFormElement).reset();
        } else {
            setError(result.error || "Something went wrong. Please try again.");
        }
        setIsSubmitting(false);
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/contact.jpg"
                        alt="Lumière Atelier"
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
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-white/90 text-[13px] md:text-sm tracking-widest uppercase max-w-2xl mx-auto leading-relaxed"
                    >
                        We're here to assist you with bespoke requests and inquiries.
                    </motion.p>
                </div>
            </section>

            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
                    {/* Contact Information */}
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="space-y-16"
                    >
                        <motion.div variants={fadeIn} className="space-y-6">
                            <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-400">Contact Us</h2>
                            <h3 className="text-3xl md:text-4xl font-light text-neutral-950">We'd love to hear from you.</h3>
                            <p className="text-neutral-500 text-[15px] font-light leading-relaxed max-w-md">
                                Whether you have a question about our collections, need styling advice, or are interested in a custom creation, our team is at your service.
                            </p>
                        </motion.div>

                        <div className="space-y-10">
                            {[
                                { icon: Mail, label: "Email", value: "concierge@lumiere.com" },
                                { icon: Phone, label: "Phone", value: "+1 (234) 567-8910" },
                                { icon: MapPin, label: "Our Atelier", value: "123 Minimalist Avenue, Suite 456\nNew York, NY 10001", isMultiLine: true }
                            ].map((item, idx) => (
                                <motion.div key={idx} variants={fadeIn} className="flex items-start gap-6">
                                    <div className="w-10 h-10 border border-neutral-100 flex items-center justify-center rounded-full text-neutral-400">
                                        <item.icon size={18} strokeWidth={1.2} />
                                    </div>
                                    <div>
                                        <h4 className="text-[12px] font-medium uppercase tracking-wider text-neutral-900 mb-1">{item.label}</h4>
                                        <p className="text-[15px] text-neutral-500 font-light whitespace-pre-line">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-neutral-50 p-10 md:p-16 relative"
                    >
                        {isSuccess ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                                <div className="w-16 h-16 bg-white flex items-center justify-center rounded-full text-neutral-950 shadow-sm">
                                    <CheckCircle2 size={32} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-light text-neutral-950">Message Received</h3>
                                    <p className="text-neutral-500 text-sm font-light">Thank you for reaching out. We will respond shortly.</p>
                                </div>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="text-[11px] font-medium uppercase tracking-widest text-neutral-400 hover:text-neutral-950 transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-8" onSubmit={handleSubmit}>
                                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
                                    {[
                                        { label: "Your Name", name: "name", type: "text", placeholder: "Jane Doe" },
                                        { label: "Email Address", name: "email", type: "email", placeholder: "jane@example.com" }
                                    ].map((field, idx) => (
                                        <motion.div key={idx} variants={fadeIn} className="space-y-2">
                                            <label className="text-[11px] font-medium uppercase tracking-widest text-neutral-400 px-1">{field.label}</label>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                required
                                                placeholder={field.placeholder}
                                                className="w-full bg-transparent border-b border-neutral-200 py-3 px-1 text-[15px] focus:outline-none focus:border-neutral-950 transition-colors placeholder:text-neutral-300"
                                            />
                                        </motion.div>
                                    ))}

                                    <motion.div variants={fadeIn} className="space-y-2">
                                        <label className="text-[11px] font-medium uppercase tracking-widest text-neutral-400 px-1">Subject</label>
                                        <select
                                            name="subject"
                                            required
                                            className="w-full bg-transparent border-b border-neutral-200 py-3 px-1 text-[15px] focus:outline-none focus:border-neutral-950 transition-colors appearance-none"
                                        >
                                            <option value="general">General Inquiry</option>
                                            <option value="bespoke">Bespoke Commission</option>
                                            <option value="order">Order Support</option>
                                            <option value="press">Press & PR</option>
                                        </select>
                                    </motion.div>

                                    <motion.div variants={fadeIn} className="space-y-2">
                                        <label className="text-[11px] font-medium uppercase tracking-widest text-neutral-400 px-1">Message</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows={4}
                                            placeholder="Tell us about your inquiry..."
                                            className="w-full bg-transparent border-b border-neutral-200 py-3 px-1 text-[15px] focus:outline-none focus:border-neutral-950 transition-colors resize-none placeholder:text-neutral-300"
                                        />
                                    </motion.div>
                                </motion.div>

                                {error && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-500 text-[12px] font-light">
                                        <AlertCircle size={14} />
                                        <span>{error}</span>
                                    </motion.div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    disabled={isSubmitting}
                                    className="w-full bg-neutral-950 text-white text-[11px] font-medium uppercase tracking-[0.2em] py-5 hover:bg-neutral-800 transition-colors mt-4 flex items-center justify-center gap-3 disabled:bg-neutral-400"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        "Send Message"
                                    )}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

