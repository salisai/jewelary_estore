'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactMessage } from "@/lib/actions/messages";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
                <Image
                    src="/contact_hero.png"
                    alt="Lumière Atelier"
                    fill
                    className="object-cover brightness-95"
                    priority
                />
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-medium tracking-[0.2em] uppercase text-white mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-white/90 text-[13px] md:text-sm tracking-widest uppercase max-w-2xl mx-auto leading-relaxed">
                        We're here to assist you with bespoke requests and inquiries.
                    </p>
                </div>
            </section>

            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
                    {/* Contact Information */}
                    <div className="space-y-16">
                        <div className="space-y-6">
                            <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-400">Contact Us</h2>
                            <h3 className="text-3xl md:text-4xl font-light text-neutral-950">We'd love to hear from you.</h3>
                            <p className="text-neutral-500 text-[15px] font-light leading-relaxed max-w-md">
                                Whether you have a question about our collections, need styling advice, or are interested in a custom creation, our team is at your service.
                            </p>
                        </div>

                        <div className="space-y-10">
                            <div className="flex items-start gap-6">
                                <div className="w-10 h-10 border border-neutral-100 flex items-center justify-center rounded-full text-neutral-400">
                                    <Mail size={18} strokeWidth={1.2} />
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-medium uppercase tracking-wider text-neutral-900 mb-1">Email</h4>
                                    <p className="text-[15px] text-neutral-500 font-light">concierge@lumiere.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-10 h-10 border border-neutral-100 flex items-center justify-center rounded-full text-neutral-400">
                                    <Phone size={18} strokeWidth={1.2} />
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-medium uppercase tracking-wider text-neutral-900 mb-1">Phone</h4>
                                    <p className="text-[15px] text-neutral-500 font-light">+1 (234) 567-8910</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-10 h-10 border border-neutral-100 flex items-center justify-center rounded-full text-neutral-400">
                                    <MapPin size={18} strokeWidth={1.2} />
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-medium uppercase tracking-wider text-neutral-900 mb-1">Our Atelier</h4>
                                    <p className="text-[15px] text-neutral-500 font-light">
                                        123 Minimalist Avenue, Suite 456<br />
                                        New York, NY 10001
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-neutral-50 p-10 md:p-16 relative">
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
                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium uppercase tracking-widest text-neutral-400 px-1">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Jane Doe"
                                        className="w-full bg-transparent border-b border-neutral-200 py-3 px-1 text-[15px] focus:outline-none focus:border-neutral-950 transition-colors placeholder:text-neutral-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium uppercase tracking-widest text-neutral-400 px-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="jane@example.com"
                                        className="w-full bg-transparent border-b border-neutral-200 py-3 px-1 text-[15px] focus:outline-none focus:border-neutral-950 transition-colors placeholder:text-neutral-300"
                                    />
                                </div>

                                <div className="space-y-2">
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
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium uppercase tracking-widest text-neutral-400 px-1">Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        placeholder="Tell us about your inquiry..."
                                        className="w-full bg-transparent border-b border-neutral-200 py-3 px-1 text-[15px] focus:outline-none focus:border-neutral-950 transition-colors resize-none placeholder:text-neutral-300"
                                    />
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 text-red-500 text-[12px] font-light">
                                        <AlertCircle size={14} />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <button
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
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
