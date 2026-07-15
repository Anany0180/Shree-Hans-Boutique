import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingCart, User, Search, Menu, X, ChevronDown, Phone, Heart, Award } from 'lucide-react';
import { ActiveTab } from '../types';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const { cart, user, activeTab, setActiveTab, setSelectedCategory, setSearchQuery, searchQuery } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

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

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setActiveTab('shop');
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab !== 'shop') {
      setSelectedCategory(null);
    }
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (activeTab !== 'shop') {
      setActiveTab('shop');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Banner with phone numbers and address teaser */}
      <div className="bg-maroon-900 text-cream-100 text-xs py-2 px-4 flex flex-col sm:flex-row justify-between items-center border-b border-gold-600/20 gap-2">
        <div className="flex items-center gap-4 text-[11px] sm:text-xs">
          <span className="flex items-center gap-1">
            <Phone size={12} className="text-gold-500 animate-pulse" />
            <a href="tel:+918953126495" className="hover:text-gold-500 transition-colors">+91 8953126495</a>
          </span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-1">
            <Phone size={12} className="text-gold-500" />
            <a href="tel:+917668763854" className="hover:text-gold-500 transition-colors">+91 7668763854</a>
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] sm:text-xs text-gold-100/90 font-medium">
          <span>📍 Mughalsarai, UP, India</span>
          <span className="hidden sm:inline">🌟 Traditional Indian Handcrafts & Custom Stitching</span>
        </div>
      </div>

      {/* Main Navigation bar */}
      <div className="bg-cream-50 border-b border-gold-500/20 py-4 px-4 sm:px-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Brand Name */}
          <button 
            id="brand-logo"
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-none border border-gold-500 shadow-inner group-hover:rotate-12 transition-transform duration-500 overflow-hidden flex items-center justify-center">
              <Logo className="w-full h-full" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl sm:text-2xl text-maroon-600 tracking-tighter leading-tight group-hover:text-maroon-700 transition-colors">
                SHREE HANS <span className="font-light text-gold-600">BOUTIQUE</span>
              </h1>
              <p className="text-[9px] sm:text-[10px] tracking-[0.2em] text-gold-600 font-semibold uppercase font-sans">
                SINCE 2012 — MUGHALSARAI
              </p>
            </div>
          </button>

          {/* Search bar for Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm relative">
            <input
              id="search-input"
              type="text"
              placeholder="Search sarees, suits, pickles, bedsheets..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-cream-50/80 border border-maroon-100 focus:border-maroon-600 rounded-full py-1.5 px-4 pr-10 text-sm transition-all shadow-inner focus:outline-none"
            />
            <Search size={18} className="absolute right-3.5 text-maroon-600" />
          </div>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-700">
            <button
              id="nav-home"
              onClick={() => handleNavClick('home')}
              className={`hover:text-maroon-600 cursor-pointer py-1.5 transition-all ${
                activeTab === 'home' ? 'text-maroon-600 border-b-2 border-gold-500 font-bold' : ''
              }`}
            >
              Home
            </button>
            
            {/* Shop with dropdown trigger */}
            <div className="relative">
              <button
                id="nav-shop-dropdown"
                onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                className={`flex items-center gap-1 hover:text-maroon-600 cursor-pointer py-1.5 transition-all ${
                  activeTab === 'shop' ? 'text-maroon-600 border-b-2 border-gold-500 font-bold' : ''
                }`}
              >
                Shop
                <ChevronDown size={14} className={`transition-transform duration-300 ${shopDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {shopDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl bg-white shadow-xl border border-cream-200 py-2.5 z-50 animate-fade-in divide-y divide-cream-100">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setActiveTab('shop');
                        setShopDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider text-maroon-600 hover:bg-gold-50"
                    >
                      All Products
                    </button>
                  </div>
                  <div className="py-1 max-h-64 overflow-y-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className="w-full text-left px-4 py-1.5 text-sm text-gray-700 hover:bg-cream-100 hover:text-maroon-600 transition-colors"
                      >
                        {cat === 'Aachar' ? 'Aachar (Pickles)' : cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-services"
              onClick={() => handleNavClick('services')}
              className={`hover:text-maroon-600 cursor-pointer py-1.5 transition-all ${
                activeTab === 'services' ? 'text-maroon-600 border-b-2 border-gold-500 font-bold' : ''
              }`}
            >
              Services (Stitching)
            </button>
            
            <button
              id="nav-about"
              onClick={() => handleNavClick('about')}
              className={`hover:text-maroon-600 cursor-pointer py-1.5 transition-all ${
                activeTab === 'about' ? 'text-maroon-600 border-b-2 border-gold-500 font-bold' : ''
              }`}
            >
              About
            </button>
            
            <button
              id="nav-contact"
              onClick={() => handleNavClick('contact')}
              className={`hover:text-maroon-600 cursor-pointer py-1.5 transition-all ${
                activeTab === 'contact' ? 'text-maroon-600 border-b-2 border-gold-500 font-bold' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile search button */}
            <button
              id="mobile-search-btn"
              onClick={() => handleNavClick('shop')}
              className="lg:hidden p-2 hover:bg-cream-100 hover:text-maroon-600 text-gray-700 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Cart Icon */}
            <button
              id="nav-cart"
              onClick={() => handleNavClick('cart')}
              className="relative p-2.5 hover:bg-cream-100 hover:text-maroon-600 text-gray-700 rounded-full transition-all group"
            >
              <ShoppingCart size={21} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-maroon-600 border border-cream-50 text-cream-100 text-[10px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Icon */}
            <button
              id="nav-profile"
              onClick={() => handleNavClick('profile')}
              className={`p-2.5 hover:bg-cream-100 hover:text-maroon-600 rounded-full transition-all flex items-center gap-1 group ${
                user ? 'bg-maroon-50 text-maroon-600 border border-maroon-100' : 'text-gray-700'
              }`}
            >
              <User size={21} className="group-hover:scale-110 transition-transform" />
              {user && (
                <span className="hidden lg:inline text-xs font-semibold max-w-24 truncate">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              id="mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-cream-100 hover:text-maroon-600 text-gray-700 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-cream-200 shadow-lg absolute top-full left-0 w-full z-40 py-4 px-6 flex flex-col gap-4 animate-fade-in max-h-screen overflow-y-auto">
          {/* Mobile search input */}
          <div className="relative">
            <input
              id="mobile-search-input"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-cream-50 border border-maroon-100 focus:border-maroon-600 rounded-lg py-2 px-3 pr-10 text-sm focus:outline-none"
            />
            <Search size={16} className="absolute right-3.5 top-3 text-maroon-600" />
          </div>

          <div className="flex flex-col gap-3 font-medium text-gray-700">
            <button
              id="mob-nav-home"
              onClick={() => handleNavClick('home')}
              className={`text-left py-1.5 border-b border-cream-100 ${
                activeTab === 'home' ? 'text-maroon-600 font-bold pl-1 border-l-2 border-gold-500' : ''
              }`}
            >
              Home
            </button>
            
            {/* Category selection header */}
            <div className="py-1">
              <span className="text-xs uppercase text-gold-600 tracking-wider font-semibold block mb-2">Shop Categories</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setActiveTab('shop');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-1 px-2.5 rounded text-xs bg-maroon-50 text-maroon-600 font-medium"
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className="text-left py-1 px-2.5 rounded text-xs hover:bg-cream-100 hover:text-maroon-600 text-gray-600 transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              id="mob-nav-services"
              onClick={() => handleNavClick('services')}
              className={`text-left py-1.5 border-b border-cream-100 ${
                activeTab === 'services' ? 'text-maroon-600 font-bold pl-1 border-l-2 border-gold-500' : ''
              }`}
            >
              Services (Stitching)
            </button>
            <button
              id="mob-nav-about"
              onClick={() => handleNavClick('about')}
              className={`text-left py-1.5 border-b border-cream-100 ${
                activeTab === 'about' ? 'text-maroon-600 font-bold pl-1 border-l-2 border-gold-500' : ''
              }`}
            >
              About Shree Hans
            </button>
            <button
              id="mob-nav-contact"
              onClick={() => handleNavClick('contact')}
              className={`text-left py-1.5 border-b border-cream-100 ${
                activeTab === 'contact' ? 'text-maroon-600 font-bold pl-1 border-l-2 border-gold-500' : ''
              }`}
            >
              Contact Us
            </button>
          </div>
          
          <div className="pt-2 border-t border-cream-200 text-xs text-gray-500 flex flex-col gap-1.5">
            <p className="font-semibold text-gray-700">Need help shopping?</p>
            <a href="tel:+918953126495" className="text-maroon-600 flex items-center gap-1 font-semibold">📞 +91 8953126495</a>
            <a href="https://wa.me/918953126495" target="_blank" rel="noreferrer" className="text-green-600 flex items-center gap-1 font-semibold">💬 WhatsApp Chat Support</a>
          </div>
        </div>
      )}
    </header>
  );
};
