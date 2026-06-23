"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BIRTHDAY_PACKAGES, BirthdayPackage, GalleryItem, GALLERY_ITEMS, BookingData } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Sparkles, CheckCircle } from 'lucide-react';



export default function PackagesScreen() {
  const router = useRouter();
  const setSelectedPackageId = (id: string) => router.push(`/deep-dive?packageId=${id}`);

  const [selectedPrice, setSelectedPrice] = useState<string>('2000-5000');
  const [selectedVibe, setSelectedVibe] = useState<string>('all'); // Set to 'all' or 'Minimalist'

  // Filter packages based on active selection
  const filteredPackages = BIRTHDAY_PACKAGES.filter(pkg => {
    const matchPrice = selectedPrice === 'all' || pkg.priceRange === selectedPrice;
    const matchVibe = selectedVibe === 'all' || pkg.vibe === selectedVibe;
    return matchPrice && matchVibe;
  });

  const handleViewDetails = (id: string) => {
    setSelectedPackageId(id);
    ;
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
          Birthday <span className="text-primary">Celebrations</span>
        </h1>
        <p className="text-lg sm:text-xl font-bold text-on-surface-variant max-w-2xl leading-relaxed">
          Making birthday magic across Delhi NCR. From intimate soirées to high-energy bashes, we curate the vibes while you make the memories.
        </p>
      </header>

      {/* Filters Section */}
      <section className="px-6 sm:px-10 mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-white/60 p-6 rounded-2xl border border-muted-pink/30 backdrop-blur-md">
          {/* Price Filters */}
          <div className="space-y-3 w-full md:w-auto">
            <span className="text-xs uppercase tracking-widest text-on-surface-variant font-black">Price Range</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'All', value: 'all' },
                { label: '< ₹2,000', value: '<2000' },
                { label: '₹2,000 - ₹5,000', value: '2000-5000' },
                { label: '₹5,000+', value: '5000+' }
              ].map(p => (
                <button
                  key={p.value}
                  onClick={() => setSelectedPrice(p.value)}
                  className={`px-5 py-2.5 rounded-full border text-sm font-black transition-all cursor-pointer ${
                    selectedPrice === p.value
                      ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
                      : 'bg-white border-gray-200 text-text-dark hover:border-primary'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Style Filters */}
          <div className="space-y-3 w-full md:w-auto">
            <span className="text-xs uppercase tracking-widest text-on-surface-variant font-black">Vibe & Style</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'All', value: 'all' },
                { label: 'Minimalist', value: 'Minimalist' },
                { label: 'Neon Bash', value: 'Neon Bash' },
                { label: 'Floral Fantasy', value: 'Floral Fantasy' },
                { label: 'Vintage Gold', value: 'Vintage Gold' }
              ].map(v => (
                <button
                  key={v.value}
                  onClick={() => setSelectedVibe(v.value)}
                  className={`px-5 py-2.5 rounded-full border text-sm font-black transition-all cursor-pointer ${
                    selectedVibe === v.value
                      ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
                      : 'bg-white border-gray-200 text-text-dark hover:border-primary'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Main Content */}
      <section className="px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Render individual items manually or in loop, maintaining exact specifications */}
          
          {/* Card 1: Grand Neon Bash (Featured) */}
          <div className="md:col-span-8 group relative bg-white rounded-xl overflow-hidden hover-bento shadow-bento flex flex-col justify-end min-h-[450px] border border-muted-pink/20">
            <div className="absolute inset-0">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="A luxury birthday neon setup"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUuKKKLAI2RdK5K5ZnuJ4sTfmOD9yhnAktM6mJH3KudfV7q6TBFh-6sL9bGsDmfqRt4Emwk53Xut15gjOBCAcQ7b4ZPbjYP_97voEy5WsrLaaKe3g3wk_hu1elcf7oavFYUSUJeNO6_QXjWpRGbrOXeQ04BG8YZdoCZGJj3NeFbN73qlYBzJ5CLOua9Ty_-KIdeDUGWfmR1cGJm2NXB6EOu0ltUL9Xrlgtil0BWi7Ukn3ob3boFm-JcmM_ZkikjljKta-lzPLsLA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            </div>
            
            <div className="absolute top-6 left-6 bg-accent-yellow text-text-dark font-black text-sm px-4 py-2 rounded-full shadow-lg">
              ₹4,999
            </div>

            <div className="relative p-8 z-10">
              <h3 className="text-3xl font-black text-white mb-3">Grand Neon Bash</h3>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-white/95 gap-2 font-black text-xs">
                  <Star className="w-4 h-4 text-accent-yellow fill-accent-yellow" />
                  Custom Neon Name Sign
                </div>
                <div className="flex items-center text-white/95 gap-2 font-black text-xs">
                  <Star className="w-4 h-4 text-accent-yellow fill-accent-yellow" />
                  200+ Balloon Installation
                </div>
                <div className="flex items-center text-white/95 gap-2 font-black text-xs">
                  <Star className="w-4 h-4 text-accent-yellow fill-accent-yellow" />
                  Professional Photographer
                </div>
              </div>

              {/* CRITICAL: XPath matching: `//h3[contains(text(), 'Grand Neon Bash')]/parent::div//button[contains(text(), 'View Details')]` */}
              <div>
                <button 
                  onClick={() => handleViewDetails('neon-birthday-bash')}
                  className="bg-primary text-white px-8 py-3 rounded-full font-black text-sm hover:bg-primary-dark transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 duration-150"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Petite Balloon Arch */}
          <div className="md:col-span-4 group bg-white rounded-xl overflow-hidden hover-bento shadow-bento flex flex-col border border-muted-pink/20">
            <div className="relative h-64 overflow-hidden">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Chic white and pink balloon arch"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyqniP3PwWpKo65hnW4deugbhcMq-pB28vgni1MQkED_EfLWCqFpBKwAoB8B20JRsK8US3Bpzc5mRhCBDuqibL0BzEM0nTlNiN9HYWnL3pyOT0oS43GEVNjWvwphUHVbf9tGyzbsFDCPoSXRdx_qvffVo9vf8bMQBj7f3mS6Jyv7simxqgIUd7fVAIQMualNwAm31iXRoHJWJ72X1AS6m6VFudzGh6cKYvwa_UetLOucZuPrx2rmr_BYqCkqUVdMb_83IRbTeRlw"
              />
              <div className="absolute top-4 left-4 bg-accent-yellow text-text-dark font-black text-sm px-3.5 py-1.5 rounded-full shadow">
                ₹1,999
              </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-text-dark mb-3">Petite Balloon Arch</h3>
                <ul className="space-y-2 mb-6 text-sm font-bold text-on-surface-variant">
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary fill-primary/10" />
                    Single Color Palette
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary fill-primary/10" />
                    2-Hour Setup Time
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary fill-primary/10" />
                    Basic Props Included
                  </li>
                </ul>
              </div>
              
              <button 
                onClick={() => handleViewDetails('petite-balloon-arch')}
                className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-2.5 rounded-full font-black text-sm hover:scale-102 active:scale-95 transition-all cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>

          {/* Card 3: Floral Fantasy */}
          <div className="md:col-span-4 group bg-white rounded-xl overflow-hidden hover-bento shadow-bento flex flex-col border border-muted-pink/20">
            <div className="relative h-64 overflow-hidden">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Floral birthday ring setup"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdg87QW75L7sqXj8AL2MSgVhPXqehyiDWwef5IlYAGrUiDTLcrMEVnhyGuYuZBbw51roWn2rXUtdZrnfUvLx6Q5txyXkozVrPkGSTw9ss_lqnziK_CK8MpVqGsoisuOczGJM-X8DVugIspK5pJMCfx1edkhCUhv829zJq2OQXkG1FsUcKp9lmpbb-ssm4V-SsbShLc4Wb9fajvi9AowpZW6gDqGW2JttHot3R4RyCRzisyPMuSsvDrWInf7V3_wG38mb9mFcs_IA"
              />
              <div className="absolute top-4 left-4 bg-accent-yellow text-text-dark font-black text-sm px-3.5 py-1.5 rounded-full shadow">
                ₹3,499
              </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-text-dark mb-3">Floral Fantasy</h3>
                <ul className="space-y-2 mb-6 text-sm font-bold text-on-surface-variant">
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary fill-primary/10" />
                    Fresh Exotic Flowers
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary fill-primary/10" />
                    Golden Circle Frame
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary fill-primary/10" />
                    Personalized Greeting
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => handleViewDetails('floral-fantasy')}
                className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-2.5 rounded-full font-black text-sm hover:scale-102 active:scale-95 transition-all cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>

          {/* Card 4: The Retro Disco */}
          <div className="md:col-span-8 group bg-white rounded-xl overflow-hidden hover-bento shadow-bento flex flex-col md:flex-row border border-muted-pink/20">
            <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Silver disco balls decor"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7IWePoEpl9vrgkaah5Qix38NC0Ag6yEnSWxbnbRy1Q5mLQvKtERpQi54EWDkoQT2LDgcBJSIvpvm1VpcFG-9D3aEYQT6hh_W16mcUuqS07SvAOGjWvaTEym7rpwtD6Dvuj882XJX9P4tfPt1ROiuDYSI4hR5SM5s-5XpJyAYnIt6n1JXFdrzjpsu7xExQ1xlu5qWHYD21FS7TDcl7xecBxiYPst7whAe76CWfnzRya7zI4HTiLOjOzHil7ndDhsk2MKRLxk4Nwg"
              />
              <div className="absolute top-4 left-4 bg-accent-yellow text-text-dark font-black text-sm px-3.5 py-1.5 rounded-full shadow">
                ₹2,999
              </div>
            </div>
            
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl font-black text-text-dark mb-3">The Retro Disco</h3>
              <p className="text-on-surface-variant text-sm font-bold leading-relaxed mb-6">
                Bring the 70s back with our shimmering disco ball installation and iridescent backdrops. Perfect for the dance floor enthusiasts.
              </p>
              
              <div className="space-y-2 mb-8 font-black text-xs text-primary">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary fill-primary/10" />
                  10+ Disco Balls Setup
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary fill-primary/10" />
                  Smoke Machine Included
                </div>
              </div>

              <button 
                onClick={() => handleViewDetails('retro-disco')}
                className="bg-text-dark text-white px-8 py-3.5 rounded-full font-black text-sm hover:bg-primary hover:scale-105 active:scale-95 transition-all cursor-pointer self-start"
              >
                View Details
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Social Proof Floating Badges / FAB */}
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
    </motion.div>
  );
}
