"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BIRTHDAY_PACKAGES, BirthdayPackage, GalleryItem, GALLERY_ITEMS, BookingData } from '../../types';
import { motion } from 'motion/react';
import { Sparkles, Phone, MapPin, Camera, Video, Zap } from 'lucide-react';



import { submitContactForm } from '../actions/contact';

export default function ContactScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    setLoading(true);
    setErrorMsg('');
    
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('message', formData.message);

    const result = await submitContactForm(null, formDataObj);
    
    setLoading(false);
    
    if (result.success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    } else {
      setErrorMsg(result.error || 'Something went wrong');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
      className="w-full max-w-[1200px] mx-auto pt-8 pb-12 px-6 sm:px-10 font-sans"
    >
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-text-dark leading-none tracking-tighter">
              Let's Make <br />
              <span className="bg-gradient-to-r from-primary to-accent-yellow bg-clip-text text-transparent">Magic</span> Together
            </h1>
          </div>
          <div className="pb-2">
            <p className="text-lg sm:text-xl font-bold text-on-surface-variant max-w-xs leading-relaxed">
              Delhi NCR's premium event curation team at your service.
            </p>
          </div>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Form Block (Left - Main) */}
        <div className="lg:col-span-8 bg-white rounded-xl p-8 sm:p-12 shadow-bento bento-card relative">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <Sparkles className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black text-text-dark mb-2">Magic Inbound!</h3>
              <p className="text-on-surface-variant text-base font-medium max-w-sm">
                Thank you, {formData.name}! Our curation specialists will get in touch via WhatsApp and email within the hour.
              </p>
            </div>
          ) : (
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-on-surface-variant px-1">Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-background-light border-2 border-transparent hover:border-muted-pink focus:border-primary rounded-xl p-4 font-bold text-text-dark outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-on-surface-variant px-1">Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-background-light border-2 border-transparent hover:border-muted-pink focus:border-primary rounded-xl p-4 font-bold text-text-dark outline-none transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-on-surface-variant px-1">Tell us about your event</label>
                <textarea 
                  rows={4} 
                  placeholder="Date, venue, type of celebration..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-background-light border-2 border-transparent hover:border-muted-pink focus:border-primary rounded-xl p-4 font-bold text-text-dark outline-none transition-all resize-none"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-[#ff8c00] text-white px-10 py-4.5 rounded-full font-black text-lg shadow-lg hover:shadow-bento-hover hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                Send Magic
                <Sparkles className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>

        {/* Side Bento Blocks */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Quick Info Block (Phone) */}
          <a 
            href="tel:+919876543210"
            className="bg-accent-yellow rounded-xl p-8 bento-card shadow-bento flex flex-col justify-center items-start relative group cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/40 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-text-dark" />
              </div>
              <span className="font-black text-sm uppercase tracking-widest text-text-dark/70">Call Now</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-text-dark mb-2 tracking-tight group-hover:text-primary transition-colors">
              +91 98765 43210
            </h3>
            <p className="font-bold text-sm text-text-dark/60">Mon - Sat, 10AM - 8PM</p>
          </a>

          {/* Studio Address Block */}
          <div className="bg-white rounded-xl overflow-hidden bento-card shadow-bento border border-muted-pink/30">
            <div className="h-48 w-full bg-muted-pink/10 relative">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQDM1JyWsCUfpgb1bUMSnxi_REBzVfU1Yhg413Ud59HAKt5o59zl7lchmWvfmSiflGs5Vq6XUPaHWxnZK6NyUZ1hCT53AkI3u-7FRxy3AKnvFcKOoeaWUDxSwxeofbFi95m29S9-02panxYIq7lZplbWeSrSTPT92zgi5h8eGPAvYXX8oGpXk8WT-mN8rtN971YAmTEyD0K_wFUDrUaa4EZuIuyOv3dr1-XVsirERHEILby1x-1tIrPGBzrdAmT-kA9Nma2juQkg')` }}
              ></div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-muted-pink/30 shadow-sm">
                <MapPin className="w-4 h-4 text-primary fill-primary/10" />
                <span className="font-black text-xs text-text-dark">New Delhi</span>
              </div>
            </div>
            <div className="p-8">
              <h4 className="font-black text-sm uppercase tracking-wider text-primary mb-2">Our Studio</h4>
              <p className="font-bold text-sm text-on-surface-variant leading-relaxed">
                Plot 14, E-Block Market,<br />
                South Extension II, New Delhi - 110049
              </p>
            </div>
          </div>

          {/* Social Pulse Block */}
          <div className="bg-primary text-white rounded-xl p-8 bento-card shadow-bento flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-start z-10">
              <h4 className="text-2xl font-black tracking-tight">Follow the vibe</h4>
              <Sparkles className="w-8 h-8 text-accent-yellow fill-accent-yellow" />
            </div>
            <div className="flex gap-4 mt-8 z-10">
              <a href="#instagram" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer shadow-sm">
                <Camera className="w-5 h-5 text-white" />
              </a>
              <a href="#youtube" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer shadow-sm">
                <Video className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Social Proof Bar */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60">
        <span className="font-black text-xs uppercase tracking-widest text-on-surface-variant/80">Trusted by:</span>
        <div className="flex flex-wrap items-center justify-center gap-8 font-black text-base text-on-surface-variant/50">
          <span>DELHI WEDDING CO</span>
          <span>•</span>
          <span>LUXE EVENTS</span>
          <span>•</span>
          <span>NCR VIBES</span>
        </div>
      </div>

      {/* Instant Quote FAB */}
      <button 
        onClick={() => router.push('/booking')}
        className="fixed bottom-8 right-8 bg-primary text-white p-4.5 rounded-full shadow-2xl flex items-center gap-2 group hover:pr-6 transition-all duration-300 z-40 fab-pulse cursor-pointer border-none"
      >
        <Zap className="w-6 h-6 text-accent-yellow fill-accent-yellow" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-300 font-black text-base whitespace-nowrap">
          Instant Quote
        </span>
      </button>
    </motion.div>
  );
}
