'use client';

import { useState } from "react";
import { X, Sparkles, Send } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import type { Product } from "@/types";

interface AiStylistProps {
  isOpen: boolean;
  onClose: () => void;
}

const AiStylist = ({ isOpen, onClose }: AiStylistProps) => {
  const { products, addToCart } = useStore();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ products: Product[]; reasoning: string } | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/ai-stylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      });

      if (!res.ok) {
        throw new Error("Unable to reach stylist");
      }

      const payload = await res.json();
      const matchedProducts = products.filter((p) => payload.recommendedIds?.includes(p.id));
      setResult({
        products: matchedProducts,
        reasoning: payload.reasoning
      });
    } catch (err) {
      console.error(err);
      setError("Our stylist is paused right now. Please try again soon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-600" />
            <h2 className="font-serif text-xl">Lumière AI Stylist</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full"><X size={20} /></button>
        </div>

        <div className="p-6 h-[500px] flex flex-col">
          {!result && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
              <Sparkles className="w-12 h-12 text-gray-300" />
              <p className="max-w-md">Tell us who you are shopping for, or what occasion you are celebrating. Our AI stylist will curate the perfect selection.</p>
              <div className="flex gap-2 text-xs">
                <span className="bg-gray-100 px-3 py-1 rounded-full">"Gift for anniversary"</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">"Minimalist silver rings"</span>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium tracking-wide animate-pulse">Curating selection...</p>
            </div>
          )}

          {error && (
            <p className="text-center text-sm text-red-500">{error}</p>
          )}

          {result && !error && (
            <div className="flex-1 overflow-y-auto">
              <div className="mb-6 p-4 bg-gray-50 rounded-sm">
                <p className="italic text-gray-700 leading-relaxed font-serif">"{result.reasoning}"</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.products.map(product => (
                  <div key={product.id} className="flex gap-4 p-3 border border-gray-100 hover:border-black transition-colors group">
                    <img src={product.image} alt={product.name} className="w-20 h-20 object-cover" />
                    <div className="flex flex-col justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <p className="text-gray-500 text-sm">${product.price}</p>
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="text-xs bg-black text-white px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {result.products.length === 0 && (
                <p className="text-center text-gray-500 mt-10">We couldn't find exact matches, but please explore our Shop page.</p>
              )}
            </div>
          )}

          <form onSubmit={handleSearch} className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe what you are looking for..." 
              className="flex-1 border border-gray-200 p-3 text-sm focus:outline-none focus:border-black"
            />
            <button 
              type="submit" 
              disabled={loading || !query.trim()}
              className="bg-black text-white px-6 hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiStylist;