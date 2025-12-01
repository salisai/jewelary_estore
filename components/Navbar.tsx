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
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" className="text-2xl font-serif font-semibold tracking-tight">
            Lumière
          </Link>

          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-gray-600">
            <Link href="/shop" className="hover:text-black transition-colors">SHOP ALL</Link>
            <Link href="/shop?cat=Rings" className="hover:text-black transition-colors">RINGS</Link>
            <Link href="/shop?cat=Necklaces" className="hover:text-black transition-colors">NECKLACES</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
             <button 
              onClick={() => setIsAiOpen(true)}
              className="hidden md:flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
            >
              <Sparkles size={16} />
              <span className="hidden lg:inline">AI Stylist</span>
            </button>

            {user ? (
              <div className="relative group">
                <button className="hover:text-black text-gray-600">
                  <User size={22} />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {user.isAdmin && (
                    <Link href="/admin" className="block px-4 py-2 text-sm hover:bg-gray-50">Admin Dashboard</Link>
                  )}
                  <button
                    onClick={async () => {
                      await logout();
                      router.push("/");
                    }}
                    className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-50 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth" className="hover:text-black text-gray-600">
                <User size={22} />
              </Link>
            )}

            <button onClick={toggleCart} className="relative hover:text-black text-gray-600">
              <ShoppingBag size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-6 flex flex-col gap-4 text-lg">
            <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop All</Link>
            <Link href="/shop?cat=Rings" onClick={() => setIsMobileMenuOpen(false)}>Rings</Link>
            <Link href="/shop?cat=Necklaces" onClick={() => setIsMobileMenuOpen(false)}>Necklaces</Link>
            <button onClick={() => { setIsMobileMenuOpen(false); setIsAiOpen(true); }} className="flex items-center gap-2 text-left">
              <Sparkles size={18} /> AI Stylist
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