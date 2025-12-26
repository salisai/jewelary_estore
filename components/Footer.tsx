const Footer = () => {
  return (
    <footer className="bg-white border-t border-neutral-100 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        <div className="space-y-4">
          <div className="text-lg font-medium tracking-widest uppercase text-neutral-950">Lumière</div>
          <p className="text-[13px] leading-relaxed text-neutral-500 max-w-xs mb-4">
            Handcrafted luxury jewelry for everyday elegance.
            Ethically sourced and meticulously designed.
          </p>
          <a href="/about" className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-950 transition-colors">Our Story</a>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] font-medium uppercase tracking-widest text-neutral-950 mb-2">Shop</h4>
          <a href="/shop" className="text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors">All Jewelry</a>
          <a href="/shop?cat=Rings" className="text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors">Rings</a>
          <a href="/shop?cat=Necklaces" className="text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors">Necklaces</a>
          <a href="/shop?cat=Earrings" className="text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors">Earrings</a>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] font-medium uppercase tracking-widest text-neutral-950 mb-2">Service</h4>
          <a href="#" className="text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors">Shipping & Returns</a>
          <a href="#" className="text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors">Size Guide</a>
          <a href="#" className="text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors">Care Instructions</a>
          <a href="/contact" className="text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors">Contact Us</a>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] font-medium uppercase tracking-widest text-neutral-950 mb-2">Legal</h4>
          <a href="#" className="text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors">Privacy Policy</a>
          <a href="#" className="text-[13px] text-neutral-500 hover:text-neutral-950 transition-colors">Terms of Service</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-50 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[11px] text-neutral-400">© {new Date().getFullYear()} Lumière Jewelry. All rights reserved.</div>
        <div className="flex gap-6">
          {/* Socials could go here */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

