/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { ShopView } from './components/ShopView';
import { ServiceForm } from './components/ServiceForm';
import { AboutContact } from './components/AboutContact';
import { CartView } from './components/CartView';
import { ProfileView } from './components/ProfileView';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { Logo } from './components/Logo';
import { Phone, MapPin, MessageCircle, Instagram, Youtube, Heart, HelpCircle, Shield, Sparkles } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, setActiveTab, setSelectedCategory } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeHero />;
      case 'shop':
        return <ShopView />;
      case 'services':
        return <ServiceForm />;
      case 'about':
        return <AboutContact initialView="about" />;
      case 'contact':
        return <AboutContact initialView="contact" />;
      case 'cart':
        return <CartView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeHero />;
    }
  };

  const handleFooterCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setActiveTab('shop');
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream-50 text-gray-800 antialiased font-sans">
      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Main content router */}
      <main className="flex-1 w-full flex flex-col items-center">
        {renderActiveView()}
      </main>

      {/* 3. Product Overlay Modal */}
      <ProductDetailsModal />

      {/* 4. Global Footer (Required on every page) */}
      <footer className="w-full bg-maroon-900 text-cream-100 border-t border-gold-500/20 pt-16 pb-8 px-4 sm:px-6 md:px-8 relative overflow-hidden text-left">
        {/* Abstract motif backdrop */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl -mr-16 -mb-16 select-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10 pb-12">
          
          {/* Col 1: Store Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-none border border-gold-500/30 overflow-hidden flex items-center justify-center">
                <Logo className="w-full h-full" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                Shree Hans Boutique
              </h3>
            </div>
            <p className="text-xs text-cream-100/80 leading-relaxed">
              Mughalsarai's leading boutique for customized designer salwar suits, Banarasi sarees, comfortable hosiery nighties, premium bedsheets, and high-quality sun-matured pickles (Aachar) & papads.
            </p>
            <div className="flex gap-3 text-gold-500 pt-2">
              <span className="flex items-center gap-1.5 text-xs text-gold-400 font-semibold uppercase tracking-wider">
                <Sparkles size={12} className="animate-spin" style={{ animationDuration: '6s' }} /> Authenticity Assured
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-500">
              Useful Sections
            </h4>
            <ul className="space-y-2.5 text-xs text-cream-100/90 font-medium">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-gold-500 cursor-pointer transition-colors">Home Landing</button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory(null); setActiveTab('shop'); }} className="hover:text-gold-500 cursor-pointer transition-colors">Ethnic Shopping Bag</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-gold-500 cursor-pointer transition-colors">Tailoring Stitching Services</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-gold-500 cursor-pointer transition-colors">Our Boutique Story</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-gold-500 cursor-pointer transition-colors">Contact Enquiries</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories Link Panel */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-500">
              Shop Categories
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs text-cream-100/95">
              <button onClick={() => handleFooterCategoryClick('Suits')} className="text-left hover:text-gold-500 transition-colors">Salwar Suits</button>
              <button onClick={() => handleFooterCategoryClick('Sarees')} className="text-left hover:text-gold-500 transition-colors">Sarees</button>
              <button onClick={() => handleFooterCategoryClick('Nighty')} className="text-left hover:text-gold-500 transition-colors">Nighty</button>
              <button onClick={() => handleFooterCategoryClick('Night Suits')} className="text-left hover:text-gold-500 transition-colors">Night Suits</button>
              <button onClick={() => handleFooterCategoryClick('Bedsheets')} className="text-left hover:text-gold-500 transition-colors">Bedsheets</button>
              <button onClick={() => handleFooterCategoryClick('Slippers')} className="text-left hover:text-gold-500 transition-colors">Slippers</button>
              <button onClick={() => handleFooterCategoryClick('Aachar')} className="text-left hover:text-gold-500 transition-colors">Homemade Aachar</button>
              <button onClick={() => handleFooterCategoryClick('Papad')} className="text-left hover:text-gold-500 transition-colors">Moong Papad</button>
            </div>
          </div>

          {/* Col 4: Reach Us Coordinates */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-500">
              Boutique Coordinates
            </h4>
            <div className="space-y-3.5 text-xs text-cream-100/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="text-gold-500 flex-shrink-0 mt-0.5" size={15} />
                <span className="leading-relaxed">
                  Kali Mandir Road, Near Arvind Dhoodh Bhandhar, Ravinagar, Mughalsarai, Uttar Pradesh - 232101
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="text-gold-500 flex-shrink-0 mt-0.5" size={15} />
                <div className="flex flex-col">
                  <a href="tel:+918953126495" className="hover:text-gold-500 transition-colors font-bold">+91 8953126495</a>
                  <a href="tel:+917668763854" className="hover:text-gold-500 transition-colors font-bold">+91 7668763854</a>
                </div>
              </div>
              
              {/* WhatsApp & Social badges */}
              <div className="flex gap-2.5 pt-1.5">
                <a 
                  href="https://wa.me/918953126495" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-emerald-600 text-white p-2 rounded-lg border border-emerald-500 hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5 text-[10px] font-bold"
                  title="Direct WhatsApp Helpline"
                >
                  <MessageCircle size={14} />
                  Chat Support
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-white/10 hover:bg-rose-600 text-white p-2 rounded-lg transition-all"
                  title="Instagram Feed"
                >
                  <Instagram size={14} />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-white/10 hover:bg-red-600 text-white p-2 rounded-lg transition-all"
                  title="YouTube Videos"
                >
                  <Youtube size={14} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits Row */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-cream-100/60 gap-4">
          <p>© 2026 Shree Hans Boutique. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Shield size={11} /> Secure Transactions</span>
            <span className="flex items-center gap-1"><Heart size={11} className="text-rose-500" /> Handmade with Love in Uttar Pradesh</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
