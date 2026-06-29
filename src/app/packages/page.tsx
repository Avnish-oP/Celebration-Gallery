"use client";
import React, { useState, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BIRTHDAY_PACKAGES, BirthdayPackage, PACKAGE_CATEGORIES, PackageCategory } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Sparkles, CheckCircle, Palette, ArrowRight, Wand2, X } from 'lucide-react';
import Image from 'next/image';

// Gradient backgrounds for packages without images
const GRADIENT_CARDS = [
  'from-primary/80 via-[#ff6b8a] to-accent-yellow/70',
  'from-[#6366f1] via-[#8b5cf6] to-primary/60',
  'from-[#0ea5e9] via-[#6366f1] to-primary/80',
  'from-accent-yellow via-[#f59e0b] to-primary/60',
];

function PackagesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category') as PackageCategory | null;

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [activePackage, setActivePackage] = useState<BirthdayPackage | null>(null);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // Update URL without full navigation
    if (value === 'all') {
      window.history.replaceState(null, '', '/packages');
    } else {
      window.history.replaceState(null, '', `/packages?category=${value}`);
    }
  };

  const filteredPackages = useMemo(() => {
    if (selectedCategory === 'all') return BIRTHDAY_PACKAGES;
    return BIRTHDAY_PACKAGES.filter(pkg => pkg.category === selectedCategory);
  }, [selectedCategory]);

  const handleViewDetails = (id: string) => {
    router.push(`/booking?packageId=${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
      className="w-full max-w-[1200px] mx-auto pb-20 font-sans"
    >
      {/* Header Section */}
      <header className="px-6 sm:px-10 py-12 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-text-dark tracking-tighter mb-4">
          Our <span className="text-primary">Packages</span>
        </h1>
        <p className="text-lg sm:text-xl font-bold text-on-surface-variant max-w-2xl leading-relaxed">
          Making birthday magic across Delhi NCR. From intimate soirées to high-energy bashes, we curate the vibes while you make the memories.
        </p>
      </header>

      {/* Category Filter Pill Bar */}
      <section className="px-6 sm:px-10 mb-12">
        <div className="flex flex-col gap-4 bg-white/60 p-6 rounded-2xl border border-muted-pink/30 backdrop-blur-md">
          <span className="text-xs uppercase tracking-widest text-on-surface-variant font-black">Category</span>
          <div className="flex flex-wrap gap-2">
            {PACKAGE_CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-5 py-2.5 rounded-full border text-sm font-black transition-all cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
                    : 'bg-white border-gray-200 text-text-dark hover:border-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Package Cards Grid */}
      <section className="px-6 sm:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {filteredPackages.length > 0 ? (
              <>
                {filteredPackages.map((pkg, index) => {
                  // First card gets featured (large) layout
                  const isFeatured = index === 0;
                  const gradientClass = GRADIENT_CARDS[index % GRADIENT_CARDS.length];

                  if (isFeatured) {
                    return (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        onClick={() => setActivePackage(pkg)}
                        className="md:col-span-8 group relative bg-white rounded-xl overflow-hidden hover-bento shadow-bento flex flex-col justify-end min-h-[450px] border border-muted-pink/20 cursor-pointer"
                      >
                        {/* Image or Gradient background */}
                        {pkg.image ? (
                          <div className="absolute inset-0">
                            <Image 
                              className="object-cover group-hover:scale-105 transition-transform duration-700" 
                              alt={pkg.title}
                              src={pkg.image}
                              fill
                              sizes="(max-width: 768px) 100vw, 66vw"
                            />
                          </div>
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}>
                            {/* Decorative elements */}
                            <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                            <div className="absolute top-1/3 left-1/4 text-white/10 text-[120px] font-black leading-none select-none pointer-events-none">🎈</div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                        <div className="relative p-8 z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                          <div className="flex-1">
                            <h3 className="text-3xl font-black text-white mb-3">{pkg.title}</h3>
                            
                            <div className="flex flex-wrap gap-4">
                              {pkg.inclusions.slice(0, 3).map((item, i) => (
                                <div key={i} className="flex items-center text-white/95 gap-2 font-black text-xs">
                                  <Star className="w-4 h-4 text-accent-yellow fill-accent-yellow" />
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <span className="text-text-dark/40 text-xs font-bold uppercase tracking-wider text-white/60">Price</span>
                            <span className="text-accent-yellow text-3xl font-black leading-none">
                              ₹{pkg.price.toLocaleString('en-IN')}
                            </span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDetails(pkg.id);
                              }}
                              className="bg-primary text-white px-8 py-3 rounded-full font-black text-sm hover:bg-primary-dark transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 duration-150"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      onClick={() => setActivePackage(pkg)}
                      className="md:col-span-4 group bg-white rounded-xl overflow-hidden hover-bento shadow-bento flex flex-col border border-muted-pink/20 cursor-pointer"
                    >
                      {/* Image header or Gradient card header */}
                      {pkg.image ? (
                        <div className="relative h-52 overflow-hidden">
                          <Image 
                            className="object-cover group-hover:scale-105 transition-transform duration-700" 
                            alt={pkg.title}
                            src={pkg.image}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${gradientClass}`}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/15 text-[80px] select-none pointer-events-none">🎈</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-black text-text-dark mb-2">{pkg.title}</h3>
                          <p className="text-on-surface-variant text-sm font-bold leading-relaxed mb-4">{pkg.description}</p>
                          <ul className="space-y-2 mb-6 text-sm font-bold text-on-surface-variant">
                            {pkg.inclusions.map((item, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex items-end justify-between gap-4 mt-2">
                          <div className="flex flex-col">
                            <span className="text-text-dark/40 text-xs font-bold uppercase tracking-wider">Price</span>
                            <span className="text-primary text-2xl font-black leading-none">
                              ₹{pkg.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(pkg.id);
                            }}
                            className="bg-primary text-white hover:bg-primary-dark px-8 py-3 rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </>
            ) : (
              /* Coming Soon state for empty categories */
              <div className="md:col-span-12 text-center py-20">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-muted-pink/20 rounded-full mb-6">
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-3xl font-black text-text-dark mb-3">Coming Soon!</h3>
                <p className="text-on-surface-variant font-bold text-lg max-w-md mx-auto mb-8">
                  We're crafting amazing packages for this category. Meanwhile, build your own custom package!
                </p>
                <button 
                  onClick={() => router.push('/packages/custom')}
                  className="bg-primary text-white px-8 py-3.5 rounded-full font-black text-sm hover:bg-primary-dark transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 duration-150 inline-flex items-center gap-2"
                >
                  Build Custom Package
                  <Wand2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Custom Package CTA Card — always visible when there are packages */}
            {filteredPackages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: filteredPackages.length * 0.1 }}
                onClick={() => router.push('/packages/custom')}
                className="md:col-span-8 group bg-white rounded-xl p-8 sm:p-10 shadow-bento bento-card relative overflow-hidden cursor-pointer min-h-[250px] flex flex-col justify-between border border-muted-pink/20"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                  style={{ backgroundImage: "url('/packages/custom.png')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white/10 p-3 rounded-full group-hover:scale-110 transition-transform">
                      <Wand2 className="w-6 h-6 text-accent-yellow" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-white/70 font-black">Design Your Own</span>
                  </div>
                  
                  <h3 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
                    Build Your <span className="text-accent-yellow">Custom</span> Package
                  </h3>
                  <p className="text-white/80 font-bold text-base max-w-lg leading-relaxed mb-6">
                    Choose your balloons, banners, decorations, and budget. We'll craft a personalized quote just for you.
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-4">
                  <span className="bg-white text-text-dark px-8 py-3.5 rounded-full font-black text-sm shadow-lg group-hover:bg-accent-yellow group-hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                    Start Building
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  <span className="text-white/60 font-bold text-sm">Takes 2 min</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Social Proof Floating Badge / FAB */}
      <div className="fixed bottom-8 right-8 z-40">
        <button 
          onClick={() => router.push('/booking')}
          className="bg-primary text-white p-4 rounded-full shadow-2xl flex items-center gap-3 group hover:scale-105 transition-all duration-300 cursor-pointer border-none"
        >
          <div className="flex -space-x-3">
            <img 
              alt="User" 
              className="w-8 h-8 rounded-full border-2 border-white object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0W18Vym7l1JEXCkbs_tbcTSryZoYuVw7T-QLIdrzMoAmfS7XR7DNMvZltYHLSJDESQmdPDyicO0d3UU7hEgqeh8FzoN59xbTKTN_d3Sf6Obv_IP61JgE_76q6kpjaXShV0xmMGNCYD10J2865q507Y4S98MzzyKuy_euFglQBlHg3oVlquwGRiFrc1mGLx08WD0bt7Ir_ccjPI8c7g1sZEJQdbtzKNA9A_w6MtvGZJXt-GXCoIJx6cgDgrGhtgJ98z-BnwBgjJA"
            />
            <img 
              alt="User" 
              className="w-8 h-8 rounded-full border-2 border-white object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9hCCwinPg9OTEEw_0YwI-3Sjlflxqk4UDxIE5w6fHD9yDAN_o8BXbZAz3JsyOeBb0dlXlXzG_YJ54Szu_hQ9ybzLQMaQHsrv-d1sQ6U7w2GXOkcnc0CBRqQpS9TvL8bMAQrzMvafFNHiRnp1hDGaoPsEKonhX5RFytDtfow7RSp7GsATiMsqw5fA21Dmu89X8ghukqLsFWJ9SSk2LNRg-Yn6pBaXVejI9f1suLjWa7D1-PENj0841u0BEBlXWZE1GlvW0EMjEbw"
            />
            <div className="w-8 h-8 rounded-full border-2 border-white bg-muted-pink text-[10px] flex items-center justify-center text-primary font-black">+42</div>
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-black text-sm text-white">
            Join 500+ celebrations
          </span>
          <span className="text-white text-base">🎉</span>
        </button>
      </div>
      {/* Dynamic Details Modal */}
      <AnimatePresence>
        {activePackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePackage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl border border-muted-pink/20 max-h-[90vh] flex flex-col relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActivePackage(null)}
                className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all cursor-pointer border-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Body (Scrollable) */}
              <div className="overflow-y-auto flex-1">
                {/* Header Image/Gradient */}
                <div className="relative h-64 sm:h-80 w-full">
                  {activePackage.image ? (
                    <Image 
                      src={activePackage.image} 
                      alt={activePackage.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-[#ff6b8a] to-accent-yellow/70 flex items-center justify-center">
                      <span className="text-white/20 text-[100px] select-none">🎈</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="bg-accent-yellow text-text-dark font-black text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow mb-2 inline-block">
                      {activePackage.category}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                      {activePackage.title}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-text-dark/45 font-black mb-2">Description</h4>
                    <p className="text-text-dark/80 font-bold text-sm sm:text-base leading-relaxed">
                      {activePackage.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-text-dark/45 font-black mb-3">What's Included</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {activePackage.inclusions.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 bg-background-light p-3.5 rounded-xl border border-muted-pink/10 font-bold text-xs sm:text-sm text-text-dark">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 sm:p-8 border-t border-gray-100 bg-background-light flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-text-dark/40 text-xs font-bold uppercase tracking-wider">Price</span>
                  <span className="text-primary text-2xl sm:text-3xl font-black leading-none">
                    ₹{activePackage.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setActivePackage(null)}
                    className="px-6 py-3 rounded-full border-2 border-gray-200 text-text-dark font-black text-sm hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      setActivePackage(null);
                      router.push(`/booking?packageId=${activePackage.id}`);
                    }}
                    className="bg-primary text-white hover:bg-primary-dark px-8 py-3 rounded-full font-black text-sm transition-all cursor-pointer shadow-md hover:scale-102 active:scale-95"
                  >
                    Book This Style
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PackagesScreen() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><span className="animate-pulse font-black text-primary">Loading...</span></div>}>
      <PackagesContent />
    </Suspense>
  );
}
