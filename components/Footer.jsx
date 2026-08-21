'use client';

import { motion } from 'framer-motion';

const quickLinks = [
  { label: 'Home',             href: '#home' },
  { label: 'About Us',         href: '#about' },
  { label: 'Our Menu',         href: '#menu' },
  { label: 'Catering', href: '#catering' },
  { label: 'Events We Serve',  href: '#events' },
  { label: 'Book Your Event',  href: '#contact' },
];

export default function Footer() {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-brand-dark border-t border-brand-purple/20 overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <div>
              <div className="font-dancing text-white text-2xl leading-none mb-0.5">The</div>
              <div className="flex items-baseline gap-2">
                <span className="font-dancing text-brand-gold text-4xl leading-none">Que</span>
                <span className="font-oswald font-700 text-white text-3xl tracking-widest">GUY</span>
              </div>
              <div className="font-oswald text-white/40 text-xs tracking-[0.4em] uppercase mt-0.5">LLC.</div>
            </div>

            <p className="font-inter text-white/50 text-sm leading-relaxed max-w-xs">
              Eastern Carolina Style BBQ — Low &amp; Slow. Real Smoke. Real Flavor. Serving Columbus, OH and surrounding areas.
            </p>

            {/* Stars tagline */}
            <div className="flex items-center gap-2">
              <span className="text-brand-gold text-xs">★★★★★</span>
              <span className="font-dancing text-brand-gold2 text-lg">
                Bringing the Carolina to You!
              </span>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-2">
              <a
                href="https://facebook.com/thequeguyllc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-brand-purple/40 hover:border-brand-gold/60 flex items-center justify-center text-white/60 hover:text-brand-gold transition-all duration-300 font-oswald text-xs font-600"
              >
                f
              </a>
              <a
                href="https://instagram.com/thequeguyllc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-brand-purple/40 hover:border-brand-gold/60 flex items-center justify-center text-white/60 hover:text-brand-gold transition-all duration-300 font-oswald text-xs font-600"
              >
                ig
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-oswald text-brand-gold text-xs tracking-[0.35em] uppercase mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-brand-gold" />
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-inter text-white/50 hover:text-brand-gold text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-brand-gold group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-oswald text-brand-gold text-xs tracking-[0.35em] uppercase mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-brand-gold" />
              Contact Us
            </h4>
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-oswald text-white/30 text-xs tracking-widest uppercase mb-1">Call / Text</p>
                <a href="tel:6149710711" className="font-oswald text-white text-xl hover:text-brand-gold transition-colors tracking-wide">
                  614-971-0711
                </a>
              </div>
              <div>
                <p className="font-oswald text-white/30 text-xs tracking-widest uppercase mb-1">Email</p>
                <a href="mailto:thequeguyllc@gmail.com" className="font-inter text-white/70 text-sm hover:text-brand-gold transition-colors break-all">
                  thequeguyllc@gmail.com
                </a>
              </div>
              <div>
                <p className="font-oswald text-white/30 text-xs tracking-widest uppercase mb-1">Location</p>
                <p className="font-inter text-white/70 text-sm">Columbus, OH</p>
                <p className="font-inter text-white/40 text-xs mt-0.5">Serving within 25 miles</p>
              </div>
              <button
                onClick={() => scrollTo('#contact')}
                className="mt-2 self-start bg-brand-gold hover:bg-brand-gold2 text-brand-dark font-oswald font-600 text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-300 hover:scale-105"
              >
                ★ Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-purple/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-white/30 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} The Que Guy LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="font-oswald text-white/20 text-xs tracking-widest uppercase">
              Eastern Carolina Style BBQ · Columbus, OH
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
