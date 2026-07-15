import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Lock, Phone, MapPin, LogOut, ShoppingBag, Calendar, CheckCircle, ClipboardList, RefreshCw, Star } from 'lucide-react';
import { Logo } from './Logo';

export const ProfileView: React.FC = () => {
  const { user, loginUser, registerUser, logoutUser, inquiries } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Auth Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [authError, setAuthError] = useState('');

  // Address Editor Fields
  const [editMode, setEditMode] = useState(false);
  const [tempPhone, setTempPhone] = useState(user?.phone || '');
  const [tempAddress, setTempAddress] = useState(user?.address || '');
  const { updateUserAddress } = useApp();

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!email || !password) {
      setAuthError('Please provide both Email and Password.');
      return;
    }

    if (isSignUp) {
      if (!name) {
        setAuthError('Please fill out your Full Name.');
        return;
      }
      registerUser(name, email, phone, address);
    } else {
      // Simulate simple login using email prefix as display name if not found
      const displayName = email.split('@')[0];
      loginUser(email, displayName.charAt(0).toUpperCase() + displayName.slice(1));
    }

    // Reset fields
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setAddress('');
  };

  const handleSaveAddress = () => {
    updateUserAddress(tempAddress, tempPhone);
    setEditMode(false);
  };

  // --- RENDERING AUTHENTICATION INTERFACE ---
  if (!user) {
    return (
      <div className="w-full py-16 px-4 flex items-center justify-center bg-[#fdfbf7]">
        <div className="w-full max-w-md bg-white rounded-none p-6 sm:p-8 border border-gold-500/15 shadow-xl text-left">
          
          {/* Logo Heading inside auth card */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-none border border-gold-500/25 flex items-center justify-center mx-auto mb-3 shadow-sm overflow-hidden">
              <Logo className="w-full h-full" />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon-900">
              {isSignUp ? 'Join Shree Hans Boutique' : 'Access Your Account'}
            </h2>
            <p className="text-xs text-gray-500 mt-1 font-light">
              {isSignUp ? 'Create your profile to track orders & measurements' : 'Sign in using your email and password'}
            </p>
          </div>

          {authError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs py-2.5 px-3.5 rounded-none mb-5 font-semibold text-center uppercase tracking-wide">
              ⚠ {authError}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            
            {/* Name - only for Sign Up */}
            {isSignUp && (
              <div>
                <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Full Name *</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Suman Srivastava"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-cream-50/50 border border-gold-500/15 focus:border-maroon-600 rounded-none py-2.5 pl-10 pr-3.5 text-sm focus:outline-none focus:bg-white"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Email Address *</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="suman@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-cream-50/50 border border-gold-500/15 focus:border-maroon-600 rounded-none py-2.5 pl-10 pr-3.5 text-sm focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Password *</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-cream-50/50 border border-gold-500/15 focus:border-maroon-600 rounded-none py-2.5 pl-10 pr-3.5 text-sm focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            {/* Optional Phone & Address for Sign Up */}
            {isSignUp && (
              <>
                <div>
                  <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="+91 89531 26495"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-cream-50/50 border border-gold-500/15 focus:border-maroon-600 rounded-none py-2.5 pl-10 pr-3.5 text-sm focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider mb-1.5">Delivery Address</label>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Kali Mandir Road, Mughalsarai"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-cream-50/50 border border-gold-500/15 focus:border-maroon-600 rounded-none py-2.5 pl-10 pr-3.5 text-sm focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full bg-maroon-600 hover:bg-maroon-700 text-white font-bold py-3.5 px-4 rounded-none shadow-sm transition-all mt-6 cursor-pointer text-xs uppercase tracking-[0.15em]"
            >
              {isSignUp ? 'Create Profile' : 'Sign In'}
            </button>
          </form>

          {/* Toggle between Sign In / Sign Up */}
          <div className="text-center mt-6 pt-4 border-t border-cream-100">
            <span className="text-xs text-gray-500 font-light">
              {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}
            </span>
            <button
              id="toggle-auth-mode"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setAuthError('');
              }}
              className="text-xs font-bold text-maroon-600 hover:underline ml-1.5 uppercase tracking-wider text-[11px]"
            >
              {isSignUp ? 'Sign In' : 'Sign Up Now'}
            </button>
          </div>

        </div>
      </div>
    );
  }

  // --- RENDERING AUTHENTICATED PROFILE VIEW ---
  return (
    <div className="w-full py-10 text-left bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Account Details */}
          <div className="lg:col-span-4 bg-white rounded-sm p-6 border border-gold-500/15 shadow-sm space-y-6">
            <div className="flex flex-col items-center text-center pb-6 border-b border-cream-100">
              <div className="w-16 h-16 rounded-none bg-maroon-600 border border-gold-500 text-gold-100 font-serif font-bold text-2xl flex items-center justify-center mb-3 shadow">
                {user.name[0]}
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900">{user.name}</h3>
              <p className="text-xs text-gray-500 font-medium">{user.email}</p>
              <span className="bg-gold-500/10 text-gold-700 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-none mt-2.5 border border-gold-500/20">
                Valued Patron
              </span>
            </div>

            {/* Shipping Address Display & Editing */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase text-gold-600 font-bold tracking-wider">Primary Address</span>
                <button
                  id="edit-profile-address"
                  onClick={() => {
                    setEditMode(!editMode);
                    setTempPhone(user.phone || '');
                    setTempAddress(user.address || '');
                  }}
                  className="text-xs text-maroon-600 font-semibold hover:underline uppercase tracking-wider text-[11px]"
                >
                  {editMode ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {editMode ? (
                <div className="space-y-3.5 bg-cream-50 p-4 rounded-none border border-gold-500/15 text-xs">
                  <div>
                    <label className="font-bold text-gray-600 block mb-1">Phone *</label>
                    <input
                      type="tel"
                      value={tempPhone}
                      onChange={(e) => setTempPhone(e.target.value)}
                      className="w-full bg-white border border-gold-500/15 focus:border-maroon-600 rounded-none p-2 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-600 block mb-1">Full Address *</label>
                    <textarea
                      value={tempAddress}
                      onChange={(e) => setTempAddress(e.target.value)}
                      rows={3}
                      className="w-full bg-white border border-gold-500/15 focus:border-maroon-600 rounded-none p-2 focus:outline-none resize-none text-sm"
                    ></textarea>
                  </div>
                  <button
                    onClick={handleSaveAddress}
                    className="w-full bg-maroon-600 hover:bg-maroon-700 text-white font-bold py-2 rounded-none transition-colors text-[10px] uppercase tracking-wider"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="space-y-2 text-xs sm:text-sm text-gray-700 font-light">
                  <p className="flex items-start gap-2">
                    <Phone size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <span>{user.phone || 'No phone added'}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{user.address || 'No saved address'}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Logout button */}
            <button
              id="profile-logout"
              onClick={logoutUser}
              className="w-full border border-gold-500/20 hover:bg-rose-50 text-maroon-600 font-bold py-2.5 px-4 rounded-none text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer uppercase tracking-wider text-[10px]"
            >
              <LogOut size={13} />
              Sign Out of Account
            </button>
          </div>

          {/* Right Column: Order History and Tailoring Inquiries */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Tailoring Inquiries */}
            {inquiries && inquiries.length > 0 && (
              <div className="bg-white rounded-sm p-6 border border-gold-500/15 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-maroon-900 mb-4 flex items-center gap-1.5">
                  <ClipboardList size={16} className="text-gold-600" />
                  Your Stitching Inquiries ({inquiries.length})
                </h3>
                
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div 
                      key={inq.id}
                      className="bg-[#fdfbf7] rounded-none p-4 border border-gold-500/10 flex flex-col sm:flex-row justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-gray-900">{inq.garmentType}</span>
                          <span className="text-[10px] text-gray-400">Ref: {inq.id}</span>
                        </div>
                        <p className="text-gray-600 font-light">Preferred: <strong className="text-maroon-600">{inq.preferredDate}</strong></p>
                        <p className="text-gray-500 text-[11px] max-w-md truncate font-light">Measurements: {inq.measurements}</p>
                      </div>

                      <div className="flex sm:flex-col justify-between items-end sm:text-right">
                        <span className="text-[10px] text-gray-400 font-light">Submitted {inq.createdAt}</span>
                        <span className="bg-amber-50 text-amber-800 font-extrabold px-2.5 py-0.5 rounded-none text-[9px] uppercase tracking-wider border border-amber-200/50">
                          {inq.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Order History */}
            <div className="bg-white rounded-sm p-6 border border-gold-500/15 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-maroon-900 mb-4 flex items-center gap-1.5">
                <ShoppingBag size={16} className="text-gold-600" />
                Your Purchase History ({user.orderHistory.length})
              </h3>

              {user.orderHistory.length === 0 ? (
                <div className="py-12 text-center text-gray-500 space-y-3.5">
                  <ShoppingBag size={30} className="text-cream-200 mx-auto" />
                  <p className="text-xs sm:text-sm font-light">You haven't placed any boutique orders yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {user.orderHistory.map((order) => (
                    <div 
                      key={order.id}
                      className="border border-gold-500/10 rounded-none overflow-hidden divide-y divide-cream-100 shadow-sm"
                    >
                      {/* Order Metadata Row */}
                      <div className="bg-[#fdfbf7] p-4 flex flex-col sm:flex-row justify-between gap-2.5 text-xs">
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 text-gray-500">
                          <div>
                            <span className="block text-[9px] uppercase font-bold text-gray-400">Date Placed</span>
                            <span className="font-semibold text-gray-800">{order.date}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] uppercase font-bold text-gray-400">Total Bill</span>
                            <span className="font-extrabold text-maroon-600">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] uppercase font-bold text-gray-400">Order ID</span>
                            <span className="font-semibold text-gray-700">{order.id}</span>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-start sm:items-end justify-between gap-1">
                          <span className="block text-[9px] uppercase font-bold text-gray-400 hidden sm:inline">Ship Status</span>
                          <span className="bg-emerald-50 text-emerald-800 font-extrabold px-2 py-0.5 rounded-none text-[9px] uppercase tracking-wider border border-emerald-200">
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Items Row */}
                      <div className="p-4 space-y-4 bg-white">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4 text-xs">
                            <div className="w-12 h-12 rounded-none bg-cream-50 overflow-hidden border border-gold-500/10 flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.productName}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 text-left">
                              <h4 className="font-bold text-gray-900 leading-snug line-clamp-1">{item.productName}</h4>
                              <p className="text-gray-500 text-[11px] mt-0.5 font-light">
                                Variant: <strong className="text-gray-700">{item.size}</strong> | Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="font-bold text-gray-900 text-right">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping parameters bottom summary */}
                      <div className="p-4 bg-cream-50/10 text-xs text-gray-500 text-left font-light">
                        <p><strong>Shipping Details:</strong> {order.shippingAddress.name} ({order.shippingAddress.phone}), {order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.pincode} | Paid via <strong>{order.paymentMethod}</strong></p>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
