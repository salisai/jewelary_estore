import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/about_hero.png"
                    alt="Lumière Craftsmanship"
                    fill
                    className="object-cover brightness-95"
                    priority
                />
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-medium tracking-[0.2em] uppercase text-white mb-6">
                        The Art of Elegance
                    </h1>
                    <p className="text-white/90 text-[13px] md:text-sm tracking-widest uppercase max-w-2xl mx-auto leading-relaxed">
                        Defining modern luxury through minimalist design and ethical craftsmanship.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div className="space-y-8">
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
                    </div>
                    <div className="relative aspect-[4/5] bg-neutral-50 overflow-hidden">
                        <Image
                            src="/rings.jpg"
                            alt="Lumière Collection"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Craftsmanship & Ethics */}
            <section className="bg-neutral-50 py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
                        <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-400">Our Philosophy</h2>
                        <h3 className="text-3xl md:text-4xl font-light text-neutral-950">Conscious Creation</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div className="space-y-6">
                            <h4 className="text-[13px] font-medium uppercase tracking-widest text-neutral-900">Ethically Sourced</h4>
                            <p className="text-[14px] leading-relaxed text-neutral-500 font-light">
                                We trace every stone and every gram of gold back to its origin. Our commitment to ethical sourcing ensures that your jewelry carries a legacy of kindness.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-[13px] font-medium uppercase tracking-widest text-neutral-900">Master Craftsmanship</h4>
                            <p className="text-[14px] leading-relaxed text-neutral-500 font-light">
                                Our artisans combine traditional techniques with modern precision. Every weld, polish, and setting is executed with obsessive attention to detail.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-[13px] font-medium uppercase tracking-widest text-neutral-900">Timeless Design</h4>
                            <p className="text-[14px] leading-relaxed text-neutral-500 font-light">
                                We design for longevity. Our pieces are not subject to trends, but are crafted to be cherished for a lifetime and passed down through generations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-40 px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-12">
                    <blockquote className="text-2xl md:text-4xl font-serif italic text-neutral-900 leading-relaxed">
                        "Jewelry is more than an adornment; it is a reflection of the light within."
                    </blockquote>
                    <div className="w-12 h-[1px] bg-neutral-300 mx-auto" />
                    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-400">Maya Chen, Founder</p>
                </div>
            </section>
        </div>
    );
}
