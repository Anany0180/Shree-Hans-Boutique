import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TAILORING_SERVICES } from '../data';
import { Scissors, ClipboardCheck, Phone, Clock, Calendar, CheckCircle, Info, Heart } from 'lucide-react';

export const ServiceForm: React.FC = () => {
  const { submitInquiry, user } = useApp();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    garmentType: 'Custom Salwar Suit Stitching',
    measurements: '',
    notes: '',
    preferredDate: ''
  });
  const [submittedInquiry, setSubmittedInquiry] = useState<any>(null);

  const garmentOptions = [
    'Custom Salwar Suit Stitching',
    'Designer Blouse Stitching',
    'Anarkali or Kurti Custom Tailoring',
    'Saree Fall & Picco Work',
    'Other Custom Alterations'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.preferredDate) {
      alert('Please fill out Name, Phone, and Preferred Booking Date.');
      return;
    }

    const inquiry = submitInquiry({
      name: formData.name,
      phone: formData.phone,
      garmentType: formData.garmentType,
      measurements: formData.measurements || 'Not specified (Tailor will measure in person)',
      notes: formData.notes || 'No extra notes',
      preferredDate: formData.preferredDate
    });

    setSubmittedInquiry(inquiry);
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      garmentType: 'Custom Salwar Suit Stitching',
      measurements: '',
      notes: '',
      preferredDate: ''
    });
  };

  return (
    <div className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-extrabold block mb-2 flex items-center justify-center gap-1.5">
            <Scissors size={14} className="text-maroon-600 animate-pulse" />
            Atelier Tailoring Services
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-maroon-950">
            Custom Stitching & Stitching Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 font-light">
            Perfect fit, traditional patterns, and designer cuffs delivered directly to your home.
          </p>
          <div className="h-[1px] w-20 bg-gold-500 mx-auto mt-4"></div>
        </div>

        {/* Tailoring Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {TAILORING_SERVICES.map((srv) => (
            <div 
              key={srv.id}
              className="bg-white rounded-sm overflow-hidden border border-gold-500/10 shadow-sm flex flex-col justify-between hover:border-gold-500/30 transition-all duration-300"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-cream-50">
                <img
                  src={srv.image}
                  alt={srv.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-maroon-900 leading-snug mb-2">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    {srv.description}
                  </p>
                </div>
                
                <div className="mt-5 pt-3 border-t border-cream-100 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase text-gray-400 font-bold">Base Price</span>
                    <span className="text-xs font-extrabold text-maroon-700">₹{srv.basePrice} onwards</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] uppercase text-gray-400 font-bold">Duration</span>
                    <span className="text-xs font-semibold text-gray-700">{srv.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Section: Illustrated Measurement Guide vs Stitching Reservation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Measurement Guide Column */}
          <div className="lg:col-span-5 text-left space-y-6">
            <h3 className="font-serif text-xl font-bold text-maroon-800 flex items-center gap-1.5">
              <ClipboardCheck size={20} className="text-gold-600" />
              Easy Sizing & Measurement Guide
            </h3>
            
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Don't worry about measuring tape precision! Our master tailor can either measure you directly in person at our Mughalsarai boutique, collect a perfectly fitting sample garment from your home, or you can write your standard dimensions in the reservation form notes.
            </p>

            <div className="bg-cream-100/70 rounded-sm p-5 border border-gold-500/10 space-y-3.5">
              <span className="text-[10px] font-extrabold text-gold-600 uppercase tracking-widest block border-b border-gold-500/10 pb-2">How to measure yourself at home:</span>
              
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-none bg-maroon-50 border border-gold-500/20 text-maroon-600 flex items-center justify-center font-bold flex-shrink-0 mt-0.5 text-[9px]">1</span>
                  <span><strong>Suit Length:</strong> Measure from the highest point of your shoulder down to your preferred knee/shin level.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-none bg-maroon-50 border border-gold-500/20 text-maroon-600 flex items-center justify-center font-bold flex-shrink-0 mt-0.5 text-[9px]">2</span>
                  <span><strong>Bust Width:</strong> Wrap tape comfortably around the fullest section of your chest, keeping tape level.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-none bg-maroon-50 border border-gold-500/20 text-maroon-600 flex items-center justify-center font-bold flex-shrink-0 mt-0.5 text-[9px]">3</span>
                  <span><strong>Waist & Hips:</strong> Note standard dimensions where you normally wear your palazzo pants or salwar bottoms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-none bg-maroon-50 border border-gold-500/20 text-maroon-600 flex items-center justify-center font-bold flex-shrink-0 mt-0.5 text-[9px]">4</span>
                  <span><strong>Sleeve Length:</strong> From shoulder cap down to elbow or wrists based on preference (e.g. 3/4 sleeves).</span>
                </li>
              </ul>

              <div className="pt-2 flex items-center gap-2 text-[10px] text-gray-500 leading-normal border-t border-gold-500/10">
                <Info size={14} className="text-gold-600 flex-shrink-0" />
                <span>If you prefer home sample pickup inside Mughalsarai, mention "Home Pickup" in the notes.</span>
              </div>
            </div>

            {/* Quick contact box */}
            <div className="bg-maroon-950 text-white rounded-sm p-5 border border-gold-500/20 text-center space-y-3">
              <span className="text-gold-500 text-[10px] uppercase font-bold tracking-widest block">Direct Tailoring Assistance</span>
              <p className="text-xs text-cream-100 leading-relaxed font-light">
                Have specific neck-depths or wedding catalog ideas? Message our master tailor on WhatsApp or call us directly.
              </p>
              <div className="flex justify-center gap-3">
                <a href="tel:+918953126495" className="bg-white hover:bg-gold-50 text-maroon-900 font-bold px-4 py-2.5 rounded-sm text-xs flex items-center gap-1.5 transition-all shadow text-[10px] uppercase tracking-wider">
                  📞 Call Tailor
                </a>
                <a href="https://wa.me/918953126495" target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-sm text-xs flex items-center gap-1.5 transition-all shadow border border-emerald-500/20 text-[10px] uppercase tracking-wider">
                  💬 Send Design
                </a>
              </div>
            </div>
          </div>

          {/* Stitching Booking Form Column */}
          <div className="lg:col-span-7 bg-white rounded-sm p-6 sm:p-8 border border-gold-500/10 shadow-md">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-maroon-800 text-left mb-6">
              Stitching Inquiry Reservation
            </h3>

            {submittedInquiry ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-sm p-6 text-center space-y-4 animate-fade-in">
                <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle size={22} />
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold">Stitching Reservation Received!</h4>
                
                <div className="bg-white rounded-sm p-4 border border-emerald-100/60 text-left text-xs divide-y divide-cream-100 text-gray-700 space-y-2">
                  <div className="flex justify-between font-semibold text-gray-900 pb-1.5">
                    <span>Inquiry Reference:</span>
                    <span className="text-maroon-600 font-bold">{submittedInquiry.id}</span>
                  </div>
                  <div className="flex justify-between pt-1.5">
                    <span>Customer Name:</span>
                    <span className="font-medium">{submittedInquiry.name}</span>
                  </div>
                  <div className="flex justify-between pt-1.5">
                    <span>Garment Selected:</span>
                    <span className="font-medium">{submittedInquiry.garmentType}</span>
                  </div>
                  <div className="flex justify-between pt-1.5">
                    <span>Preferred Appointment:</span>
                    <span className="font-medium text-maroon-600">{submittedInquiry.preferredDate}</span>
                  </div>
                  <div className="flex justify-between pt-1.5">
                    <span>Current Status:</span>
                    <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-none text-[9px] uppercase tracking-wider">
                      {submittedInquiry.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed max-w-md mx-auto font-light">
                  We have cataloged your stitching parameters! Our master tailor will call or WhatsApp you at <strong>{submittedInquiry.phone}</strong> to confirm the fit details and book the sample collection slot.
                </p>

                <button
                  onClick={() => setSubmittedInquiry(null)}
                  className="bg-maroon-600 hover:bg-maroon-700 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-sm transition-colors cursor-pointer"
                >
                  Create Another Booking
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Anjali Verma"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-cream-50/50 border border-gold-500/20 focus:border-maroon-600 rounded-sm py-2.5 px-3.5 text-sm focus:outline-none focus:bg-white"
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
                      className="w-full bg-cream-50/50 border border-gold-500/20 focus:border-maroon-600 rounded-sm py-2.5 px-3.5 text-sm focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Garment Type */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Garment Selection *</label>
                    <select
                      name="garmentType"
                      value={formData.garmentType}
                      onChange={handleChange}
                      className="w-full bg-cream-50/50 border border-gold-500/20 focus:border-maroon-600 rounded-sm py-2.5 px-3.5 text-sm focus:outline-none focus:bg-white"
                    >
                      {garmentOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Preferred Date */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Preferred Date / Range *</label>
                    <input
                      type="date"
                      name="preferredDate"
                      required
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full bg-cream-50/50 border border-gold-500/20 focus:border-maroon-600 rounded-sm py-2.5 px-3.5 text-sm focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>

                {/* Measurements Input */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Custom Dimensions (Optional)</label>
                    <span className="text-[9px] text-maroon-600 font-extrabold uppercase tracking-wider">Follow our side guide</span>
                  </div>
                  <input
                    type="text"
                    name="measurements"
                    placeholder="Bust: 36, Waist: 30, Sleeves: 12 (or paste sample details)"
                    value={formData.measurements}
                    onChange={handleChange}
                    className="w-full bg-cream-50/50 border border-gold-500/20 focus:border-maroon-600 rounded-sm py-2.5 px-3.5 text-sm focus:outline-none focus:bg-white"
                  />
                </div>

                {/* Notes/Styling Description */}
                <div>
                  <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Neckline Designs & Linings Notes</label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="E.g. Boat neck, back hooks, cotton lining required, contrast gold borders on palazzo cuffs..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full bg-cream-50/50 border border-gold-500/20 focus:border-maroon-600 rounded-sm py-2.5 px-3.5 text-sm focus:outline-none focus:bg-white resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  id="submit-stitching-btn"
                  type="submit"
                  className="w-full bg-maroon-600 hover:bg-maroon-700 text-white font-bold py-3.5 px-6 rounded-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-[0.15em]"
                >
                  <ClipboardCheck size={16} />
                  Submit Inquiry Booking
                </button>

              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
