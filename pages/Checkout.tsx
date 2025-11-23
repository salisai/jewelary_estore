import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Lock } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, placeOrder, user } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Your cart is empty.</p>
        <button onClick={() => navigate('/shop')} className="text-black underline">Back to Shop</button>
      </div>
    );
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to checkout");
      navigate('/auth');
      return;
    }
    setLoading(true);
    // Simulate Stripe processing
    setTimeout(() => {
      placeOrder();
      setLoading(false);
      navigate('/success');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif mb-10">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          <form onSubmit={handlePayment} className="space-y-8">
            <section>
              <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" required className="border border-gray-300 p-3 w-full" />
                <input type="text" placeholder="Last Name" required className="border border-gray-300 p-3 w-full" />
                <input type="text" placeholder="Address" required className="col-span-2 border border-gray-300 p-3 w-full" />
                <input type="text" placeholder="City" required className="border border-gray-300 p-3 w-full" />
                <input type="text" placeholder="Zip Code" required className="border border-gray-300 p-3 w-full" />
              </div>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                Payment Method <Lock size={14} className="text-green-600" />
              </h2>
              <div className="bg-gray-50 p-6 rounded-sm border border-gray-200 space-y-4">
                <input 
                  type="text" 
                  placeholder="Card Number (4242 4242 4242 4242)" 
                  required 
                  pattern="\d{4}\s?\d{4}\s?\d{4}\s?\d{4}"
                  className="border border-gray-300 p-3 w-full bg-white" 
                />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM / YY" required className="border border-gray-300 p-3 w-full bg-white" />
                  <input type="text" placeholder="CVC" required className="border border-gray-300 p-3 w-full bg-white" />
                </div>
              </div>
            </section>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white py-4 font-medium uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-8 h-fit">
          <h2 className="text-lg font-medium mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover bg-white" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-lg font-medium pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;