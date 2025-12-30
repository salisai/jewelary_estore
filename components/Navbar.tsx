'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Sparkles, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import CartDrawer from "./CartDrawer";
import AiStylist from "./AiStylist";
import { UrlObject } from "url";

const Navbar = () => {
  const { cart, toggleCart, user, logout } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks: { name: string; href: string | UrlObject }[] = [
    { name: "All", href: "/shop" },
    { name: "Rings", href: { pathname: "/shop", query: { cat: "Rings" } } },
    { name: "Necklaces", href: { pathname: "/shop", query: { cat: "Necklaces" } } },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];




  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 px-6 md:px-12 h-20 flex items-center ${scrolled || isMobileMenuOpen ? "bg-white/95 backdrop-blur-xl border-b border-black/5" : "bg-white/80"
          }`}
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-3 items-center">

          {/* Left: Logo */}
          <div className="flex justify-start">
            <Link href="/" className="text-xl font-medium tracking-[0.2em] uppercase text-neutral-950">
              Lumière
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] tracking-[0.5em] uppercase text-neutral-500 hover:text-neutral-950 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Icons & Actions */}
          <div className="flex items-center justify-end gap-4 md:gap-8">
            {/* Admin Dashboard - Only for admins */}
            {user?.isAdmin && (
              <Link
                href="/admin"
                className="hidden md:block text-[11px] tracking-[0.3em] uppercase text-neutral-950 hover:opacity-70 transition-opacity font-bold"
              >
                Dashboard
              </Link>
            )}

            {/* AI Stylist - Visible on mobile and desktop */}
            <button
              onClick={() => setIsAiOpen(true)}
              className="flex items-center gap-2 text-neutral-500 hover:text-neutral-950 transition-colors"
            >
              <Sparkles size={18} strokeWidth={1.5} />
              <span className="hidden lg:inline text-[11px] tracking-[0.3em] uppercase font-medium">Stylist</span>
            </button>

            {/* Cart Icon */}
            <button onClick={toggleCart} className="relative text-neutral-950 hover:text-neutral-600 transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-neutral-950 text-white text-[9px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 items-end group z-[70] text-neutral-950"
              aria-label="Toggle Menu"
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-6 h-[1px] bg-current transition-transform duration-500"
              />
              <motion.div
                animate={isMobileMenuOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                className="w-4 h-[1px] bg-current transition-all duration-500"
              />
              <motion.div
                animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-6 h-[1px] bg-current transition-transform duration-500"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[55] bg-white flex flex-col justify-center px-10"
          >
            {/* Background branding */}
            <div className="absolute inset-0 opacity-[0.02] select-none pointer-events-none flex items-center justify-center overflow-hidden">
              <span className="text-[30vw] font-bold uppercase tracking-tighter text-neutral-950 whitespace-nowrap">
                LUMIÈRE
              </span>
            </div>

            <div className="relative z-10 flex flex-col gap-8">
              {navLinks.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1, duration: 0.8 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-light tracking-[0.2em] uppercase hover:text-neutral-500 transition-colors duration-500"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {user?.isAdmin && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl font-bold tracking-[0.3em] uppercase text-neutral-950 mt-4 block"
                  >
                    Admin Dashboard
                  </Link>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-12 flex flex-col gap-6"
              >
                <div className="w-12 h-[1px] bg-neutral-200" />
                <div className="flex gap-8">
                  {["Instagram", "Facebook", "Pinterest"].map((social) => (
                    <Link key={social} href="#" className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 hover:text-neutral-950 transition-colors font-bold">
                      {social}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
      <AiStylist isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

      <div className="h-20" />
    </>
  );
};

export default Navbar;