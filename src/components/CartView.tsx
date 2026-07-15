import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, ShoppingBag, ShieldCheck, Truck, ChevronRight, Check, Sparkles, MessageSquare, MessageCircle, ArrowRight, UserCheck } from 'lucide-react';

export const CartView: React.FC = () => {
  const { cart, user, updateCartQuantity, removeFromCart, createOrder, setActiveTab } = useApp();
  
  // Checkout Phases: 'bag' | 'shipping' | 'payment' | 'completed'
  const [phase, setPhase] = useState<'bag' | 'shipping' | 'payment' | 'completed'>('bag');
  
  // Checkout Shipping Form Fields
  const [shippingName, setShippingName] = useState(user?.name || '');
  const [shippingPhone, setShippingPhone] = useState(user?.phone || '');
  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [shippingCity, setShippingCity] = useState('Mughalsarai');
  const [shippingPincode, setShippingPincode] = useState('232101');
  
  // Payment Options
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI'>('COD');
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shippingCharge = subtotal > 500 || subtotal === 0 ? 0 : 50;
  const estimatedTotal = subtotal + shippingCharge;

  const handleStartCheckout = () => {
    if (cart.length === 0) return;
    setPhase('shipping');
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingPhone || !shippingAddress) {
      alert('Please fill out Name, Phone, and Shipping Address.');
      return;
    }
    setPhase('payment');
  };

  const handlePlaceOrder = () => {
    const order = createOrder(paymentMethod, {
      name: shippingName,
      phone: shippingPhone,
      address: shippingAddress,
      city: shippingCity,
      pincode: shippingPincode
    });

    setCompletedOrder(order);
    setPhase('completed');
  };

  // --- PHASE: ORDER COMPLETED SUCCESSFULLY ---
  if (phase === 'completed' && completedOrder) {
    // Generate custom WhatsApp message to coordinate delivery
    const encodedMsg = encodeURIComponent(
      `Hello Shree Hans Boutique! I just placed an order on your website.\n\nOrder ID: ${completedOrder.id}\nItems:\n${completedOrder.items
        .map((item: any) => `- ${item.productName} (${item.size}) x${item.quantity}`)
        .join('\n')}\nTotal: ₹${completedOrder.totalAmount}\nDelivery Name: ${completedOrder.shippingAddress.name}\nPhone: ${completedOrder.shippingAddress.phone}\nAddress: ${completedOrder.shippingAddress.address}, Mughalsarai.\n\nPlease confirm my delivery timeline!`
    );

    return (
      <div className="w-full py-16 px-4 flex items-center justify-center bg-cream-50 text-left">
        <div className="w-full max-w-2xl bg-white rounded-sm p-6 sm:p-10 border border-gold-500/10 shadow-md space-y-6">
          
          <div className="text-center space-y-3 pb-4 border-b border-cream-100">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto">
              <Check size={26} className="animate-pulse" />
            </div>
            <span className="inline-flex items-center gap-1 bg-gold-100 text-gold-800 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
              <Sparkles size={11} /> Auspicious Purchase Completed!
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-900 leading-tight">
              Order Registered Successfully
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-light">
              Thank you for supporting Shree Hans Boutique, local craftsmanship of Mughalsarai!
            </p>
          </div>

          {/* Receipt Breakdown */}
          <div className="bg-cream-50 rounded-sm p-5 border border-gold-500/10 text-xs sm:text-sm space-y-3 text-gray-700">
            <div className="flex justify-between font-bold text-gray-900 border-b border-cream-200/60 pb-2">
              <span>Order ID Reference:</span>
              <span className="text-maroon-600">{completedOrder.id}</span>
            </div>

            <div className="space-y-1.5 py-1">
              {completedOrder.items.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between">
                  <span className="line-clamp-1 max-w-[280px]">
                    {item.productName} ({item.size}) <strong className="text-gray-500 font-normal">x{item.quantity}</strong>
                  </span>
                  <span className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-maroon-800 border-t border-cream-200/60 pt-2 text-base">
              <span>Grand Total:</span>
              <span>₹{completedOrder.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Delivery teaser */}
          <div className="text-xs text-gray-600 leading-relaxed bg-amber-50 rounded-sm p-4 border border-amber-100 space-y-1 font-light">
            <p><strong>Shipping To:</strong> {completedOrder.shippingAddress.name} ({completedOrder.shippingAddress.phone})</p>
            <p><strong>Address:</strong> {completedOrder.shippingAddress.address}, {completedOrder.shippingAddress.city} - {completedOrder.shippingAddress.pincode}</p>
            <p><strong>Payment Mode:</strong> {completedOrder.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'UPI Scan & Pay (Unverified)'}</p>
          </div>

          {/* Direct coordination buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href={`https://wa.me/918953126495?text=${encodedMsg}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-sm transition-all shadow-sm text-center flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <MessageCircle className="animate-pulse" size={18} />
              Coordinate Delivery on WhatsApp
            </a>
            
            <button
              onClick={() => {
                setPhase('bag');
                setCompletedOrder(null);
                setActiveTab('home');
              }}
              className="bg-white hover:bg-gold-50 text-maroon-700 border border-gold-500/25 font-bold py-3.5 px-6 rounded-sm transition-all text-center flex items-center justify-center gap-1 cursor-pointer text-xs uppercase tracking-wider"
            >
              Back to Home
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>
    );
  }

  // --- PHASE: BAG STATE (EMPTY OR PRODUCTS LIST) ---
  return (
    <div className="w-full py-10 text-left bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Step Tracker Header */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-10 max-w-lg mx-auto text-xs sm:text-sm font-semibold text-gray-500">
          <button 
            onClick={() => setPhase('bag')}
            className={`flex items-center gap-1.5 ${phase === 'bag' ? 'text-maroon-600 font-bold' : 'text-gray-400'}`}
          >
            <span>1. Cart Bag</span>
          </button>
          <ChevronRight size={14} className="text-gray-300" />
          <span className={`${phase === 'shipping' ? 'text-maroon-600 font-bold' : 'text-gray-400'}`}>2. Delivery Detail</span>
          <ChevronRight size={14} className="text-gray-300" />
          <span className={`${phase === 'payment' ? 'text-maroon-600 font-bold' : 'text-gray-400'}`}>3. Checkout Mode</span>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-sm border border-gold-500/10 p-12 text-center shadow-sm max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-maroon-50 text-maroon-600 flex items-center justify-center mx-auto border border-maroon-100/40">
              <ShoppingBag size={26} />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">Your Cart Bag is Empty</h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xs mx-auto leading-relaxed font-light">
              Explore our lovely ethnic collection, homemade pickles, and bedsheets to add products into your bag!
            </p>
            <button
              id="empty-cart-shop"
              onClick={() => setActiveTab('shop')}
              className="bg-maroon-600 hover:bg-maroon-700 text-white font-bold py-3.5 px-6 rounded-sm text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm inline-flex items-center gap-1"
            >
              Start Shopping Now <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive list or Form based on phase */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* CART BAG PHASE */}
              {phase === 'bag' && (
                <div className="bg-white rounded-sm p-5 sm:p-6 border border-gold-500/10 shadow-sm space-y-5">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-maroon-900">Your Shopping Bag ({cart.length} items)</h3>
                  
                  <div className="divide-y divide-cream-100">
                    {cart.map((item, idx) => (
                      <div key={idx} className="py-4 sm:py-5 flex gap-4 text-xs sm:text-sm first:pt-0 last:pb-0">
                        {/* Image */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-cream-50 rounded-sm overflow-hidden border border-gold-500/10 flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Title & Sizing */}
                        <div className="flex-1 text-left flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900 leading-snug line-clamp-1">{item.product.name}</h4>
                            <span className="text-[9px] uppercase font-bold text-gold-600 block mt-0.5">{item.product.category}</span>
                            <p className="text-[11px] text-gray-500 mt-1 font-light">
                              Selected Option: <strong className="text-maroon-700 font-bold">{item.selectedSize}</strong>
                            </p>
                          </div>

                          {/* Stepper counter inside list */}
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-[11px] text-gray-400">Qty:</span>
                            <div className="flex items-center border border-gold-500/20 rounded-sm bg-cream-50/50">
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                                className="px-2.5 py-0.5 text-gray-500 hover:text-maroon-600 font-extrabold"
                              >
                                -
                              </button>
                              <span className="px-2 font-semibold text-xs text-gray-800 w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                                className="px-2.5 py-0.5 text-gray-500 hover:text-maroon-600 font-extrabold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Total pricing and delete option */}
                        <div className="flex flex-col justify-between items-end">
                          <span className="font-bold text-maroon-700 sm:text-base">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          
                          <button
                            id={`remove-cart-${item.product.id}-${item.selectedSize}`}
                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                            className="text-gray-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                            title="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SHIPPING PHASE */}
              {phase === 'shipping' && (
                <div className="bg-white rounded-sm p-6 sm:p-8 border border-gold-500/10 shadow-sm text-left">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-maroon-900">Delivery Address Details</h3>
                    {user && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-3 py-1 rounded-sm font-bold border border-emerald-100 flex items-center gap-1 uppercase tracking-wider">
                        <UserCheck size={11} /> Profile Linked
                      </span>
                    )}
                  </div>

                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Recipient Full Name *</label>
                        <input
                          type="text"
                          required
                          value={shippingName}
                          onChange={(e) => setShippingName(e.target.value)}
                          placeholder="Suman Srivastava"
                          className="w-full bg-cream-50/50 border border-gold-500/20 focus:border-maroon-600 rounded-sm py-2.5 px-3.5 text-sm focus:outline-none"
                        />
                      </div>
                      {/* Phone */}
                      <div>
                        <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Contact Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={shippingPhone}
                          onChange={(e) => setShippingPhone(e.target.value)}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full bg-cream-50/50 border border-gold-500/20 focus:border-maroon-600 rounded-sm py-2.5 px-3.5 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Address details */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Complete Delivery Address *</label>
                      <textarea
                        required
                        rows={3}
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="E.g. H.No 124, Kali Mandir Road, near Arvind Dhoodh Bhandhar, Ravinagar..."
                        className="w-full bg-cream-50/50 border border-gold-500/20 focus:border-maroon-600 rounded-sm py-2.5 px-3.5 text-sm focus:outline-none resize-none"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* City */}
                      <div>
                        <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">City (Mughalsarai Local)</label>
                        <input
                          type="text"
                          disabled
                          value={shippingCity}
                          className="w-full bg-gray-100 border border-gold-500/20 text-gray-500 rounded-sm py-2.5 px-3.5 text-sm focus:outline-none cursor-not-allowed font-medium"
                        />
                      </div>
                      {/* Pincode */}
                      <div>
                        <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Postal Code (Pincode)</label>
                        <input
                          type="text"
                          disabled
                          value={shippingPincode}
                          className="w-full bg-gray-100 border border-gold-500/20 text-gray-500 rounded-sm py-2.5 px-3.5 text-sm focus:outline-none cursor-not-allowed font-medium"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setPhase('bag')}
                        className="flex-1 border border-maroon-600/20 text-maroon-700 font-bold py-3 px-4 rounded-sm text-xs uppercase tracking-wider transition-colors"
                      >
                        Back to Bag
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-maroon-600 hover:bg-maroon-700 text-white font-bold py-3 px-4 rounded-sm text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                      >
                        Proceed to Payment
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* PAYMENT PHASE */}
              {phase === 'payment' && (
                <div className="bg-white rounded-sm p-6 sm:p-8 border border-gold-500/10 shadow-sm space-y-6 text-left">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-maroon-900">Select Payment Mode</h3>

                  <div className="space-y-4">
                    {/* Cash on Delivery option */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('COD')}
                      className={`w-full p-4 rounded-sm border text-left flex items-start gap-3 transition-all ${
                        paymentMethod === 'COD'
                          ? 'border-maroon-600 bg-maroon-50/20 ring-1 ring-maroon-600'
                          : 'border-gold-500/15 hover:bg-cream-50'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === 'COD'}
                        readOnly
                        className="mt-1 text-maroon-600 focus:ring-maroon-500"
                      />
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-gray-900">Cash on Delivery (COD)</h4>
                        <p className="text-[11px] text-gray-500 mt-1 font-light leading-relaxed">
                          Pay by cash, UPI, or card directly to our courier executive when they deliver your parcel in Mughalsarai. No advance booking fee.
                        </p>
                      </div>
                    </button>

                    {/* UPI Option */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI')}
                      className={`w-full p-4 rounded-sm border text-left flex items-start gap-3 transition-all ${
                        paymentMethod === 'UPI'
                          ? 'border-maroon-600 bg-maroon-50/20 ring-1 ring-maroon-600'
                          : 'border-gold-500/15 hover:bg-cream-50'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === 'UPI'}
                        readOnly
                        className="mt-1 text-maroon-600 focus:ring-maroon-500"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-xs sm:text-sm text-gray-900">Digital UPI Transfer (GPay / PhonePe)</h4>
                          <span className="text-[9px] bg-gold-100 text-gold-800 font-bold px-2 py-0.5 rounded-none uppercase">Mock Gateway</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1 font-light leading-relaxed">
                          Transfer directly using your smartphone. Once order is completed, we will show a mock merchant UPI scan-code to copy or initiate payment coordinates.
                        </p>

                        {/* Show mock UPI details when selected */}
                        {paymentMethod === 'UPI' && (
                          <div className="mt-4 bg-cream-50 p-4 rounded-sm border border-gold-500/15 text-center space-y-3 animate-fade-in max-w-sm mx-auto">
                            <div className="aspect-square w-28 bg-white border border-gray-300 mx-auto flex items-center justify-center p-2 rounded-sm">
                              {/* Small mock SVG QR pattern */}
                              <svg width="100%" height="100%" viewBox="0 0 100 100">
                                <rect width="100" height="100" fill="#ffffff" />
                                <rect x="5" y="5" width="25" height="25" fill="#800000" />
                                <rect x="10" y="10" width="15" height="15" fill="#ffffff" />
                                <rect x="70" y="5" width="25" height="25" fill="#800000" />
                                <rect x="75" y="10" width="15" height="15" fill="#ffffff" />
                                <rect x="5" y="70" width="25" height="25" fill="#800000" />
                                <rect x="10" y="75" width="15" height="15" fill="#ffffff" />
                                <path d="M 40 40 L 60 40 L 60 60 L 40 60 Z" fill="#d4af37" />
                                <path d="M 35 15 L 45 15 L 45 25" stroke="#000000" strokeWidth="2" fill="none" />
                                <path d="M 15 35 L 15 45 L 25 45" stroke="#000000" strokeWidth="2" fill="none" />
                                <path d="M 85 35 L 85 45 L 75 45" stroke="#000000" strokeWidth="2" fill="none" />
                                <path d="M 35 85 L 45 85 L 45 75" stroke="#000000" strokeWidth="2" fill="none" />
                              </svg>
                            </div>
                            <span className="text-[10px] font-extrabold text-gray-700 block">UPI ID: shreehans@upi</span>
                            <span className="text-[9px] text-gray-400 font-light">Scan QR or transfer on our registered number above.</span>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setPhase('shipping')}
                      className="flex-1 border border-maroon-600/20 text-maroon-700 font-bold py-3 px-4 rounded-sm text-xs uppercase tracking-wider transition-colors"
                    >
                      Back to Shipping
                    </button>
                    <button
                      id="place-order-btn"
                      onClick={handlePlaceOrder}
                      className="flex-1 bg-maroon-600 hover:bg-maroon-700 text-white font-bold py-3 px-4 rounded-sm text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <ShieldCheck size={15} />
                      Complete & Place Order
                    </button>
                  </div>

                </div>
              )}

            </div>

            {/* Right: Dynamic Billing Summary Sidebar */}
            <div className="lg:col-span-4 bg-white rounded-sm p-6 border border-gold-500/10 shadow-sm space-y-5 text-left">
              <h3 className="font-serif text-lg font-bold text-gray-900">Billing Summary</h3>
              
              <div className="space-y-3.5 text-xs sm:text-sm text-gray-700 border-b border-cream-100 pb-5 font-light">
                <div className="flex justify-between">
                  <span className="text-gray-500">Cart Bag Subtotal ({cart.length} items):</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex flex-col text-left">
                    <span className="text-gray-500">Delivery Service Charge:</span>
                    <span className="text-[9px] text-gray-400">Free delivery on orders above ₹500</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {shippingCharge === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${shippingCharge}`
                    )}
                  </span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-baseline pt-1">
                <span className="text-xs uppercase text-gold-600 font-bold tracking-wider">Grand Total:</span>
                <span className="text-xl font-extrabold text-maroon-600">
                  ₹{estimatedTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Checkout action when in bag phase */}
              {phase === 'bag' && (
                <button
                  id="checkout-bag-btn"
                  onClick={handleStartCheckout}
                  className="w-full bg-maroon-600 hover:bg-maroon-700 text-white font-bold py-3.5 px-4 rounded-sm text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Proceed to Checkout
                  <ArrowRight size={14} />
                </button>
              )}

              {/* Trust markers */}
              <div className="bg-cream-50/50 rounded-sm p-4 border border-gold-500/10 space-y-3 text-[11px] text-gray-500 font-light">
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-gold-600 flex-shrink-0" />
                  <span>Prompt delivery inside Mughalsarai coordinates.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-gold-600 flex-shrink-0" />
                  <span>Secure Local Cash on Delivery or UPI Scan support.</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
