"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BIRTHDAY_PACKAGES, BirthdayPackage, GalleryItem, GALLERY_ITEMS, BookingData } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Sparkles, Heart, Eye } from 'lucide-react';



export default function GalleryScreen() {
  const router = useRouter();
  const setSelectedPackageId = (id: string) => router.push(`/deep-dive?packageId=${id}`);

  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const locations = ['all', 'South Delhi', 'Gurugram', 'Noida', 'Vasant Kunj', 'Chattarpur', 'Faridabad', 'DLF Cyber City', 'Greater Kailash'];

  const filteredItems = GALLERY_ITEMS.filter(item => {
    return selectedLocation === 'all' || item.location === selectedLocation;
  });

  const handleCardClick = (item: GalleryItem) => {
    if (item.title === 'Neon Birthday Bash') {
      setSelectedPackageId('neon-birthday-bash');
      ;
    } else if (item.title === 'Pastel Dreams Shower') {
      setSelectedPackageId('petite-balloon-arch');
      ;
    } else {
      setSelectedPackageId('floral-fantasy');
      ;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
      className="w-full max-w-[1200px] mx-auto pb-20 font-sans"
    >
      {/* Page Header */}
      <header className="px-6 sm:px-10 py-12 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-text-dark tracking-tighter mb-4">
          Celebration <span className="text-primary">Gallery</span>
        </h1>
        <p className="text-lg sm:text-xl font-bold text-on-surface-variant max-w-2xl leading-relaxed">
          Explore real-life party setups delivered across Delhi NCR. Tap any setup to discover its inclusions and book yours today.
        </p>
      </header>

      {/* Location Filters */}
      <section className="px-6 sm:px-10 mb-10 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 pb-2 min-w-max">
          {locations.map(loc => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`px-5 py-2.5 rounded-full font-black text-sm transition-all cursor-pointer border ${
                selectedLocation === loc
                  ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
                  : 'bg-white border-gray-200 text-text-dark hover:border-primary'
              }`}
            >
              {loc === 'all' ? 'All Locations' : loc}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => {
              const isNeonBash = item.title === 'Neon Birthday Bash';
              
              if (isNeonBash) {
                /* CRITICAL: XPath matching: `//h3[text()='Neon Birthday Bash']/ancestor::div[contains(@class, 'group')]` */
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleCardClick(item)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="group relative cursor-pointer rounded-xl overflow-hidden shadow-bento h-96 border border-muted-pink/25 bento-card"
                  >
                    <div className="absolute inset-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                    </div>

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow border border-white/30">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-black text-text-dark">{item.location}</span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                      <h3 className="text-2xl font-black mb-2 tracking-tight">Neon Birthday Bash</h3>
                      <p className="text-white/80 text-xs font-medium leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-4 text-xs font-black text-accent-yellow">
                        <Eye className="w-4 h-4" />
                        <span>Discover Setup Inclusions</span>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              // Normal Card Rendering
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleCardClick(item)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative cursor-pointer rounded-xl overflow-hidden shadow-bento h-96 border border-muted-pink/25 bento-card"
                >
                  <div className="absolute inset-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                  </div>

                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow border border-white/30">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-black text-text-dark">{item.location}</span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                    <h3 className="text-2xl font-black mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-white/80 text-xs font-medium leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-4 text-xs font-black text-accent-yellow">
                      <Eye className="w-4 h-4" />
                      <span>Discover Setup Inclusions</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>
      </section>

      {/* Quick Quote Promo Section */}
      <section className="mt-20 px-6 sm:px-10">
        <div className="bg-gradient-to-br from-primary to-[#ff6a5c] rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white opacity-15 rounded-full blur-2xl"></div>
          <div>
            <h3 className="text-3xl font-black mb-3">Host a memorable party?</h3>
            <p className="text-white/90 font-bold max-w-lg">
              Let Delhi's premier decorators turn your living room, lawn, or rooftop into a curated visual wonder. Consult for free today.
            </p>
          </div>
          <button
            onClick={() => router.push('/booking')}
            className="bg-white text-primary px-8 py-4 rounded-full font-black text-base shadow hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            Get Free Consultation
          </button>
        </div>
      </section>
    </motion.div>
  );
}
