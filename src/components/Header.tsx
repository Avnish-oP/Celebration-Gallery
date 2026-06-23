"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, ArrowLeft } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // If we are in the Booking screen, we render the specialized back header as per the spec.
  if (pathname === '/booking') {
    return (
      <header className="w-full flex items-center justify-between whitespace-nowrap px-4 sm:px-10 py-4 mb-4 max-w-md mx-auto">
        <Link 
          href="/"
          className="flex items-center gap-4 text-text-dark hover:text-primary transition-colors cursor-pointer group"
        >
          <div className="size-6 flex items-center justify-center bg-background-light rounded-full group-hover:bg-muted-pink transition-colors">
            <ArrowLeft className="w-4 h-4 text-text-dark" />
          </div>
          <span className="text-text-dark text-lg font-bold leading-tight tracking-[-0.015em]">Back</span>
        </Link>
      </header>
    );
  }

  return (
    <header className="px-4 lg:px-10 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-muted-pink px-6 lg:px-10 py-4 bg-white/50 backdrop-blur-md rounded-full sticky top-4 z-50 shadow-sm border">
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center gap-3 text-text-dark cursor-pointer group"
          >
            <div className="size-6 text-primary transition-transform group-hover:scale-110">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-text-dark text-lg sm:text-xl font-black leading-tight tracking-[-0.015em]">
              Celebration Gallery
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-8 font-bold text-sm">
              <Link 
                href="/packages"
                className={`text-text-dark text-base font-bold leading-normal hover:text-primary transition-colors cursor-pointer ${
                  pathname === '/packages' ? 'text-primary border-b-2 border-primary pb-0.5' : ''
                }`}
              >
                Packages
              </Link>

              <Link 
                href="/gallery"
                className={`text-text-dark text-base font-bold leading-normal hover:text-primary transition-colors cursor-pointer ${
                  pathname === '/gallery' ? 'text-primary border-b-2 border-primary pb-0.5' : ''
                }`}
              >
                Gallery
              </Link>

              <Link 
                href="/contact"
                className={`text-text-dark text-base font-bold leading-normal hover:text-primary transition-colors cursor-pointer ${
                  pathname === '/contact' ? 'text-primary border-b-2 border-primary pb-0.5' : ''
                }`}
              >
                Contact
              </Link>

              <Link 
                href="/booking"
                className="bg-text-dark text-white px-6 py-2.5 rounded-full font-bold hover:bg-primary transition-colors cursor-pointer shadow-md hover:scale-105 transform active:scale-95 duration-200"
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-text-dark p-1 hover:text-primary transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 mx-4 bg-white/95 backdrop-blur-md border border-muted-pink rounded-2xl p-6 shadow-lg z-40 flex flex-col gap-4 animate-fadeIn">
            <Link 
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-left text-lg font-bold py-2 border-b border-gray-100 ${
                pathname === '/' ? 'text-primary' : 'text-text-dark'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/packages"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-left text-lg font-bold py-2 border-b border-gray-100 ${
                pathname === '/packages' ? 'text-primary' : 'text-text-dark'
              }`}
            >
              Packages
            </Link>
            <Link 
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-left text-lg font-bold py-2 border-b border-gray-100 ${
                pathname === '/gallery' ? 'text-primary' : 'text-text-dark'
              }`}
            >
              Gallery
            </Link>
            <Link 
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-left text-lg font-bold py-2 border-b border-gray-100 ${
                pathname === '/contact' ? 'text-primary' : 'text-text-dark'
              }`}
            >
              Contact
            </Link>
            <Link 
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-primary text-white text-center py-3.5 rounded-full font-bold shadow-md active:scale-95 transition-transform"
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
