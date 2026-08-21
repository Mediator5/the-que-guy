'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const fullPans = [
  { name: 'Chopped Turkey',  price: '$120' },
  { name: 'Chopped Chicken', price: '$120' },
  { name: 'Chopped Pork BBQ', price: '$100' },
];

const halfPans = [
  { name: 'Chopped Turkey',  price: '$60' },
  { name: 'Chopped Chicken', price: '$60' },
];

const trays = [
  {
    name: 'Small Order Tray',
    price: '$7',
    desc: 'Served with slaw and hushpuppies',
  },
  {
    name: 'Large Order Tray',
    price: '$14',
    desc: 'Served with slaw and hushpuppies',
  },
];

const pints = [
  { name: 'Pint — 16 oz', price: '$10' },
  { name: 'Half Pint — 8 oz', price: '$5' },
];

const chicken = [
  { name: 'Whole Chicken', price: '$14' },
  { name: 'Half Chicken',  price: '$7' },
];

const sides = [
  { name: 'Coleslaw', desc: 'Creamy, Vinegar or Mix',  icon: '🥗' },
  { name: 'Hushpuppies', desc: 'Golden & Fried Fresh',  icon: '🌽' },
  { name: 'Mac & Cheese',  desc: 'Southern Style',        icon: '🧀' },
  { name: 'Baked Beans',   desc: 'Slow Cooked',           icon: '🫘' },
  { name: 'Collard Greens', desc: 'Classic Southern',     icon: '🌿' },
  { name: 'Potato Salad',  desc: 'Old School Recipe',     icon: '🥔' },
];

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* A titled block of priced line items */
function PriceBlock({ title, note, items, highlight = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`p-6 sm:p-7 transition-colors duration-300 ${
        highlight
          ? 'bg-brand-gold/10 border border-brand-gold/40'
          : 'bg-brand-black/40 border border-brand-purple/30 hover:border-brand-gold/40'
      }`}
    >
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h3 className="font-oswald font-700 text-white text-xl sm:text-2xl uppercase tracking-wide">
          {title}
        </h3>
        <span className="text-brand-gold text-sm">★</span>
      </div>
      {note && (
        <p className="font-inter text-white/40 text-xs mb-4 tracking-wide">{note}</p>
      )}

      <div className="flex flex-col mt-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-baseline gap-3 py-3 border-b border-white/10 last:border-b-0 group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-oswald text-base text-white group-hover:text-brand-gold transition-colors tracking-wide">
                {item.name}
              </p>
              {item.desc && (
                <p className="font-inter text-white/40 text-xs mt-0.5">{item.desc}</p>
              )}
            </div>
            <span className="font-oswald font-600 text-brand-gold text-lg flex-shrink-0">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function MenuSection() {
  return (
    <section id="menu" className="relative bg-brand-dark py-24 lg:py-36 overflow-hidden">
      {/* Smoke texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(91,13,181,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(91,13,181,0.1),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <FadeUp className="text-center mb-16">
          <div className="star-divider justify-center mb-4">
            <span className="font-oswald text-xs tracking-[0.4em] text-brand-gold uppercase">★ The Menu ★</span>
          </div>
          <h2 className="font-oswald font-700 text-white text-4xl lg:text-6xl uppercase">
            Menu &amp; Pricing
          </h2>
          <p className="font-inter text-white/50 text-base mt-3 max-w-lg mx-auto">
            All meats slow-smoked over real wood and hand-chopped. Order by the pan, the tray, or the pint.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT — Pans */}
          <FadeUp delay={0.15}>
            {/* Section image */}
            <div className="relative h-56 mb-8 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop"
                alt="Slow-smoked chopped BBQ by the pan"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="font-oswald font-700 text-white text-3xl tracking-widest uppercase drop-shadow-lg">
                  ★ By the Pan ★
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <PriceBlock
                title="Full Pan"
                note="Feeds a crowd — great for parties and family gatherings"
                items={fullPans}
                highlight
              />
              <PriceBlock
                title="Half Pan"
                note="Turkey and chicken only"
                items={halfPans}
                delay={0.1}
              />
            </div>
          </FadeUp>

          {/* RIGHT — Trays, pints & chicken */}
          <FadeUp delay={0.3}>
            {/* Section image */}
            <div className="relative h-56 mb-8 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=900&auto=format&fit=crop"
                alt="Order trays with slaw and hushpuppies"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="font-oswald font-700 text-white text-3xl tracking-widest uppercase drop-shadow-lg">
                  ★ Trays &amp; Pints ★
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <PriceBlock
                title="Order Trays"
                note="Every tray comes with slaw and hushpuppies"
                items={trays}
              />
              <PriceBlock title="Pints" items={pints} delay={0.1} />
              <PriceBlock title="Smoked Chicken" items={chicken} delay={0.2} />
            </div>
          </FadeUp>
        </div>

        {/* Sides */}
        <FadeUp delay={0.4} className="mt-16">
          <h3 className="font-oswald text-xs tracking-[0.35em] uppercase text-brand-gold mb-6 text-center">
            ★ Our Sides ★
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {sides.map((side, i) => (
              <motion.div
                key={side.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.5 }}
                className="flex flex-col items-center text-center gap-1.5 p-4 border border-brand-purple/25 bg-brand-black/30 hover:border-brand-gold/40 transition-colors duration-300 group"
              >
                <span className="text-2xl">{side.icon}</span>
                <p className="font-oswald text-sm text-white group-hover:text-brand-gold transition-colors tracking-wide leading-tight">
                  {side.name}
                </p>
                <p className="font-inter text-white/40 text-[11px] leading-tight">{side.desc}</p>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Catering consultation CTA */}
        <FadeUp delay={0.5} className="mt-14">
          <div className="bg-brand-gold/10 border border-brand-gold/30 p-6 sm:p-8 text-center">
            <p className="font-dancing text-brand-gold2 text-2xl sm:text-3xl mb-3">
              Feeding a Bigger Crowd?
            </p>
            <p className="font-inter text-white/60 text-sm mb-2 max-w-xl mx-auto">
              Catering is built around your event — we&apos;ll walk you through meats, sides, portions
              and setup, then put together a quote that fits your headcount and budget.
            </p>
            <p className="font-oswald text-white/50 text-xs mb-5 tracking-wide uppercase">
              Free consultation for catering options
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-brand-gold hover:bg-brand-gold2 text-brand-dark font-oswald font-700 text-sm tracking-widest uppercase px-7 py-3 transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,160,17,0.4)] hover:scale-105"
            >
              Request a Consultation ★
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
