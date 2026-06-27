'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const packages = [
  {
    tier: 'Basic',
    people: '50 People',
    meats: 'Choice of 1 Meat',
    price: '$800',
    perPerson: '$16/person',
    color: 'purple',
    features: [
      'Choice of 1 Protein',
      'Buns & Sauce Included',
      '2 Sides (Coleslaw + 1 More)',
      'Serving Utensils',
      'Minimum 50 Guests',
    ],
    popular: false,
  },
  {
    tier: 'Standard',
    people: '100 People',
    meats: 'Choice of 2 Meats',
    price: '$1,500',
    perPerson: '$15/person',
    color: 'gold',
    features: [
      'Choice of 2 Proteins',
      'Buns & Sauce Included',
      '2 Sides (Coleslaw + 1 More)',
      'Serving Utensils',
      'Setup & Service',
    ],
    popular: true,
  },
  {
    tier: 'Premium',
    people: '150 People',
    meats: 'Choice of 2–3 Meats',
    price: '$2,200',
    perPerson: '~$14.67/person',
    color: 'purple',
    features: [
      'Choice of 2–3 Proteins',
      'Buns & Sauce Included',
      '2 Sides (Coleslaw + 1 More)',
      'Serving Utensils',
      'Full Setup & Service',
    ],
    popular: false,
  },
];

function PackageCard({ pkg, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isGold = pkg.color === 'gold';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
        isGold
          ? 'border-2 border-brand-gold shadow-[0_0_40px_rgba(201,160,17,0.2)]'
          : 'border border-brand-purple/40'
      }`}
    >
      {/* Popular badge */}
      {pkg.popular && (
        <div className="absolute top-0 left-0 right-0 bg-brand-gold text-brand-dark text-center py-1.5">
          <span className="font-oswald font-700 text-xs tracking-widest uppercase">★ Most Popular ★</span>
        </div>
      )}

      {/* Header */}
      <div className={`px-6 pt-${pkg.popular ? '10' : '6'} pb-6 ${isGold ? 'bg-brand-gold/10' : 'bg-brand-dark'}`}>
        <p className={`font-oswald text-xs tracking-[0.35em] uppercase mb-2 ${isGold ? 'text-brand-gold' : 'text-brand-purple2'}`}>
          {pkg.tier} Package
        </p>
        <h3 className="font-oswald font-700 text-white text-3xl uppercase mb-1">{pkg.people}</h3>
        <p className="font-inter text-white/50 text-sm">{pkg.meats}</p>
      </div>

      {/* Price */}
      <div className={`px-6 py-6 ${isGold ? 'bg-brand-gold/5' : 'bg-brand-dark/50'} border-t border-b ${isGold ? 'border-brand-gold/20' : 'border-brand-purple/20'}`}>
        <div className="flex items-end gap-2">
          <span className={`font-oswald font-700 text-5xl ${isGold ? 'text-brand-gold' : 'text-white'}`}>
            {pkg.price}
          </span>
        </div>
        <p className="font-inter text-white/40 text-xs mt-1 tracking-wide">{pkg.perPerson}</p>
      </div>

      {/* Features */}
      <div className="flex-1 px-6 py-6 bg-brand-dark flex flex-col gap-3">
        {pkg.features.map((f) => (
          <div key={f} className="flex items-start gap-3">
            <span className="text-brand-gold text-sm mt-0.5 flex-shrink-0">✓</span>
            <span className="font-inter text-white/70 text-sm leading-tight">{f}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className={`px-6 pb-6 bg-brand-dark`}>
        <button
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          className={`w-full font-oswald font-600 text-sm tracking-widest uppercase py-3.5 transition-all duration-300 hover:scale-[1.02] ${
            isGold
              ? 'bg-brand-gold text-brand-dark hover:bg-brand-gold2 hover:shadow-[0_0_20px_rgba(201,160,17,0.4)]'
              : 'bg-brand-purple text-white hover:bg-brand-purple2 hover:shadow-[0_0_20px_rgba(91,13,181,0.4)]'
          }`}
        >
          Book This Package
        </button>
      </div>
    </motion.div>
  );
}

export default function CateringPackages() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section id="catering" className="relative bg-brand-black py-24 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(91,13,181,0.08),transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <div className="star-divider justify-center mb-4">
            <span className="font-oswald text-xs tracking-[0.4em] text-brand-gold uppercase">★ Catering Packages ★</span>
          </div>
          <h2 className="font-oswald font-700 text-white text-4xl lg:text-6xl uppercase leading-tight">
            Feed Your <span className="text-brand-gold">Crowd</span>
          </h2>
          <p className="font-inter text-white/50 text-base mt-4 max-w-2xl mx-auto">
            Every package includes meat, buns, sauce, and 2 sides — coleslaw is always counted as one of the sides. We arrive 1.5–2 hours early to set up.
          </p>
        </motion.div>

        {/* BOOK EARLY banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-14"
        >
          <span className="w-16 h-px bg-brand-gold/40" />
          <span className="font-oswald text-brand-gold text-sm tracking-widest uppercase animate-pulse">
            ★ Book Early — Dates Fill Up Fast! ★
          </span>
          <span className="w-16 h-px bg-brand-gold/40" />
        </motion.div>

        {/* Package cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.tier} pkg={pkg} index={i} />
          ))}
        </div>

        {/* Custom package CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 border border-brand-gold/30 bg-brand-gold/5 px-8 py-5">
            <span className="text-brand-gold text-2xl">💬</span>
            <div className="text-left">
              <p className="font-oswald text-white font-600 text-base tracking-wide">Need a Custom Package?</p>
              <p className="font-inter text-white/50 text-sm">Have different headcount or special requests? Let&apos;s talk!</p>
            </div>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="ml-4 bg-brand-gold hover:bg-brand-gold2 text-brand-dark font-oswald font-600 text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-300 whitespace-nowrap hover:scale-105"
            >
              Let&apos;s Talk →
            </button>
          </div>
        </motion.div>

        {/* Minimum booking note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center font-inter text-white/30 text-xs tracking-wide mt-6"
        >
          Minimum booking: $500 · 50% deposit required to secure your date · Travel fee may apply outside 25 miles of Columbus, OH
        </motion.p>
      </div>
    </section>
  );
}
