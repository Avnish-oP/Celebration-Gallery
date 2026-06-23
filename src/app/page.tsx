"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BIRTHDAY_PACKAGES, BirthdayPackage, GalleryItem, GALLERY_ITEMS, BookingData } from '../types';
import { motion } from 'motion/react';
import { Tag, ArrowUpRight, Heart, Sparkles, Star, ArrowRight, Phone } from 'lucide-react';



export default function HomeScreen() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
      className="w-full max-w-[1200px] mx-auto px-4 lg:px-0 font-sans"
    >
      <main className="w-full px-4 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">
          
          {/* Hero Block (Span 8x2 on desktop) */}
          <div className="lg:col-span-8 lg:row-span-2 bg-gradient-to-br from-primary via-[#f85c4c] to-accent-yellow rounded-xl p-8 md:p-12 flex flex-col justify-end relative overflow-hidden shadow-bento min-h-[400px]">
            {/* Decorative background elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-yellow opacity-25 rounded-full blur-2xl"></div>
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight max-w-2xl relative z-10 drop-shadow-md">
              Making Delhi's Parties Pop.
            </h1>
            <p className="text-white/90 text-lg sm:text-xl md:text-2xl mt-4 font-bold max-w-lg relative z-10">
              High-energy, maximalist party setups delivered to your doorstep.
            </p>
          </div>

          {/* Pricing Callout (Span 4x1 on desktop) */}
          <div 
            onClick={() => router.push('/packages')}
            className="bento-card lg:col-span-4 lg:row-span-1 bg-accent-yellow rounded-xl p-8 flex flex-col justify-center items-start shadow-bento relative overflow-hidden cursor-pointer group"
          >
            <div className="bg-white/40 p-3 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Tag className="w-6 h-6 text-text-dark" />
            </div>
            <h3 className="text-text-dark text-xl sm:text-2xl font-black mb-1">Base Packages</h3>
            <div className="flex items-end gap-2">
              <span className="text-text-dark text-4xl sm:text-5xl font-black tracking-tight">₹1,999</span>
              <span className="text-text-dark/70 font-bold mb-1 text-sm">onwards</span>
            </div>
            <ArrowUpRight className="absolute top-8 right-8 text-text-dark/20 w-24 h-24 transform rotate-[-15deg] pointer-events-none group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
          </div>

          {/* Category 1: Romantic Dinners (Span 4x2 on desktop) */}
          <div 
            onClick={() => router.push('/packages')}
            className="bento-card lg:col-span-4 lg:row-span-2 bg-white rounded-xl shadow-bento relative overflow-hidden group block min-h-[300px] cursor-pointer"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXxgi0OQnQXlB4LiLvJ27UkYN0qzQzLYse7wKc2jRMvq3Lo3kUwKaeDzgsWCZ4qct7b30rpiW7yxYZiio7tWDB9CDbfW5n6W6w7PxPAzMrxEFJUYuWtb-Md-psYSLYWfW0u6m-PUJ9hOUK94Or5q-C1d6mIxRmjwGXe0rYnYCwUt9CSqFiVyadE9e6aIgLO7D7C9zeDdORakmmyg1wKXN046T2ri-x2HtPpmpQGUSkiLvlCaUKpGjG7kqoCwStkJWldZk0XlkUcA')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-md rounded-full px-5 py-2.5 inline-flex items-center gap-2 border border-white/40 shadow-sm">
                <span className="text-text-dark font-black text-base">Romantic Dinners</span>
                <Heart className="w-5 h-5 text-primary fill-primary" />
              </div>
            </div>
          </div>

          {/* Category 2: Neon Birthday Bash (Span 4x2 on desktop) */}
          {/* CRITICAL: Must match `//span[text()='Neon Birthday Bash']/ancestor::a` to navigate to Package Deep Dive (`deep_dive`) */}
          <a 
            onClick={(e) => {
              e.preventDefault();
              router.push('/deep-dive?packageId=neon-birthday-bash');
            }}
            href="#neon-birthday-bash"
            className="bento-card lg:col-span-4 lg:row-span-2 bg-white rounded-xl shadow-bento relative overflow-hidden group block min-h-[300px] cursor-pointer"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcprKbdmA1Q_Dqd7VLwEi0x_JSQfC-Hm_lDtPHBWrBqJtsiu_OoCS9aVLeKRNMaC8zDKlWZOuzJtGFsOxLMdWAmu8PG2zSp7j4OK0Qpt_m8OkRZ4vgp39qKADHSd8UV4UHfSRza_fQ3gV72m2b3S9U0X5qOYBtdhxjJLU0Y81sbZwnu6Al9FwMaGjWC5qTCC7FD5z6OPnPZDoYwDjLWLZANdV-3l65zmXBplyeHfAKkheL_XTABIGsT1gD-TnJFqLp3mxEaZLWuQ')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-md rounded-full px-5 py-2.5 inline-flex items-center gap-2 border border-white/40 shadow-sm">
                <span className="text-text-dark font-black text-base">Neon Birthday Bash</span>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
            </div>
          </a>

          {/* Category 3: Baby Showers (Span 4x1 on desktop) */}
          <div 
            onClick={() => router.push('/packages')}
            className="bento-card lg:col-span-4 lg:row-span-1 bg-white rounded-xl shadow-bento relative overflow-hidden group block min-h-[200px] cursor-pointer"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCVjMCZCjm1wdeZF93ZBOhc6czf6435udmZ3yCHIM8jAH-TO8q16X2zkgsdQhqwqkquxyd1lq11quOBNQahkiapdGxeatSU9XyIWSC1hv3MKnZSOemSGzvqMUzlYygyKMmjD0Gre0O7XL7ZR71S7gvOvvajeobCr_JajyQkD8SxaTtPLx7BinSVu58YcQtgvlKOcnsW7MsHTu9CuCJCuVGnSXT6xkx5jq4Pqee03Dlznw-9lvBqB36PQo90g9UP2SiN8-5ae8Kzew')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-md rounded-full px-5 py-2 inline-flex items-center gap-2 border border-white/40 shadow-sm">
                <span className="text-text-dark font-black text-base">Baby Showers</span>
                <span className="text-primary text-xs font-black">🎉</span>
              </div>
            </div>
          </div>

          {/* Trust / Social Proof (Span 8x1 on desktop) */}
          <div className="bento-card lg:col-span-8 lg:row-span-1 bg-white rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between shadow-bento gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex -space-x-4">
                <img 
                  className="w-12 h-12 rounded-full border-2 border-white object-cover" 
                  alt="Customer young Indian woman smiling"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPo-nuCZGKTdBgj16pLUiXRs2F4aneItEbJEFUuG35nQbDDMbJsgztrKGWKGscYL5jj9llIDyltXyhWv0H1Rn8i_u2ENx2U4PbpG_nE2emIiriul4b9tbyPaJaA60lHCD_HDwymy9u-8oqBwjYI93WOuMdKGt_tAr_r3ZyD9-kiDwT957-T-MHXniCLHptN1iyybSCXQXJbArl5XP4EqsCqipSqYUF5c_pBt7lRjAYImhIy4Aa3F6SqiqxVuSvDMOEeCkIU5ehLQ"
                />
                <img 
                  className="w-12 h-12 rounded-full border-2 border-white object-cover" 
                  alt="Customer young Indian man laughing"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuApq8yr3QFkVVk1_BqGBbWTbRLhNwrGylXijQaJ9jiqXV6xzi5JLXEYviGrr_3Oy8k68pKaI6QuyoRwMTsphb9-qrhiegZT0AMfpeOc0W3kyOreNyhdVAEPt1AtMmqWMyiCnYdUsbwZwgA5ITP40zkpjg-85_98sREQZbADt4DACvw7vyrDBgHvIEzSxGW9dyZ0hffdMrCh7nylEikztDvBCNuIyqTU8aecQf40mUggHyvHSvj7AhL2vfBHe_PM3k76NXLM-DrcjA"
                />
                <img 
                  className="w-12 h-12 rounded-full border-2 border-white object-cover" 
                  alt="Customer happy couple"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6uam2wnPydqW_Xqohm6QWNYkm4Md5r1c6f6X2DfW1sMnWPWKLY9GD661WZVaYZBUVP99gbpUwe9qmkuaC6at2Oqj2Y57QBOTdyTAETirq6cLMDWhOGyOhhRgM9WE7bv07BG5TYTSUywzBzHCSc7pdlujpCNKt5a4N20fwR6Jv-nCV3GUtYSBFbiB0r3ARiY0TJoB52oIsqtdZvY0AR7U7FxCfmSnqA0-tbXGOPQKxDr6rgFG4w7ifTZ-7KTDF-7TOQO8NeHSkZA"
                />
                <div className="w-12 h-12 rounded-full border-2 border-white bg-muted-pink flex items-center justify-center text-primary font-black text-sm">+5k</div>
              </div>
              <div className="flex flex-col">
                <div className="flex text-accent-yellow">
                  <Star className="w-5 h-5 fill-accent-yellow text-accent-yellow" />
                  <Star className="w-5 h-5 fill-accent-yellow text-accent-yellow" />
                  <Star className="w-5 h-5 fill-accent-yellow text-accent-yellow" />
                  <Star className="w-5 h-5 fill-accent-yellow text-accent-yellow" />
                  <Star className="w-5 h-5 fill-accent-yellow text-accent-yellow" />
                </div>
                <span className="text-text-dark font-black text-sm">Loved by Delhi NCR</span>
              </div>
            </div>

            {/* CRITICAL: Must be a button matching `//button[contains(text(), 'View Community Gallery')]` */}
            <button 
              onClick={() => router.push('/gallery')}
              className="bg-background-light text-text-dark px-6 py-3.5 rounded-full font-black hover:bg-muted-pink hover:text-primary transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow active:scale-95 duration-150 text-sm"
            >
              View Community Gallery
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </main>

      {/* Floating Action Button (FAB) */}
      <a 
        href="tel:+919876543210"
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center bg-primary text-white h-16 rounded-full shadow-bento-hover fab-pulse fab-container cursor-pointer overflow-hidden group decoration-none"
      >
        <Phone className="w-6 h-6 shrink-0" />
        <span className="fab-text font-black text-base">Call a Decorator</span>
      </a>
    </motion.div>
  );
}
