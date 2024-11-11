'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
    const [navbarBg, setNavbarBg] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setNavbarBg(window.scrollY > 50);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
  
    return (
      <>
        <nav
          className={`fixed top-0 left-0 w-full z-20 transition-all duration-300 ${
            navbarBg ? "bg-white shadow-lg" : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className={`text-2xl font-bold ${navbarBg ? 'text-gray-800' : 'text-gray-200'}`}>
                  Logo
                </Link>
              </div>
    
              {/* Desktop Links */}
              <div className="hidden md:flex space-x-8">
                <Link href="/" className={`${navbarBg ? 'text-gray-800' : 'text-gray-200'} hover:text-green-500`}>
                  Home
                </Link>
                <Link href="/about" className={`${navbarBg ? 'text-gray-800' : 'text-gray-200'} hover:text-green-500`}>
                  About
                </Link>
                <Link href="/services" className={`${navbarBg ? 'text-gray-800' : 'text-gray-200'} hover:text-green-500`}>
                  Services
                </Link>
                <Link href="/contact" className={`${navbarBg ? 'text-gray-800' : 'text-gray-200'} hover:text-green-500`}>
                  Contact
                </Link>
              </div>
    
              {/* Desktop Login Button */}
              <div className="hidden md:block">
                <button className="text-white bg-slate-500 px-4 py-2 rounded hover:bg-green-600">
                  Login
                </button>
              </div>
    
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button 
                  onClick={toggleMobileMenu}
                  className={`${navbarBg ? 'text-gray-800' : 'text-gray-200'} focus:outline-none`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleMobileMenu}
        />
  
        {/* Mobile Menu Panel */}
        <div 
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-end p-4">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-800 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-4 py-2 space-y-3">
            <Link href="/" className="block text-gray-800 hover:text-green-500 py-2">
              Home
            </Link>
            <Link href="/about" className="block text-gray-800 hover:text-green-500 py-2">
              About
            </Link>
            <Link href="/services" className="block text-gray-800 hover:text-green-500 py-2">
              Services
            </Link>
            <Link href="/contact" className="block text-gray-800 hover:text-green-500 py-2">
              Contact
            </Link>
            <button className="w-full text-white bg-slate-500 px-4 py-2 rounded hover:bg-green-600 mt-4">
              Login
            </button>
          </div>
        </div>
      </>
    );
}