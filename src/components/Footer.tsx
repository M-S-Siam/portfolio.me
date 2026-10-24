import React from 'react';
import { ArrowUp, Linkedin, Github, Layers, Globe, Mail, Facebook } from 'lucide-react';
import { motion } from 'motion/react';
import { portfolioConfig } from '../data/portfolioData';
import { MagneticSocialLink } from './MagneticSocialLink';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Notes', href: '#articles' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: portfolioConfig.linkedin,
      icon: <Linkedin className="w-3.5 h-3.5" />,
    },
    {
      name: 'Facebook',
      href: portfolioConfig.facebook,
      icon: <Facebook className="w-3.5 h-3.5" />,
    },
    {
      name: 'GitHub',
      href: portfolioConfig.github,
      icon: <Github className="w-3.5 h-3.5" />,
    },
    {
      name: 'Quantrex App',
      href: portfolioConfig.quantrexUrl,
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      name: 'Portfolio Site',
      href: portfolioConfig.portfolioUrl,
      icon: <Globe className="w-3.5 h-3.5" />,
    },
    {
      name: 'Direct Email',
      href: `mailto:${portfolioConfig.email}`,
      icon: <Mail className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <footer className="w-full bg-[#18181B] text-white pt-16 pb-12 overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 pb-14 border-b border-zinc-800">
          {/* Left: Brand Identity */}
          <div className="max-w-md">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-zinc-950 font-bold text-lg">
                <svg
                  className="w-4 h-4 text-zinc-950 fill-current"
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
                <span className="font-semibold text-xl tracking-tight text-white leading-tight">
                  {portfolioConfig.fullName}
                </span>
                <span className="text-xs text-zinc-400 font-medium tracking-tight mt-0.5">
                  Digital Marketer • Founder &amp; Creator
                </span>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {portfolioConfig.tagline}. Based in Dhaka, Bangladesh · Open to global remote teams.
            </p>
          </div>

          {/* Center Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8" aria-label="Footer Navigation">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href === '#home') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    if (window.location.hash) {
                      history.replaceState(null, '', window.location.pathname);
                    }
                  }
                }}
                whileHover={{ y: -1 }}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Right: Back to Top Button with magnetic hover feel */}
          <div>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-white px-4 py-2.5 rounded-full border border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Lower Row: Social Links with Sophisticated Magnetic Hover & Copyright */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <p>
            © {currentYear} {portfolioConfig.fullName}. All rights reserved.
          </p>

          {/* Enhanced Magnetic Social Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {socialLinks.map((social) => (
              <MagneticSocialLink
                key={social.name}
                name={social.name}
                href={social.href}
                icon={social.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
