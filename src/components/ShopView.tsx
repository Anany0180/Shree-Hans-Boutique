import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, ChevronDown, RefreshCw, X, ShoppingBag } from 'lucide-react';

export const ShopView: React.FC = () => {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useApp();
  
  // Local Filtering states
  const [localCategory, setLocalCategory] = useState<string | null>(selectedCategory);
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Sync local category with global category changes (e.g. from banner clicks)
  useEffect(() => {
    setLocalCategory(selectedCategory);
  }, [selectedCategory]);

  const categories = [
    'Suits',
    'Sarees',
    'Nighty',
    'Night Suits',
    'Bedsheets',
    'Slippers',
    'Gift Items',
    'Aachar',
    'Papad',
  ];

  // Maximum price determination dynamically
  const maxProductPrice = useMemo(() => {
    return Math.max(...PRODUCTS.map((p) => p.price));
  }, []);

  // Filter products based on Category, Price Range, and Navbar Search Queries
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (localCategory) {
      result = result.filter((p) => p.category === localCategory);
    }

    // Price range filter
    result = result.filter((p) => p.price <= maxPrice);

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else if (sortBy === 'best-seller') {
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    } else {
      // Default: featured/id mix
      result.sort((a, b) => a.id.localeCompare(b.id));
    }

    return result;
  }, [localCategory, maxPrice, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setLocalCategory(null);
    setSelectedCategory(null);
    setMaxPrice(maxProductPrice);
    setSearchQuery('');
    setSortBy('featured');
  };

  const handleCategorySelect = (cat: string | null) => {
    setLocalCategory(cat);
    setSelectedCategory(cat); // also sync with global
  };

  return (
    <div className="w-full py-8 text-left bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Page Title & Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-950">
              {localCategory ? `${localCategory} Collection` : 'All Boutique Products'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Showing {filteredProducts.length} premium handcrafted item{filteredProducts.length === 1 ? '' : 's'}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          {/* Sort & Mobile Filter togglers */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Filter Toggle on Mobile */}
            <button
              id="mobile-filter-toggle"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-sm border border-gold-500/20 text-xs font-bold text-gray-700 shadow-sm"
            >
              <SlidersHorizontal size={14} className="text-maroon-600" />
              Filters
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex-1 sm:flex-none flex items-center bg-white border border-gold-500/20 rounded-sm px-3 py-2 shadow-sm text-xs text-gray-700">
              <ArrowUpDown size={14} className="text-maroon-600 mr-2" />
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer pr-1 py-0.5 font-bold text-gray-800"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="best-seller">Best Sellers First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 bg-white rounded-sm p-6 border border-gold-500/10 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-cream-100 pb-4">
              <span className="font-serif text-base font-bold text-maroon-900">Custom Filters</span>
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-maroon-600 font-extrabold flex items-center gap-1 hover:underline"
              >
                <RefreshCw size={10} /> Reset All
              </button>
            </div>

            {/* Categories list selection */}
            <div className="space-y-2.5 text-left">
              <span className="text-[10px] uppercase text-gold-600 font-extrabold tracking-widest block mb-1">Categories</span>
              <div className="flex flex-col gap-1.5 text-sm text-gray-700">
                <button
                  onClick={() => handleCategorySelect(null)}
                  className={`text-left py-1.5 px-3 rounded-sm transition-all text-xs font-bold uppercase tracking-wider ${
                    localCategory === null
                      ? 'bg-maroon-600 text-white shadow-sm border border-maroon-600'
                      : 'border border-transparent hover:bg-gold-50 text-gray-600 hover:text-maroon-600'
                  }`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`text-left py-1.5 px-3 rounded-sm transition-all text-xs font-bold uppercase tracking-wider ${
                      localCategory === cat
                        ? 'bg-maroon-600 text-white shadow-sm border border-maroon-600'
                        : 'border border-transparent hover:bg-gold-50 text-gray-600 hover:text-maroon-600'
                    }`}
                  >
                    {cat === 'Aachar' ? 'Aachar (Pickles)' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price slider range selector */}
            <div className="pt-4 border-t border-cream-100 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase text-gold-600 font-extrabold tracking-widest block">Max Budget</span>
                <span className="text-xs font-bold text-maroon-600">₹{maxPrice}</span>
              </div>
              <input
                id="price-range"
                type="range"
                min="100"
                max="6000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-maroon-600 cursor-pointer h-1.5 bg-cream-100 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                <span>₹100</span>
                <span>₹6,000</span>
              </div>
            </div>

            {/* Micro branding card */}
            <div className="pt-4 border-t border-cream-100 text-[11px] text-gray-500 leading-relaxed text-center">
              📍 Kali Mandir Rd, Mughalsarai
              <p className="font-semibold text-maroon-800">Support local craftswomen.</p>
            </div>
          </div>

          {/* 2. Products Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-sm border border-gold-500/10 py-16 px-6 text-center shadow-sm space-y-4">
                <ShoppingBag size={40} className="text-gold-500/30 mx-auto" />
                <h4 className="font-serif text-lg sm:text-xl font-bold text-gray-900">No Matches Found</h4>
                <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed font-light">
                  We couldn't find any products in our Mughalsarai catalog matching your filters. Try selecting another category or resetting filters!
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-maroon-600 hover:bg-maroon-700 text-white text-xs font-bold uppercase tracking-[0.15em] py-3 px-6 rounded-sm transition-colors cursor-pointer shadow-sm inline-flex items-center gap-1"
                >
                  Reset Filtering Criteria
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((p) => (
                  <div key={p.id} className="h-full">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* --- MOBILE COLLAPSIBLE FILTERS OVERLAY --- */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-maroon-900/40 backdrop-blur-sm"
            ></div>

            {/* Form drawer card */}
            <div className="relative bg-white rounded-t-3xl sm:rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-cream-200 z-10 space-y-5 animate-fade-in text-left">
              <div className="flex justify-between items-center border-b border-cream-100 pb-3">
                <span className="font-serif text-base font-bold text-maroon-900">Refine Catalog</span>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 text-gray-400 hover:text-maroon-600 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase text-gold-600 font-extrabold tracking-widest block">Categories</span>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    onClick={() => {
                      handleCategorySelect(null);
                      setShowMobileFilters(false);
                    }}
                    className={`py-2 px-3 text-left rounded-lg border font-semibold ${
                      localCategory === null
                        ? 'bg-maroon-600 text-white border-maroon-600 shadow'
                        : 'border-cream-200 text-gray-600 hover:bg-cream-100'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        handleCategorySelect(cat);
                        setShowMobileFilters(false);
                      }}
                      className={`py-2 px-3 text-left rounded-lg border font-semibold ${
                        localCategory === cat
                          ? 'bg-maroon-600 text-white border-maroon-600 shadow'
                          : 'border-cream-200 text-gray-600 hover:bg-cream-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price slider range selector */}
              <div className="pt-2 border-t border-cream-100 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase text-gold-600 font-extrabold tracking-widest block">Max Price Limit</span>
                  <span className="text-xs font-bold text-maroon-600">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="6000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-maroon-600 cursor-pointer h-1.5 bg-cream-100 rounded-lg"
                />
              </div>

              {/* Action buttons bottom */}
              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => {
                    handleResetFilters();
                    setShowMobileFilters(false);
                  }}
                  className="flex-1 py-2.5 text-center text-xs font-bold border border-maroon-100 text-maroon-700 rounded-xl transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 py-2.5 text-center text-xs font-bold bg-maroon-600 text-white rounded-xl shadow transition-all"
                >
                  Apply Filters
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
