'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* How a catering consultation works */
const steps = [
  {
    number: '01',
    title: 'Tell Us About Your Event',
    desc: 'Date, location, headcount and the kind of gathering it is — that is all we need to start.',
    icon: '📋',
  },
  {
    number: '02',
    title: 'Build Your Menu',
    desc: 'We walk you through the meats, sides and portions, and recommend what actually feeds your crowd.',
    icon: '🍖',
  },
  {
    number: '03',
    title: 'Get Your Quote',
    desc: 'A clear, itemized price based on your menu — no per-head guesswork, no surprises on event day.',
    icon: '💬',
  },
  {
    number: '04',
    title: 'We Bring the Smoke',
    desc: 'We arrive 1.5–2 hours early, set up, and serve. You get to enjoy your own party.',
    icon: '🔥',
  },
];

/* What every catering job includes */
const included = [
  'Your choice of chopped turkey, chicken or pork',
  'Sides built around your menu and guest count',
  'Buns, sauce and serving utensils',
  'Slaw and hushpuppies with tray orders',
  'Full setup and service on site',
  'Flexible portions — pans, trays or pints',
];

function StepCard({ step, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col gap-3 p-6 bg-brand-dark border border-brand-purple/35 hover:border-brand-gold/50 transition-all duration-300 hover:-translate-y-1.5"
    >
      <span className="absolute top-4 right-5 font-oswald font-700 text-4xl text-brand-purple/40 select-none">
        {step.number}
      </span>
      <span className="text-3xl">{step.icon}</span>
      <h3 className="font-oswald font-700 text-white text-lg uppercase tracking-wide leading-tight">
        {step.title}
      </h3>
      <p className="font-inter text-white/55 text-sm leading-relaxed">{step.desc}</p>
      <div className="mt-1 h-0.5 bg-gradient-to-r from-brand-gold to-transparent scale-x-0 hover:scale-x-100 transition-transform duration-500 origin-left" />
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <div className="star-divider justify-center mb-4">
            <span className="font-oswald text-xs tracking-[0.4em] text-brand-gold uppercase">★ Catering ★</span>
          </div>
          <h2 className="font-oswald font-700 text-white text-4xl lg:text-6xl uppercase leading-tight">
            Feed Your <span className="text-brand-gold">Crowd</span>
          </h2>
          <p className="font-inter text-white/50 text-base mt-4 max-w-2xl mx-auto">
            No cookie-cutter packages. Every event gets a consultation — we build the menu around your
            guest count and your budget, then quote it straight from our pan, tray and pint pricing.
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
          <span className="font-oswald text-brand-gold text-sm tracking-widest uppercase animate-pulse text-center">
            ★ Book Early — Dates Fill Up Fast! ★
          </span>
          <span className="w-16 h-px bg-brand-gold/40" />
        </motion.div>

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* What's included + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-14 items-stretch">

          {/* Included list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 border border-brand-purple/35 bg-brand-dark p-7 sm:p-9"
          >
            <h3 className="font-oswald font-700 text-white text-2xl uppercase tracking-wide mb-5">
              Every Catering Job Includes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-brand-gold text-sm mt-0.5 flex-shrink-0">✓</span>
                  <span className="font-inter text-white/70 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-inter text-white/35 text-xs mt-6 leading-relaxed">
              Pricing follows our published menu — full pans from $100, half pans from $60, order trays
              from $7 with slaw and hushpuppies. Larger events are quoted after your consultation.
            </p>
          </motion.div>

          {/* Consultation CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col justify-center text-center border-2 border-brand-gold bg-brand-gold/10 shadow-[0_0_40px_rgba(201,160,17,0.15)] p-7 sm:p-9"
          >
            <span className="text-4xl mb-3">💬</span>
            <p className="font-oswald text-brand-gold text-xs tracking-[0.35em] uppercase mb-2">
              Free &amp; No Obligation
            </p>
            <h3 className="font-oswald font-700 text-white text-3xl uppercase leading-tight mb-3">
              Catering Consultation
            </h3>
            <p className="font-inter text-white/60 text-sm leading-relaxed mb-6">
              Tell us about your event and we&apos;ll build the menu and the quote with you.
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-brand-gold hover:bg-brand-gold2 text-brand-dark font-oswald font-700 text-sm tracking-widest uppercase py-3.5 transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,160,17,0.4)] hover:scale-[1.02]"
            >
              Start Your Consultation
            </button>
            <p className="font-inter text-white/40 text-xs mt-4">
              Or call / text{' '}
              <a href="tel:6149710711" className="text-brand-gold hover:text-brand-gold2 transition-colors">
                614-971-0711
              </a>
            </p>
          </motion.div>
        </div>

        {/* Booking note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center font-inter text-white/30 text-xs tracking-wide mt-8 max-w-3xl mx-auto leading-relaxed"
        >
          Full-service catered events carry a $500 minimum · 50% deposit required to secure your date ·
          Travel fee may apply outside 25 miles of Columbus, OH
        </motion.p>
      </div>
    </section>
  );
}
