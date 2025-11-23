import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Check, Truck, ShieldCheck } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Image */}
        <div className="bg-gray-50 aspect-[4/5]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-2 text-sm text-gray-500 uppercase tracking-widest">{product.category}</div>
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-gray-900">{product.name}</h1>
          <p className="text-2xl font-light mb-8">${product.price}</p>

          <p className="text-gray-600 leading-relaxed mb-10 max-w-md">
            {product.description}
          </p>

          <button 
            onClick={() => addToCart(product)}
            className="w-full md:w-auto bg-black text-white px-12 py-4 text-sm font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors mb-10"
          >
            Add to Bag
          </button>

          <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 border-t border-gray-100 pt-8">
            <div className="flex items-center gap-3">
              <Truck size={18} />
              <span>Free worldwide shipping on orders over $200</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} />
              <span>2-year warranty included</span>
            </div>
            <div className="flex items-center gap-3">
              <Check size={18} />
              <span>Ethically sourced materials</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;