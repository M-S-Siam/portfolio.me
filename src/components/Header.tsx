import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioConfig } from '../data/portfolioData';

interface HeaderProps {
  onStartProject: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartProject }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Notes', href: '#articles' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#F7F7F6]/90 backdrop-blur-md py-4 border-b border-zinc-200/60 shadow-xs'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-lg p-1"
          aria-label="Md. Shahariar Siam Portfolio"
        >
          {/* Geometric S Logo Mark matching reference style */}
          <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center text-white font-bold text-lg shadow-xs group-hover:scale-105 transition-transform duration-200">
            <svg
              className="w-4 h-4 text-white fill-current"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 4H9.5C7.01472 4 5 6.01472 5 8.5C5 10.9853 7.01472 13 9.5 13H14.5C16.9853 13 19 15.0147 19 17.5C19 19.9853 16.9853 22 14.5 22H7.5"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg sm:text-xl tracking-tight text-zinc-900 group-hover:text-black transition-colors leading-none">
              {portfolioConfig.brandName}
            </span>
            <span className="text-[10px] text-zinc-400 font-medium tracking-wider uppercase mt-0.5 hidden sm:inline">
              Growth & Creative
            </span>
          </div>
        </motion.a>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.15 }}
              className="text-[15px] font-medium text-zinc-600 hover:text-zinc-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded px-1.5 py-1"
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={onStartProject}
            className="inline-flex items-center justify-center bg-[#18181B] hover:bg-black text-white text-[14px] font-medium px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            Start a project
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-800 hover:text-black rounded-lg hover:bg-zinc-200/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Navigation Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-[73px] bg-[#F7F7F6]/98 backdrop-blur-xl border-b border-zinc-200 shadow-xl px-6 py-8"
          >
            <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-medium text-zinc-800 hover:text-black py-2 border-b border-zinc-100 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                </a>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onStartProject();
                  }}
                  className="w-full flex items-center justify-center bg-[#18181B] text-white py-3.5 rounded-full text-base font-medium shadow-sm hover:bg-black active:scale-98 transition-all cursor-pointer"
                >
                  Start a project
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
