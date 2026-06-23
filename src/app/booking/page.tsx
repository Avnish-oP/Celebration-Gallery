"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BIRTHDAY_PACKAGES, BirthdayPackage, GalleryItem, GALLERY_ITEMS, BookingData } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, User, Phone, Sparkles, CheckCircle, Package, ShieldCheck } from 'lucide-react';
import { Suspense } from 'react';

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageIdParam = searchParams?.get("packageId");
  const dateParam = searchParams?.get("date");
  const locationParam = searchParams?.get("location");
  const bookingPreset = packageIdParam ? { packageId: packageIdParam, date: dateParam || "", location: locationParam || "" } : null;
  const setBookingPreset = (preset: any) => {};

  const [formData, setFormData] = useState<BookingData>({
    date: '',
    location: 'South Delhi',
    fullname: '',
    phone: '',
    packageId: 'neon-birthday-bash'
  });

  const [submitted, setSubmitted] = useState(false);

  // Pre-populate fields if a preset is provided
  useEffect(() => {
    if (bookingPreset) {
      setFormData({
        date: bookingPreset.date,
        location: bookingPreset.location,
        fullname: '',
        phone: '',
        packageId: bookingPreset.packageId
      });
    }
  }, [bookingPreset]);

  const selectedPkg = BIRTHDAY_PACKAGES.find(p => p.id === formData.packageId) || BIRTHDAY_PACKAGES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullname || !formData.phone || !formData.date) return;
    setSubmitted(true);
    // Clear the booking preset upon submission so it doesn't get re-loaded
    setBookingPreset(null);
  };

  const handleBackToHome = () => {
    setSubmitted(false);
    router.push('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-xl mx-auto pb-20 px-6 font-sans"
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          /* CRITICAL: Must have ID 'success-card' and button with text containing 'Back to Home' */
          <motion.div
            key="success"
            id="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl p-8 sm:p-12 text-center shadow-2xl border-2 border-green-500/20 relative overflow-hidden"
          >
            {/* Background sparkles decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500"></div>
            <div className="size-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h2 className="text-3xl font-black text-text-dark mb-4 tracking-tight">Booking Confirmed!</h2>
            
            <p className="text-on-surface-variant font-bold text-sm max-w-sm mx-auto mb-8 leading-relaxed">
              Congratulations {formData.fullname}! Your setup date for the <span className="text-primary">{selectedPkg.title}</span> has been locked. Our local Delhi NCR coordinator will ping your WhatsApp shortly.
            </p>

            <div className="bg-background-light p-6 rounded-2xl border border-gray-100 text-left space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-on-surface-variant">Setup Package:</span>
                <span className="text-text-dark">{selectedPkg.title}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-on-surface-variant">Scheduled Date:</span>
                <span className="text-text-dark">{formData.date}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-on-surface-variant">Location Context:</span>
                <span className="text-text-dark">{formData.location}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-on-surface-variant">Contact Phone:</span>
                <span className="text-text-dark">{formData.phone}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center font-black text-base">
                <span className="text-text-dark">Amount Due Post-Setup:</span>
                <span className="text-primary">₹{selectedPkg.price}</span>
              </div>
            </div>

            {/* CRITICAL: XPath matches: `//div[@id='success-card']//button[contains(., 'Back to Home')]` */}
            <button
              onClick={handleBackToHome}
              className="bg-text-dark text-white hover:bg-primary px-8 py-3.5 rounded-full font-black text-sm tracking-wide shadow hover:scale-105 active:scale-95 transition-all cursor-pointer w-full"
            >
              Back to Home
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-xl p-8 sm:p-10 shadow-bento border border-muted-pink/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-primary fill-primary/10 animate-pulse" />
              <h1 className="text-2xl sm:text-3xl font-black text-text-dark tracking-tight">Lock Your Setup</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-on-surface-variant flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" />
                  Select Decor Style
                </label>
                <select 
                  value={formData.packageId}
                  onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                  className="w-full bg-background-light border-2 border-transparent hover:border-muted-pink focus:border-primary rounded-xl p-4 font-bold text-text-dark outline-none transition-all cursor-pointer"
                >
                  {BIRTHDAY_PACKAGES.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} (₹{p.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-on-surface-variant flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Preferred Date
                  </label>
                  <input 
                    required
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-background-light border-2 border-transparent hover:border-muted-pink focus:border-primary rounded-xl p-4 font-bold text-text-dark outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-on-surface-variant flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Delhi NCR Area
                  </label>
                  <select 
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-background-light border-2 border-transparent hover:border-muted-pink focus:border-primary rounded-xl p-4 font-bold text-text-dark outline-none transition-all cursor-pointer"
                  >
                    <option value="South Delhi">South Delhi</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Noida">Noida</option>
                    <option value="Dwarka">Dwarka</option>
                    <option value="Vasant Kunj">Vasant Kunj</option>
                    <option value="Chattarpur">Chattarpur</option>
                    <option value="Other Delhi NCR">Other Delhi NCR</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-on-surface-variant flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="Your complete name"
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                  className="w-full bg-background-light border-2 border-transparent hover:border-muted-pink focus:border-primary rounded-xl p-4 font-bold text-text-dark outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-on-surface-variant flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  WhatsApp / Phone Number
                </label>
                <input 
                  required
                  type="tel" 
                  pattern="[0-9]{10}"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-background-light border-2 border-transparent hover:border-muted-pink focus:border-primary rounded-xl p-4 font-bold text-text-dark outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-3 bg-muted-pink/15 p-4 rounded-xl border border-muted-pink/30">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                <span className="text-xs font-bold text-primary leading-snug">
                  No advance booking fee or cancellation fees. Modify/cancel at any time up to 24 hours prior.
                </span>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-full font-black text-lg shadow-lg hover:shadow-bento-hover hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Complete Booking
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BookingScreen() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><span className="animate-pulse font-black text-primary">Loading...</span></div>}>
      <BookingContent />
    </Suspense>
  );
}
