import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, TESTIMONIALS } from '../data';
import { ProductCard } from './ProductCard';
import { ArrowRight, Scissors, Sparkles, Heart, Quote, Star, Award, ShieldCheck } from 'lucide-react';

export const HomeHero: React.FC = () => {
  const { setActiveTab, setSelectedCategory, setSelectedProduct } = useApp();

  const categories = [
    { name: 'Suits', label: 'Designer Suits', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&auto=format&fit=crop&q=80', color: 'from-maroon-600/80 to-maroon-900/95', desc: 'Salwar Suits & Anarkalis' },
    { name: 'Sarees', label: 'Silk Sarees', image: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=400&auto=format&fit=crop&q=80', color: 'from-amber-600/80 to-yellow-900/95', desc: 'Banarasi, Chiffon & Silk' },
    { name: 'Nighty', label: 'Nighties', image: 'https://images.unsplash.com/photo-1598554747436-c9293d6d588f?w=400&auto=format&fit=crop&q=80', color: 'from-rose-500/80 to-rose-800/95', desc: 'Pure Cotton Maxi Gowns' },
    { name: 'Night Suits', label: 'Night Suits', image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?w=400&auto=format&fit=crop&q=80', color: 'from-sky-600/80 to-indigo-900/95', desc: 'Cozy Pajama Sets' },
    { name: 'Bedsheets', label: 'Bedsheets', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&auto=format&fit=crop&q=80', color: 'from-emerald-600/80 to-teal-900/95', desc: 'Jaipuri Hand-block Cotton' },
    { name: 'Slippers', label: 'Slippers', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format&fit=crop&q=80', color: 'from-purple-600/80 to-fuchsia-900/95', desc: 'Handcrafted Zardozi Juttis' },
    { name: 'Gift Items', label: 'Gifts & Shagun', image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=400&auto=format&fit=crop&q=80', color: 'from-gold-600/80 to-yellow-800/95', desc: 'Auspicious Boxes & Envelopes' },
    { name: 'Aachar', label: 'Homemade Aachar', image: 'https://images.unsplash.com/photo-1589135306090-e55524b942f1?w=400&auto=format&fit=crop&q=80', color: 'from-red-600/80 to-rose-950/95', desc: 'Banarasi Stuffed Pickles' },
    { name: 'Papad', label: 'Tasty Papad', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&auto=format&fit=crop&q=80', color: 'from-orange-500/80 to-yellow-800/95', desc: 'Hand-rolled Moong Dal' },
  ];

  // Best sellers are items flagged with isBestSeller: true
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveTab('shop');
  };

  return (
    <div className="w-full bg-cream-50 text-left">
      {/* Editorial Dual-Panel Layout Section */}
      <section className="w-full border-b border-gold-500/20 flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
        {/* Left Panel: Brand & Hero */}
        <div className="w-full lg:w-[42%] p-8 sm:p-12 md:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gold-500/20 bg-cream-100 relative">
          {/* Subtle golden background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gold-100/20 via-transparent to-transparent -z-10"></div>
          
          <div className="space-y-6 sm:space-y-8 mb-10 text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-600 font-bold block italic font-serif">Since 2012 — Mughalsarai</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-[1.1] text-maroon-600 tracking-tight">
              Tradition <br/> 
              <span className="italic font-light text-gold-600">Met With</span> <br/>
              Grace.
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-sm leading-relaxed font-light">
              Curating Mughalsarai's finest hand-tailored ethnic wear, block-printed home essentials, and sun-matured Banarasi pickles. Experience the warmth of heritage in every stitch and spice.
            </p>
            <button 
              id="hero-shop-now"
              onClick={() => {
                setSelectedCategory(null);
                setActiveTab('shop');
              }}
              className="px-8 py-4 bg-maroon-600 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-maroon-700 transition-colors cursor-pointer shadow-sm"
            >
              Explore Collection
            </button>
          </div>

          {/* Tailoring Service Highlight panel */}
          <div className="p-6 bg-maroon-50 border border-maroon-600/10 rounded-sm text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-maroon-100/40 rounded-full blur-xl -mr-6 -mt-6"></div>
            <div className="flex justify-between items-start mb-2 relative z-10">
              <h3 className="font-serif italic text-lg text-maroon-600 font-bold">Tailoring & Stitching</h3>
              <span className="text-[9px] font-bold uppercase tracking-widest text-gold-600 bg-gold-100/50 px-2 py-0.5 rounded">Custom Service</span>
            </div>
            <p className="text-xs leading-relaxed text-gray-700 mb-4 relative z-10">
              Get your dream outfit stitched with absolute precision. Designer salwar suits, heavy blouses, fall-piccoing, and custom alterations by local experts.
            </p>
            <button 
              id="hero-book-tailoring"
              onClick={() => setActiveTab('services')}
              className="text-[10px] uppercase font-extrabold tracking-widest underline decoration-gold-500 underline-offset-4 hover:text-maroon-600 transition-colors text-left inline-block"
            >
              Book Tailoring Inquiry
            </button>
          </div>
        </div>

        {/* Right Panel: Category Grid */}
        <div className="w-full lg:w-[58%] p-8 sm:p-12 md:p-14 bg-white flex flex-col justify-between text-left">
          <div>
            <div className="flex justify-between items-end mb-10">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-gold-600 font-bold mb-1">Boutique Catalog</h4>
                <h3 className="text-3xl font-serif italic text-maroon-600">Featured Categories</h3>
              </div>
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  setActiveTab('shop');
                }}
                className="flex gap-1.5 items-center text-xs font-bold uppercase tracking-widest border-b border-gray-900 pb-1 cursor-pointer hover:text-maroon-600 hover:border-maroon-600 transition-colors"
              >
                View All Products <ArrowRight size={12} />
              </button>
            </div>

            {/* Core 3 Editorial Category Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Sarees */}
              <div 
                id="cat-card-Sarees"
                onClick={() => handleCategoryClick('Sarees')}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-cream-100/60 border border-gold-500/10 flex items-center justify-center p-6 transition-all group-hover:border-gold-500 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-700">
                    <img src="https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=400&auto=format&fit=crop&q=80" alt="Sarees" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center relative z-10">
                    <div className="w-12 h-[1px] bg-gold-500 mx-auto mb-4 group-hover:w-16 transition-all duration-300"></div>
                    <span className="text-xs uppercase tracking-widest font-bold text-gray-800 group-hover:text-maroon-600 transition-colors">Silk Sarees</span>
                  </div>
                </div>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-gold-600">From ₹1,299</p>
              </div>

              {/* Salwar Suits */}
              <div 
                id="cat-card-Suits"
                onClick={() => handleCategoryClick('Suits')}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-cream-100/60 border border-gold-500/10 flex items-center justify-center p-6 transition-all group-hover:border-gold-500 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-700">
                    <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&auto=format&fit=crop&q=80" alt="Suits" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center relative z-10">
                    <div className="w-12 h-[1px] bg-gold-500 mx-auto mb-4 group-hover:w-16 transition-all duration-300"></div>
                    <span className="text-xs uppercase tracking-widest font-bold text-gray-800 group-hover:text-maroon-600 transition-colors">Salwar Suits</span>
                  </div>
                </div>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-gold-600">From ₹850</p>
              </div>

              {/* Aachar & Papad */}
              <div 
                id="cat-card-Aachar"
                onClick={() => handleCategoryClick('Aachar')}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-cream-100/60 border border-gold-500/10 flex items-center justify-center p-6 transition-all group-hover:border-gold-500 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-700">
                    <img src="https://images.unsplash.com/photo-1589135306090-e55524b942f1?w=400&auto=format&fit=crop&q=80" alt="Pickles" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center relative z-10">
                    <div className="w-12 h-[1px] bg-gold-500 mx-auto mb-4 group-hover:w-16 transition-all duration-300"></div>
                    <span className="text-xs uppercase tracking-widest font-bold text-gray-800 group-hover:text-maroon-600 transition-colors">Aachar & Papad</span>
                  </div>
                </div>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-gold-600">From ₹120</p>
              </div>
            </div>

            {/* Second Row of Categories (Compact horizontal grid) */}
            <div className="mt-8">
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-gold-600 mb-3 block">More Collections</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                <button 
                  onClick={() => handleCategoryClick('Night Suits')}
                  className="p-3 bg-cream-50 border border-gold-500/20 text-[9px] font-bold text-center uppercase tracking-widest cursor-pointer hover:bg-maroon-600 hover:text-white hover:border-maroon-600 transition-all rounded-sm"
                >
                  Night Suits
                </button>
                <button 
                  onClick={() => handleCategoryClick('Bedsheets')}
                  className="p-3 bg-cream-50 border border-gold-500/20 text-[9px] font-bold text-center uppercase tracking-widest cursor-pointer hover:bg-maroon-600 hover:text-white hover:border-maroon-600 transition-all rounded-sm"
                >
                  Bedsheets
                </button>
                <button 
                  onClick={() => handleCategoryClick('Slippers')}
                  className="p-3 bg-cream-50 border border-gold-500/20 text-[9px] font-bold text-center uppercase tracking-widest cursor-pointer hover:bg-maroon-600 hover:text-white hover:border-maroon-600 transition-all rounded-sm"
                >
                  Slippers
                </button>
                <button 
                  onClick={() => handleCategoryClick('Gift Items')}
                  className="p-3 bg-cream-50 border border-gold-500/20 text-[9px] font-bold text-center uppercase tracking-widest cursor-pointer hover:bg-maroon-600 hover:text-white hover:border-maroon-600 transition-all rounded-sm"
                >
                  Gift Items
                </button>
                <button 
                  onClick={() => handleCategoryClick('Nighty')}
                  className="p-3 bg-cream-50 border border-gold-500/20 text-[9px] font-bold text-center uppercase tracking-widest cursor-pointer hover:bg-maroon-600 hover:text-white hover:border-maroon-600 transition-all rounded-sm"
                >
                  Nighty
                </button>
                <button 
                  onClick={() => {
                    setSelectedCategory(null);
                    setActiveTab('shop');
                  }}
                  className="p-3 bg-maroon-600 border border-maroon-600 text-white text-[9px] font-bold text-center uppercase tracking-widest cursor-pointer hover:bg-maroon-700 transition-all rounded-sm"
                >
                  Shop All
                </button>
              </div>
            </div>
          </div>

          {/* Micro editorial highlight lists */}
          <div className="mt-12 pt-8 border-t border-gold-500/15 flex flex-col sm:flex-row gap-8">
            <div className="flex-1">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-maroon-600">Best Seller</h5>
              <div className="flex items-center gap-4 cursor-pointer group" onClick={() => handleCategoryClick('Suits')}>
                <div className="w-12 h-12 bg-maroon-50 border border-maroon-100 rounded-sm overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&auto=format&fit=crop&q=80" alt="Suits" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div>
                  <p className="text-xs font-serif italic text-gray-800 font-bold group-hover:text-maroon-600">Cotton Floral Salwar Set</p>
                  <p className="text-[10px] font-bold text-gold-600 mt-0.5">₹1,450</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-maroon-600">Trending Now</h5>
              <div className="flex items-center gap-4 cursor-pointer group" onClick={() => handleCategoryClick('Aachar')}>
                <div className="w-12 h-12 bg-cream-100 border border-cream-200 rounded-sm overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1589135306090-e55524b942f1?w=100&auto=format&fit=crop&q=80" alt="Mango Pickle" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div>
                  <p className="text-xs font-serif italic text-gray-800 font-bold group-hover:text-maroon-600">Mango Chili Pickle (500g)</p>
                  <p className="text-[10px] font-bold text-gold-600 mt-0.5">₹240</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Best Selling Products Carousel (styled grid) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10">
          <div className="text-left">
            <span className="text-xs uppercase tracking-widest text-gold-600 font-extrabold block mb-2">Our Masterpieces</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-maroon-950">Customer Favorites & Best Sellers</h2>
          </div>
          <button
            id="view-all-best-sellers"
            onClick={() => {
              setSelectedCategory(null);
              setActiveTab('shop');
            }}
            className="text-sm font-semibold text-maroon-600 hover:text-maroon-700 flex items-center gap-1 mt-4 sm:mt-0"
          >
            View Entire Shop
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 5. Food Highlight Section (Aachar & Papad) */}
      <section className="py-16 sm:py-24 bg-cream-100/70 border-t border-b border-gold-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left illustration / image */}
          <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 overflow-hidden shadow-lg border border-gold-500/20 group">
              <img
                src="https://images.unsplash.com/photo-1589135306090-e55524b942f1?w=600&auto=format&fit=crop&q=80"
                alt="Homemade Pickle"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-5 left-5 text-left text-white">
                <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">Traditional Recipe</span>
                <h4 className="font-serif text-base sm:text-lg font-semibold">Dadi-Maa Recipe Mango Pickle</h4>
              </div>
            </div>
            
            {/* Small offset floating sticker */}
            <div className="absolute -top-4 -right-4 bg-gold-500 text-maroon-900 p-3 shadow-md font-bold text-xs uppercase tracking-wider rotate-12 flex flex-col items-center justify-center w-20 h-20 border border-gold-600/30">
              <span>100%</span>
              <span className="text-[9px]">Sun-cured</span>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-7 text-left order-1 lg:order-2">
            <span className="text-xs uppercase tracking-widest text-gold-600 font-extrabold block mb-2">Shree Hans Foods</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-maroon-950 mb-6 leading-tight">
              Homemade Traditional Banarasi Aachar & Crunchy Sun-Dried Papad
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-light mb-8">
              Prepared purely in domestic kitchens with organic cold-pressed mustard oil, high-grade spices, and the timeless secrets of traditional curation. Our pickles are maturely sun-cured for weeks under continuous personal care, offering an unadulterated taste that reminds you of your home. Pair them with our crispy, hand-rolled pepper moong dal papads for the ultimate comfort meal.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-gold-600 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-serif text-sm font-bold text-gray-900">Zero Synthetic Preservatives</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Naturally cured using ancient mustard oil conservation.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="text-gold-600 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-serif text-sm font-bold text-gray-900">100% Pure & Hygienic</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Prepared under strict clean household parameters.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                id="shop-aachar-btn"
                onClick={() => handleCategoryClick('Aachar')}
                className="bg-maroon-600 hover:bg-maroon-700 text-white text-xs font-bold uppercase tracking-[0.15em] px-6 py-3.5 transition-colors cursor-pointer shadow-sm"
              >
                Browse Aachar
              </button>
              <button
                id="shop-papad-btn"
                onClick={() => handleCategoryClick('Papad')}
                className="bg-white hover:bg-gold-50 text-maroon-700 border border-maroon-600/20 text-xs font-bold uppercase tracking-[0.15em] px-6 py-3.5 transition-all cursor-pointer shadow-sm"
              >
                Browse Papads
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-12 max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-extrabold block mb-2">Boutique Love</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-maroon-950">What Our Customers Say</h2>
          <div className="h-[1px] w-20 bg-gold-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id} 
              className="bg-white p-6 border border-gold-500/10 shadow-sm flex flex-col justify-between hover:border-gold-500/30 hover:shadow-md transition-all rounded-sm"
            >
              <div>
                {/* Stars and date */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex text-gold-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400">{t.date}</span>
                </div>
                
                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic mb-6 relative font-light">
                  <Quote className="absolute -top-3.5 -left-2.5 text-cream-200/50 -z-10" size={32} />
                  "{t.text}"
                </p>
              </div>

              {/* Author name & locality */}
              <div className="border-t border-cream-100 pt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-maroon-50 text-maroon-600 font-serif font-bold text-xs flex items-center justify-center border border-maroon-100/50">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-gray-900">{t.name}</h4>
                  <span className="text-[9px] text-gold-600 font-bold uppercase tracking-wider">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
