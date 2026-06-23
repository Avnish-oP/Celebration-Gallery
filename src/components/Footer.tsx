"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // We do not render the global footer on the booking flow screen to keep it focused.
  if (pathname === '/booking') {
    return null;
  }

  return (
    <footer className="w-full rounded-t-[2.5rem] bg-surface-white/60 dark:bg-background-dark/5 backdrop-blur-sm border-t border-muted-pink mt-16 shadow-inner py-12 px-6 sm:px-10">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1200px] mx-auto font-sans">
        <div className="mb-8 md:mb-0 text-center md:text-left">
          <Link 
            href="/"
            className="font-black text-2xl text-primary mb-2 cursor-pointer hover:text-primary-dark transition-colors block"
          >
            Celebration Gallery
          </Link>
          <p className="text-on-surface-variant text-sm max-w-sm font-medium leading-relaxed">
            Delhi NCR's premium destination for high-octane events, maximalist party setups, and vibrant memories.
          </p>
        </div>

        {/* Footer Navigation Links with precise specs */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-8 md:mb-0 font-bold text-sm text-text-dark/80">
          <Link 
            href="/packages"
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Packages
          </Link>

          <Link 
            href="/gallery"
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Gallery
          </Link>

          <Link 
            href="/contact"
            className={`hover:text-primary transition-colors cursor-pointer ${
              pathname === '/contact' ? 'text-primary font-black border-b-2 border-primary' : ''
            }`}
          >
            Contact
          </Link>

          <span className="text-gray-300">|</span>

          <span className="text-on-surface-variant/60 font-medium hover:text-text-dark transition-colors cursor-help">Terms</span>
          <span className="text-on-surface-variant/60 font-medium hover:text-text-dark transition-colors cursor-help">Privacy</span>
        </div>

        <div className="text-center md:text-right font-medium text-xs text-on-surface-variant/60">
          <p>© 2024 Celebration Gallery Delhi NCR.</p>
          <p className="mt-1">High-energy setups delivered to your doorstep.</p>
        </div>
      </div>
    </footer>
  );
}
