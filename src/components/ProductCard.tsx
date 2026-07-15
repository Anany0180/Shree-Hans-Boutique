import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, addToCart, cart } = useApp();

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleCardClick = () => {
    setSelectedProduct(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If clothes with multiple sizes, open detail modal so they select size.
    // If food or single size, add the first size available.
    if (product.sizes && product.sizes.length > 1) {
      setSelectedProduct(product);
    } else {
      const defaultSize = product.sizes ? product.sizes[0] : 'Standard';
      addToCart(product, defaultSize, 1);
      
      // Temporary simple animation cue or native visual toast could be helpful, handled globally
    }
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="group relative bg-white overflow-hidden shadow-sm hover:shadow-md border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300 flex flex-col cursor-pointer h-full rounded-sm"
    >
      {/* Product Image Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-cream-50">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="bg-maroon-600 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-none shadow-sm border border-gold-500/10">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-gold-500 text-maroon-900 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-none shadow-sm">
              New Arrival
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-rose-600 text-white text-[9px] font-bold px-2 py-1 rounded-none self-start shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick hover eyes icon */}
        <div className="absolute inset-0 bg-maroon-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white/95 text-maroon-600 p-2.5 rounded-full shadow-md transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 hover:bg-maroon-600 hover:text-white">
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[9px] uppercase tracking-widest text-gold-600 font-extrabold mb-1 block">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="font-serif font-bold text-sm sm:text-base text-gray-900 line-clamp-2 leading-snug group-hover:text-maroon-600 transition-colors">
            {product.name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex text-gold-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  className={i < Math.floor(product.rating) ? 'text-gold-500' : 'text-gray-200'}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-400">({product.reviewsCount})</span>
          </div>
        </div>

        <div className="mt-4">
          {/* Price & Action Row */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-cream-100">
            <div className="flex flex-col text-left">
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm sm:text-base font-bold text-maroon-600">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <span className="text-[9px] text-gray-400 font-medium">
                {product.sizes ? `Sizes: ${product.sizes.slice(0, 2).join(', ')}${product.sizes.length > 2 ? '+' : ''}` : 'In stock'}
              </span>
            </div>

            {/* Quick Add Button */}
            <button
              id={`quick-add-${product.id}`}
              onClick={handleQuickAdd}
              className="bg-cream-50 hover:bg-maroon-600 text-maroon-600 hover:text-white p-2 border border-gold-500/10 rounded-sm transition-all duration-300 shadow-sm hover:shadow"
              title="Quick Add to Cart"
            >
              <ShoppingBag size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
