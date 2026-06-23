"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BIRTHDAY_PACKAGES, BirthdayPackage, GalleryItem, GALLERY_ITEMS, BookingData } from '../../types';
import { motion } from 'motion/react';
import { Calendar, MapPin, Sparkles, Check, Lock, ChevronRight, Info } from 'lucide-react';

import { Suspense } from 'react';

function DeepDiveContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPackageId = searchParams?.get("packageId") || "neon-birthday-bash";

  // Find the package, fallback to Neon Bash if none matches or selected
  const pkg: BirthdayPackage = BIRTHDAY_PACKAGES.find(p => p.id === selectedPackageId) || BIRTHDAY_PACKAGES[0];

  const [date, setDate] = useState('');
  const [location, setLocation] = useState('South Delhi');

  const handleLockMyDate = (e: React.FormEvent) => {
    e.preventDefault();
    
    router.push('/booking');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
      className="w-full max-w-[1200px] mx-auto pb-20 px-6 sm:px-10 font-sans"
    >
      {/* Intro Breadcrumb-like header */}
      <div className="py-6 flex flex-wrap items-center gap-2 text-sm text-on-surface-variant font-bold">
        <button onClick={() => router.push('/')} className="hover:text-primary transition-colors cursor-pointer">Home</button>
        <ChevronRight className="w-4 h-4 text-gray-300" />
        <button onClick={() => router.push('/packages')} className="hover:text-primary transition-colors cursor-pointer">Packages</button>
        <ChevronRight className="w-4 h-4 text-gray-300" />
        <span className="text-text-dark">{pkg.title}</span>
      </div>

      {/* Main Title Banner */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-muted-pink pb-8">
        <div>
          <span className="bg-muted-pink text-primary text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 inline-block">
            Delhi's Favorite Style
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-dark tracking-tighter">
            {pkg.title}
          </h1>
        </div>
        <div className="text-left md:text-right">
          <span className="text-sm font-bold text-on-surface-variant block mb-1">Pricing Starts From</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-primary tracking-tight">₹{pkg.price}</span>
            <span className="text-sm font-bold text-on-surface-variant">All-Inclusive</span>
          </div>
        </div>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Images & Inclusions details (Col-span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          
          {/* Main Visual Image Showcase */}
          <div className="bg-white rounded-xl overflow-hidden shadow-bento h-[400px] sm:h-[480px] relative border border-muted-pink/20">
            <img 
              className="w-full h-full object-cover" 
              alt={pkg.title}
              src={pkg.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-black text-sm text-text-dark">High-Energy Visual Setup</span>
              </div>
              <span className="text-xs font-bold text-on-surface-variant bg-background-light px-3 py-1 rounded-full">Delhi NCR</span>
            </div>
          </div>

          {/* Dynamic Inclusions Checklists */}
          <div className="bg-white rounded-xl p-8 sm:p-10 shadow-bento border border-muted-pink/10">
            <h3 className="text-2xl font-black text-text-dark mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary fill-primary/10 animate-pulse" />
              What's Included in the Curation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pkg.inclusions.map((inc, i) => (
                <div key={i} className="flex gap-3 bg-background-light p-4 rounded-xl items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-green-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-text-dark/90 leading-relaxed">{inc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Reservation Side Card (Col-span 5) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-xl p-8 sm:p-10 shadow-bento sticky top-32 border-2 border-primary/20 hover:border-primary/40 transition-colors duration-300">
            <h3 className="text-2xl font-black text-text-dark mb-6">Check Availability</h3>
            
            <form onSubmit={handleLockMyDate} className="space-y-6">
              
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-on-surface-variant flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Select Date
                </label>
                <input 
                  required
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-background-light border-2 border-transparent hover:border-muted-pink focus:border-primary rounded-xl p-4 font-bold text-text-dark outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-on-surface-variant flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Delivery Location
                </label>
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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

              {/* pricing summary */}
              <div className="bg-background-light rounded-xl p-5 border border-muted-pink/30 space-y-3">
                <div className="flex justify-between font-bold text-sm text-on-surface-variant">
                  <span>Base Decor Cost:</span>
                  <span>₹{pkg.price}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-on-surface-variant">
                  <span>GST & Delivery Setup:</span>
                  <span className="text-green-600 font-black">FREE (PROMO)</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-black text-lg text-text-dark">
                  <span>Total Quotation:</span>
                  <span className="text-primary">₹{pkg.price}</span>
                </div>
              </div>

              {/* CRITICAL: Button with text "Lock my Date" leading to booking screen */}
              <button 
                type="submit"
                className="w-full bg-primary text-white py-4.5 rounded-full font-black text-lg shadow-lg hover:shadow-bento-hover hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <Lock className="w-5 h-5 text-accent-yellow fill-accent-yellow/10" />
                Lock my Date
              </button>

              <div className="flex gap-2 text-[11px] font-bold text-on-surface-variant leading-relaxed text-center justify-center pt-2">
                <Info className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>No advance payment needed today. Pay post-setup!</span>
              </div>
            </form>
          </div>
        </div>

      </div>

      {/* CRITICAL: Secondary Navigation Block matching exact Spec & XPaths */}
      {/* Target Content:
          Element `//div[contains(@class, 'flex flex-wrap gap-2')]//a[contains(text(), 'Home')]`
          Element `//div[contains(@class, 'flex flex-wrap gap-2')]//a[contains(text(), 'Packages')]`
      */}
      <div className="mt-20 p-8 bg-background-light rounded-xl text-center border border-muted-pink/40 max-w-xl mx-auto">
        <h4 className="font-black text-lg text-text-dark mb-2">Still deciding?</h4>
        <p className="text-on-surface-variant text-sm font-bold mb-4">Feel free to browse more packages or explore our dynamic home curation grid.</p>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <a 
            onClick={(e) => {
              e.preventDefault();
              router.push('/');
            }}
            href="#home" 
            className="px-6 py-2 bg-white text-text-dark border border-gray-200 rounded-full font-black text-sm hover:border-primary hover:text-primary transition-all duration-150 cursor-pointer shadow-sm hover:shadow"
          >
            Home
          </a>
          <a 
            onClick={(e) => {
              e.preventDefault();
              router.push('/packages');
            }}
            href="#packages" 
            className="px-6 py-2 bg-white text-text-dark border border-gray-200 rounded-full font-black text-sm hover:border-primary hover:text-primary transition-all duration-150 cursor-pointer shadow-sm hover:shadow"
          >
            Packages
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function DeepDiveScreen() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><span className="animate-pulse font-black text-primary">Loading...</span></div>}>
      <DeepDiveContent />
    </Suspense>
  );
}
