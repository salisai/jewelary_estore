'use client';

import { useStore } from "@/context/StoreContext";
import { X, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const CartDrawer = () => {
  const { isCartOpen, toggleCart, cart, updateQuantity, removeFromCart } = useStore();
  const router = useRouter();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-xl font-serif">Your Bag ({cart.length})</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p>Your bag is empty.</p>
              <button 
                onClick={toggleCart} 
                className="mt-4 text-black underline hover:text-gray-600"
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
                <div key={item.id} className="flex gap-4">
                  <img src={imageSrc} alt={item.name} className="w-20 h-20 object-cover bg-gray-50" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="font-medium">${item.price}</p>
                    </div>
                    <p className="text-sm text-gray-500 capitalize">{item.category}</p>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-50">
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-50">
                          <Plus size={14} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-gray-400 hover:text-black underline">
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
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-lg">${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
            <button
              onClick={() => {
                toggleCart();
                router.push("/checkout");
              }}
              className="w-full bg-black text-white py-4 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors uppercase"
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