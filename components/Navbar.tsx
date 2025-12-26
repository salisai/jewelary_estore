'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, User, Sparkles, Menu, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import CartDrawer from "./CartDrawer";
import AiStylist from "./AiStylist";

const Navbar = () => {
  const { cart, toggleCart, user, logout } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-40 border-b border-neutral-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Mobile Menu Button */}
          <button className="md:hidden text-neutral-950" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>

          {/* Logo */}
          <Link href="/" className="text-lg md:text-xl font-medium tracking-[0.1em] uppercase text-neutral-950">
            Lumière
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="/shop" className="text-[13px] tracking-widest uppercase text-neutral-500 hover:text-neutral-950 transition-colors">
              Shop All
            </Link>
            <Link href="/shop?cat=Rings" className="text-[13px] tracking-widest uppercase text-neutral-500 hover:text-neutral-950 transition-colors">
              Rings
            </Link>
            <Link href="/shop?cat=Necklaces" className="text-[13px] tracking-widest uppercase text-neutral-500 hover:text-neutral-950 transition-colors">
              Necklaces
            </Link>
            <Link href="/about" className="text-[13px] tracking-widest uppercase text-neutral-500 hover:text-neutral-950 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-[13px] tracking-widest uppercase text-neutral-500 hover:text-neutral-950 transition-colors">
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6 md:gap-8">
            <button
              onClick={() => setIsAiOpen(true)}
              className="hidden md:flex items-center gap-2 text-[13px] tracking-wider uppercase text-neutral-500 hover:text-neutral-950 transition-colors"
            >
              <Sparkles size={16} strokeWidth={1.5} />
              <span className="hidden lg:inline">Stylist</span>
            </button>

            {user ? (
              <div className="relative group">
                <button className="text-neutral-950 hover:text-neutral-600 transition-colors">
                  <User size={20} strokeWidth={1.5} />
                </button>
                <div className="absolute right-0 top-full mt-4 w-48 bg-white border border-neutral-100 shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {user.isAdmin && (
                    <Link href="/admin" className="block px-6 py-2 text-[13px] text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 tracking-wide">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={async () => {
                      await logout();
                      router.push("/");
                    }}
                    className="w-full text-left block px-6 py-2 text-[13px] text-red-500 hover:bg-neutral-50 tracking-wide"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth" className="text-neutral-950 hover:text-neutral-600 transition-colors">
                <User size={20} strokeWidth={1.5} />
              </Link>
            )}

            <button onClick={toggleCart} className="relative text-neutral-950 hover:text-neutral-600 transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-neutral-950 text-white text-[9px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-neutral-100 min-h-screen p-8 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-300">
            <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-light tracking-wide text-neutral-950">
              Shop All
            </Link>
            <Link href="/shop?cat=Rings" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-light tracking-wide text-neutral-950">
              Rings
            </Link>
            <Link href="/shop?cat=Necklaces" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-light tracking-wide text-neutral-950">
              Necklaces
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-light tracking-wide text-neutral-950">
              About
            </Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-light tracking-wide text-neutral-950">
              Contact
            </Link>
            <button onClick={() => { setIsMobileMenuOpen(false); setIsAiOpen(true); }} className="flex items-center gap-2 text-left text-lg font-light tracking-wide text-neutral-950 pt-4 border-t border-neutral-100">
              <Sparkles size={20} /> AI Stylist
            </button>
          </div>
        )}
      </nav>

      <CartDrawer />
      <AiStylist isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

      <div className="h-20" />
    </>
  );
};

export default Navbar;