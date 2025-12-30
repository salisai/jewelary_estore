'use client';

import { useStore } from "@/context/StoreContext";
import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const CartDrawer = () => {
  const { isCartOpen, toggleCart, cart, updateQuantity, removeFromCart } = useStore();
  const router = useRouter();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/30 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div className="z-60 relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-[0.22,1,0.36,1]">
        <div className="p-8 flex items-center justify-between border-b border-neutral-100">
          <h2 className="text-lg md:hidden font-medium tracking-wide text-neutral-950 uppercase">Your Bag ({cart.length})</h2>
          <button onClick={toggleCart} className="text-neutral-500 hover:text-neutral-950 transition-colors">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {cart.length === 0 ? (
            <div className="text-center text-neutral-400 mt-20">
              <p className="text-[13px] tracking-wide">Your bag is currently empty.</p>
              <button
                onClick={toggleCart}
                className="mt-6 text-[13px] text-neutral-950 border-b border-neutral-950 pb-1 hover:text-neutral-600 hover:border-neutral-600 transition-colors uppercase tracking-widest"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const imageSrc =
                typeof item.image === "string"
                  ? item.image
                  : "https://dummyimage.com/80x80/efefef/000000.png&text=+";
              return (
                <div key={item.id} className="flex gap-6">
                  <div className="w-20 h-24 bg-neutral-50 relative shrink-0">
                    <Image src={imageSrc} alt={item.name} width={80} height={96} className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-[13px] font-medium text-neutral-950 leading-relaxed">{item.name}</h3>
                        <p className="text-[13px] font-medium text-neutral-950">${item.price}</p>
                      </div>
                      <p className="text-[11px] text-neutral-500 uppercase tracking-wider mt-1">{item.category}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-neutral-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-neutral-50 text-neutral-500 hover:text-neutral-950 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 text-[11px] font-medium min-w-[20px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-neutral-50 text-neutral-500 hover:text-neutral-950 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-[11px] text-neutral-400 hover:text-neutral-950 underline transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 border-t border-neutral-100 bg-white">
            <div className="flex justify-between mb-2">
              <span className="text-[13px] text-neutral-600">Subtotal</span>
              <span className="text-[13px] font-medium text-neutral-950">${total.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-neutral-400 mb-6">Shipping and taxes calculated at checkout.</p>
            <button
              onClick={() => {
                toggleCart();
                router.push("/checkout");
              }}
              className="w-full bg-neutral-950 text-white py-4 text-[13px] font-medium tracking-widest hover:bg-neutral-800 transition-colors uppercase"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;