import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, Youtube, Instagram, Star, Award, ShieldCheck, Heart } from 'lucide-react';

interface AboutContactProps {
  initialView?: 'about' | 'contact' | 'both';
}

export const AboutContact: React.FC<AboutContactProps> = ({ initialView = 'both' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    // Simulate submission
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="w-full bg-[#fdfbf7] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* --- ABOUT SECTION --- */}
        {(initialView === 'about' || initialView === 'both') && (
          <section className="mb-20">
            <div className="text-center mb-12 max-w-xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-gold-600 font-extrabold block mb-2">Our Journey</span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-maroon-950">About Shree Hans Boutique</h2>
              <div className="h-[1px] w-20 bg-gold-500 mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left text column */}
              <div className="lg:col-span-7 text-left space-y-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon-800 leading-tight">
                  Crafting Elegance, Draping Tradition in Mughalsarai Since Generations
                </h3>
                
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
                  Welcome to <strong>Shree Hans Boutique</strong>, where traditional elegance meets contemporary fits. Nestled in the historic town of Mughalsarai, Uttar Pradesh, we have been a trusted destination for women seeking premium Indian ethnic wear, customized tailoring, and organic homemade food essentials.
                </p>
                
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
                  Our boutique was founded on the philosophy of authentic personal care. Whether it is weaving the fine threads of a Banarasi silk saree, custom fitting a Chanderi salwar suit, stitching a designer blouse, or sun-drying homemade spicy red chilli pickles (Aachar) in ceramic jars, we pour absolute devotion and traditional craftsmanship into every single product.
                </p>

                {/* Core Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
                  <div className="bg-white p-5 rounded-none border border-gold-500/10 shadow-sm">
                    <Award className="text-gold-600 mb-2" size={20} />
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-gray-900">Elite Tailors</h4>
                    <p className="text-[11px] text-gray-500 mt-1 font-light">Stitching calibrated specifically to your body contour and drapes.</p>
                  </div>
                  <div className="bg-white p-5 rounded-none border border-gold-500/10 shadow-sm">
                    <ShieldCheck className="text-gold-600 mb-2" size={20} />
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-gray-900">100% Homemade</h4>
                    <p className="text-[11px] text-gray-500 mt-1 font-light">Sun-cured traditional pickling recipes passed down by ancestors.</p>
                  </div>
                  <div className="bg-white p-5 rounded-none border border-gold-500/10 shadow-sm">
                    <Heart className="text-gold-600 mb-2" size={20} />
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-gray-900">Pure Fabrics</h4>
                    <p className="text-[11px] text-gray-500 mt-1 font-light">Highest thread counts in soft cotton, linen, Chanderi & pure silk.</p>
                  </div>
                </div>
              </div>

              {/* Right column illustration */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-80 h-96 sm:w-96 rounded-none overflow-hidden shadow-lg border border-gold-500/15 hover:shadow-xl transition-all duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&auto=format&fit=crop&q=80"
                    alt="Artisans weaving"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-left text-white">
                    <span className="text-gold-500 text-[10px] uppercase font-bold tracking-widest">Our Heritage Atelier</span>
                    <h4 className="font-serif text-lg font-bold">Shree Hans Mughalsarai</h4>
                    <p className="text-xs text-cream-100 font-light">Preserving domestic Indian craft secrets.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- CONTACT SECTION --- */}
        {(initialView === 'contact' || initialView === 'both') && (
          <section className="border-t border-cream-200 pt-16">
            <div className="text-center mb-12 max-w-xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-gold-600 font-extrabold block mb-2">Get in Touch</span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-maroon-950">Contact Coordinates</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 font-light">Visit us or drop an inquiry — we'd love to assist you!</p>
              <div className="h-[1px] w-20 bg-gold-500 mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Coordinates details & Mock Map */}
              <div className="lg:col-span-5 text-left space-y-6">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-maroon-800">Store Headquarters</h3>
                
                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3 bg-white p-5 rounded-none border border-gold-500/10 shadow-sm">
                    <MapPin className="text-maroon-600 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-gray-900">Boutique Address</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed font-light">
                        Kali Mandir Road, Near Arvind Dhoodh Bhandhar, Ravinagar, Mughalsarai, Uttar Pradesh - 232101
                      </p>
                    </div>
                  </div>

                  {/* Phones */}
                  <div className="flex items-start gap-3 bg-white p-5 rounded-none border border-gold-500/10 shadow-sm">
                    <Phone className="text-maroon-600 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-gray-900">Direct Calling Enquiries</h4>
                      <div className="flex flex-col gap-1 mt-1">
                        <a href="tel:+918953126495" className="text-xs sm:text-sm text-maroon-600 hover:underline font-bold">
                          +91 8953126495
                        </a>
                        <a href="tel:+917668763854" className="text-xs sm:text-sm text-maroon-600 hover:underline font-bold">
                          +91 7668763854
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email & Socials */}
                  <div className="flex items-start gap-3 bg-white p-5 rounded-none border border-gold-500/10 shadow-sm">
                    <Mail className="text-maroon-600 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-gray-900">Digital Support</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">shreehansboutique@gmail.com</p>
                      
                      {/* Social handles */}
                      <div className="flex gap-2.5 mt-3 flex-wrap">
                        <a 
                          href="https://wa.me/918953126495" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="bg-emerald-50 text-emerald-600 px-3 py-2 rounded-none border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle size={14} />
                          WhatsApp
                        </a>
                        <a 
                          href="https://instagram.com" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="bg-rose-50 text-rose-600 p-2 rounded-none border border-rose-100 hover:bg-rose-600 hover:text-white transition-all"
                          title="Instagram Feed"
                        >
                          <Instagram size={14} />
                        </a>
                        <a 
                          href="https://youtube.com" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="bg-red-50 text-red-600 p-2 rounded-none border border-red-100 hover:bg-red-600 hover:text-white transition-all"
                          title="YouTube Channel"
                        >
                          <Youtube size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- Interactive MOCK GOOGLE MAP --- */}
                <div className="border border-gold-500/15 bg-white rounded-none p-4 shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Location Map (Mughalsarai)</span>
                  
                  {/* Styled visual container for map */}
                  <div className="relative aspect-[4/3] w-full rounded-none bg-slate-50 border border-gold-500/10 overflow-hidden flex flex-col justify-between p-3">
                    {/* SVG abstract roads and icons */}
                    <div className="absolute inset-0 z-0 opacity-80 select-none">
                      <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Background mesh */}
                        <rect width="400" height="300" fill="#f8f9fa"/>
                        {/* River Ganges or large roads far away */}
                        <path d="M-10 120 C 120 130, 240 100, 410 140" stroke="#dae0e5" strokeWidth="20" strokeLinecap="round" />
                        {/* Roads */}
                        <line x1="80" y1="-10" x2="80" y2="310" stroke="#ffffff" strokeWidth="8" />
                        <line x1="80" y1="-10" x2="80" y2="310" stroke="#e9ecef" strokeWidth="4" />
                        
                        <line x1="-10" y1="180" x2="410" y2="180" stroke="#ffffff" strokeWidth="12" />
                        <line x1="-10" y1="180" x2="410" y2="180" stroke="#e9ecef" strokeWidth="6" />

                        {/* Diagonal Bypass */}
                        <path d="M-10 280 L 410 40" stroke="#ffffff" strokeWidth="10" />
                        <path d="M-10 280 L 410 40" stroke="#dee2e6" strokeWidth="4" />

                        {/* Local Lanes */}
                        <path d="M 80 180 Q 200 180, 200 80 Q 200 -10, 320 -10" stroke="#ffffff" strokeWidth="6" />
                        <path d="M 80 180 Q 200 180, 200 80 Q 200 -10, 320 -10" stroke="#f1f3f5" strokeWidth="3" />

                        {/* Landmark icons and labels */}
                        {/* Kali Mandir */}
                        <circle cx="160" cy="110" r="14" fill="#800020" fillOpacity="0.1" />
                        <circle cx="160" cy="110" r="5" fill="#800020" />
                        
                        {/* Arvind Dhoodh Bhandhar */}
                        <circle cx="240" cy="190" r="14" fill="#d4af37" fillOpacity="0.15" />
                        <circle cx="240" cy="190" r="5" fill="#d4af37" />

                        {/* Shree Hans Boutique Pin */}
                        <g transform="translate(190, 140)">
                          <circle cx="0" cy="0" r="24" fill="#800020" fillOpacity="0.15" className="animate-ping" style={{ animationDuration: '3s' }} />
                          <circle cx="0" cy="0" r="10" fill="#800020" stroke="#ffffff" strokeWidth="2" />
                          <path d="M 0 -12 L -6 -24 A 6 6 0 0 1 6 -24 Z" fill="#800020" />
                          <circle cx="0" cy="-24" r="2.5" fill="#d4af37" />
                        </g>
                      </svg>
                    </div>

                    {/* Landmark annotations */}
                    <div className="absolute top-18 left-30 bg-white/95 px-2 py-0.5 rounded-none text-[9px] font-bold shadow border border-maroon-100 text-maroon-800 z-10">
                      🕉️ Kali Mandir
                    </div>
                    <div className="absolute top-44 left-44 bg-white/95 px-2.5 py-1 rounded-none shadow-md border border-gold-500 text-gray-900 z-10 flex flex-col text-left">
                      <span className="font-bold">🛍️ Shree Hans Boutique</span>
                      <span className="text-[7px] text-gold-600 font-semibold tracking-wider">RAVINAGAR</span>
                    </div>
                    <div className="absolute bottom-16 right-20 bg-white/95 px-2 py-0.5 rounded-none text-[9px] font-bold shadow border border-cream-200 text-gray-700 z-10">
                      🥛 Arvind Dhoodh Bhandhar
                    </div>

                    {/* Controls overlay */}
                    <div className="mt-auto w-full flex justify-between items-center bg-white/90 p-2.5 rounded-none border border-gold-500/10 z-10">
                      <span className="text-[10px] font-semibold text-gray-700">Kali Mandir Road, Mughalsarai</span>
                      <a 
                        href="https://maps.google.com" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-[9px] font-bold text-white bg-maroon-600 hover:bg-maroon-700 py-1.5 px-3 rounded-none shadow-sm uppercase tracking-wider"
                      >
                        Navigate
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Inquiry Form */}
              <div className="lg:col-span-7 bg-white rounded-sm p-6 sm:p-8 border border-gold-500/10 shadow-sm">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-maroon-800 text-left mb-6">Send Us a Quick Message</h3>
                
                {submitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-sm p-6 text-center animate-fade-in space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <Send size={24} className="animate-pulse" />
                    </div>
                    <h4 className="font-serif text-base sm:text-lg font-bold">Inquiry Transmitted!</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm mx-auto font-light">
                      Thank you for reaching out to Shree Hans Boutique. We have recorded your message. Our coordinator will call/WhatsApp you shortly on your provided contact details.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Suman Srivastava"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-cream-50/50 border border-gold-500/15 focus:border-maroon-600 rounded-sm py-2.5 px-3.5 text-sm focus:outline-none focus:bg-white"
                        />
                      </div>
                      {/* Phone */}
                      <div>
                        <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-cream-50/50 border border-gold-500/15 focus:border-maroon-600 rounded-sm py-2.5 px-3.5 text-sm focus:outline-none focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Email Address (Optional)</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="suman@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-cream-50/50 border border-gold-500/15 focus:border-maroon-600 rounded-sm py-2.5 px-3.5 text-sm focus:outline-none focus:bg-white"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Your Message / Inquiry Details</label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Please write down if you are looking for specific sarees, customized suit measurements, or custom bulk orders of pickles/papads for festivals..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-cream-50/50 border border-gold-500/15 focus:border-maroon-600 rounded-sm py-2.5 px-3.5 text-sm focus:outline-none focus:bg-white resize-none"
                      ></textarea>
                    </div>

                    <button
                      id="contact-submit"
                      type="submit"
                      className="w-full bg-maroon-600 hover:bg-maroon-700 text-white font-bold py-3.5 px-6 rounded-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-[0.15em]"
                    >
                      <Send size={15} />
                      Transmit Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
