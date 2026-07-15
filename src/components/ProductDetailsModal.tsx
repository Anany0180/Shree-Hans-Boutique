import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, ShoppingBag, Truck, ShieldCheck, RefreshCw, MessageSquare } from 'lucide-react';
import { Product } from '../types';

export const ProductDetailsModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart } = useApp();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToCartState, setAddedToCartState] = useState<boolean>(false);

  // Reset local inputs when selected product changes
  useEffect(() => {
    if (selectedProduct) {
      const defaultSize = selectedProduct.sizes ? selectedProduct.sizes[0] : 'Standard';
      setSelectedSize(defaultSize);
      setQuantity(1);
      setAddedToCartState(false);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  // Calculate dynamic scaled price based on size selection (e.g. food weights or bedsheet configurations)
  const getScaledPrice = (product: Product, size: string): { price: number; original?: number } => {
    let factor = 1;
    let priceOffset = 0;

    if (product.category === 'Aachar' || product.category === 'Papad') {
      if (size === '500g') factor = 1.8;
      if (size === '1kg') factor = 3.2;
    } else if (product.category === 'Bedsheets') {
      if (size.toLowerCase().includes('single')) {
        priceOffset = -400; // Single is cheaper
      }
    }

    const price = Math.round(product.price * factor + priceOffset);
    const original = product.originalPrice 
      ? Math.round(product.originalPrice * factor + priceOffset)
      : undefined;

    return { price, original };
  };

  const currentPrices = getScaledPrice(selectedProduct, selectedSize);

  const handleAddToCart = () => {
    // Create a modified copy of product with the scaled price matching their selected size/weight
    const adjustedProduct = {
      ...selectedProduct,
      price: currentPrices.price,
      originalPrice: currentPrices.original
    };
    
    addToCart(adjustedProduct, selectedSize, quantity);
    setAddedToCartState(true);
    
    // Auto-close modal after 1.5 seconds
    setTimeout(() => {
      setSelectedProduct(null);
    }, 1500);
  };

  const isFoodCategory = selectedProduct.category === 'Aachar' || selectedProduct.category === 'Papad';

  return (
    <div 
      id="product-details-modal"
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div 
        onClick={() => setSelectedProduct(null)}
        className="fixed inset-0 bg-maroon-900/45 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-sm max-w-4xl w-full shadow-2xl overflow-hidden z-10 border border-gold-500/15 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] text-left">
        
        {/* Close Button */}
        <button
          id="close-modal"
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 bg-white/95 text-maroon-900 hover:text-white hover:bg-maroon-600 p-2 border border-gold-500/25 rounded-none shadow transition-all"
        >
          <X size={16} />
        </button>

        {/* Left: Product Gallery */}
        <div className="w-full md:w-1/2 relative bg-cream-50 flex items-center justify-center max-h-[40vh] md:max-h-full overflow-hidden">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center max-h-[40vh] md:max-h-none"
          />
          {selectedProduct.isBestSeller && (
            <span className="absolute bottom-4 left-4 bg-maroon-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-none shadow border border-gold-500/10">
              Best Seller
            </span>
          )}
        </div>

        {/* Right: Product Customization & Checkout */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[85vh]">
          <div>
            {/* Category tag */}
            <span className="text-[10px] uppercase tracking-widest text-gold-600 font-extrabold mb-1 block">
              {selectedProduct.category}
            </span>

            {/* Title */}
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-gray-900 leading-snug mb-2">
              {selectedProduct.name}
            </h2>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-gold-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    fill={i < Math.floor(selectedProduct.rating) ? 'currentColor' : 'none'}
                    className={i < Math.floor(selectedProduct.rating) ? 'text-gold-500' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-700">{selectedProduct.rating} / 5</span>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs text-gray-500">{selectedProduct.reviewsCount} customer reviews</span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-2 mb-4 p-3.5 bg-cream-50 rounded-sm border border-gold-500/10">
              <span className="text-2xl font-extrabold text-maroon-600">
                ₹{currentPrices.price.toLocaleString('en-IN')}
              </span>
              {currentPrices.original && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{currentPrices.original.toLocaleString('en-IN')}
                </span>
              )}
              {currentPrices.original && (
                <span className="text-[9px] bg-rose-100 text-rose-700 px-2 py-0.5 font-bold ml-1.5 uppercase tracking-wider rounded-none">
                  Save ₹{(currentPrices.original - currentPrices.price).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-5 border-b border-cream-100 pb-5 font-light">
              <p>{selectedProduct.description}</p>
            </div>

            {/* Sizes/Variants Selector */}
            {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
              <div className="mb-5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-900 block mb-2.5">
                  {isFoodCategory ? 'Select Weight Pack:' : 'Select Size/Option:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((size) => {
                    const priceIndicator = getScaledPrice(selectedProduct, size).price;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs rounded-none border transition-all flex flex-col items-center min-w-[64px] ${
                          selectedSize === size
                            ? 'bg-maroon-600 text-white border-maroon-600 shadow-sm'
                            : 'border-gold-500/15 text-gray-700 hover:bg-gold-50 hover:border-maroon-100'
                        }`}
                      >
                        <span className="font-bold">{size}</span>
                        {(isFoodCategory || selectedProduct.category === 'Bedsheets') && (
                          <span className={`text-[9px] mt-0.5 ${selectedSize === size ? 'text-gold-100' : 'text-gray-400'}`}>
                            ₹{priceIndicator}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="mb-6 flex items-center gap-4">
              <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center border border-gold-500/20 rounded-sm bg-cream-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-1.5 text-gray-500 hover:text-maroon-600 font-bold transition-colors"
                >
                  -
                </button>
                <span className="px-3 font-semibold text-sm text-gray-800 w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                  className="px-3.5 py-1.5 text-gray-500 hover:text-maroon-600 font-bold transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-gray-400 font-light">
                {selectedProduct.stock} items left in stock
              </span>
            </div>
          </div>

          {/* Checkout & Trust Elements */}
          <div>
            {addedToCartState ? (
              <div className="w-full bg-emerald-600 text-white text-center py-3.5 rounded-sm font-bold flex items-center justify-center gap-2 shadow-inner animate-pulse text-xs uppercase tracking-wider">
                <ShieldCheck size={18} />
                Successfully Added to Cart!
              </div>
            ) : (
              <button
                id="modal-add-to-cart"
                onClick={handleAddToCart}
                disabled={selectedProduct.stock <= 0}
                className="w-full bg-maroon-600 hover:bg-maroon-700 text-white font-bold py-3.5 px-6 rounded-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed text-xs uppercase tracking-[0.15em]"
              >
                <ShoppingBag size={15} />
                {selectedProduct.stock <= 0 ? 'Out of Stock' : 'Add to Cart Bag'}
              </button>
            )}

            {/* Quick trust labels */}
            <div className="grid grid-cols-3 gap-2 mt-5 text-[10px] text-gray-500 border-t border-cream-100 pt-4 text-center">
              <div className="flex flex-col items-center">
                <Truck size={14} className="text-gold-600 mb-1" />
                <span>Mughalsarai Delivery</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck size={14} className="text-gold-600 mb-1" />
                <span>100% Homemade/Pure</span>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCw size={14} className="text-gold-600 mb-1" />
                <span>Easy Custom Alteration</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
