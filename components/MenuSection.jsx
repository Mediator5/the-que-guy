'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const sandwiches = [
  { name: 'Chopped Chicken Sandwich', price: '$6.00' },
  { name: 'Chopped Turkey Sandwich',  price: '$6.00' },
  { name: 'Chopped Pork BBQ Sandwich', price: '$6.00' },
];

const sides = [
  { name: 'Coleslaw', desc: 'Creamy, Vinegar or Mix',  icon: '🥗' },
  { name: 'Mac & Cheese',  desc: 'Southern Style',        icon: '🧀' },
  { name: 'Baked Beans',   desc: 'Slow Cooked',           icon: '🫘' },
  { name: 'Collard Greens', desc: 'Classic Southern',     icon: '🌿' },
  { name: 'Potato Salad',  desc: 'Old School Recipe',     icon: '🥔' },
];

const cateringPackages = [
  { name: 'Basic', priceRange: '$12–$15/person', includes: '1 meat + 2 sides' },
  { name: 'Standard', priceRange: '$16–$20/person', includes: '2 meats + 2 sides' },
  { name: 'Premium', priceRange: '$22–$25/person', includes: '3 meats + 3 sides + setup' },
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

export default function MenuSection() {
  return (
    <section id="menu" className="relative bg-brand-dark py-24 lg:py-36 overflow-hidden">
      {/* Smoke texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(91,13,181,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(91,13,181,0.1),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <FadeUp className="text-center mb-16">
          <div className="star-divider justify-center mb-4">
            <span className="font-oswald text-xs tracking-[0.4em] text-brand-gold uppercase">★ The Menu ★</span>
          </div>
          <h2 className="font-oswald font-700 text-white text-4xl lg:text-6xl uppercase">
            Menu & Pricing
          </h2>
          <p className="font-inter text-white/50 text-base mt-3 max-w-lg mx-auto">
            All meats slow-smoked, hand-chopped, and served with your choice of sides. Available for individual orders or catering.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Sandwiches */}
          <FadeUp delay={0.15}>
            <div className="relative">
              {/* Section image */}
              <div className="relative h-56 mb-8 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=900&auto=format&fit=crop"
                  alt="BBQ Sandwich"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="font-oswald font-700 text-white text-3xl tracking-widest uppercase drop-shadow-lg">
                    ★ Sandwiches ★
                  </span>
                </div>
              </div>

              {/* Sandwich list */}
              <div className="flex flex-col gap-1">
                {sandwiches.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                    className={`flex items-center justify-between py-4 border-b border-white/10 group ${item.note ? 'mt-2' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      {!item.note && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
                      )}
                      <span className={`font-oswald text-base tracking-wide ${item.note ? 'text-brand-gold italic ml-4' : 'text-white group-hover:text-brand-gold transition-colors'}`}>
                        {item.name}
                      </span>
                    </div>
                    <span className={`font-oswald font-600 text-lg ${item.note ? 'text-brand-gold' : 'text-brand-gold'}`}>
                      {item.price}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Note */}
              <p className="font-inter text-white/40 text-xs mt-4 tracking-wide">
                * Coleslaw served on sandwich or on the side — your choice.
              </p>
            </div>
          </FadeUp>

          {/* Sides */}
          <FadeUp delay={0.3}>
            <div className="relative">
              {/* Section image */}
              <div className="relative h-56 mb-8 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=900&auto=format&fit=crop"
                  alt="Southern Sides"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="font-oswald font-700 text-white text-3xl tracking-widest uppercase drop-shadow-lg">
                    ★ Sides ★
                  </span>
                </div>
              </div>

              {/* Sizes pricing */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-brand-purple/20 border border-brand-purple/30 p-4 text-center">
                  <p className="font-oswald text-brand-gold text-xs tracking-widest uppercase mb-1">Small</p>
                  <p className="font-oswald font-700 text-white text-2xl">$35</p>
                  <p className="font-inter text-white/50 text-xs mt-1">Feeds 10–15</p>
                </div>
                <div className="flex-1 bg-brand-gold/10 border border-brand-gold/30 p-4 text-center">
                  <p className="font-oswald text-brand-gold text-xs tracking-widest uppercase mb-1">Large</p>
                  <p className="font-oswald font-700 text-brand-gold text-2xl">$60</p>
                  <p className="font-inter text-white/50 text-xs mt-1">Feeds 20–25</p>
                </div>
              </div>

              {/* Side items */}
              <div className="grid grid-cols-1 gap-0">
                {sides.map((side, i) => (
                  <motion.div
                    key={side.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                    className="flex items-center gap-4 py-3.5 border-b border-white/10 group"
                  >
                    <span className="text-2xl">{side.icon}</span>
                    <div>
                      <p className="font-oswald text-base text-white group-hover:text-brand-gold transition-colors tracking-wide">
                        {side.name}
                      </p>
                      <p className="font-inter text-white/40 text-xs">{side.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Catering Packages */}
        <FadeUp delay={0.5} className="mt-16">
          <div>
            <h3 className="font-oswald text-xs tracking-widest uppercase text-brand-gold mb-6 text-center">Catering Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {cateringPackages.map((pkg) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-brand-dark border border-brand-purple/30 hover:border-brand-gold/50 p-6 text-center transition-all duration-300"
                >
                  <p className="font-oswald font-700 text-white text-xl mb-2">{pkg.name}</p>
                  <p className="font-oswald text-brand-gold text-2xl font-700 mb-3">{pkg.priceRange}</p>
                  <p className="font-inter text-white/60 text-sm">{pkg.includes}</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-brand-gold/10 border border-brand-gold/30 p-6 sm:p-8 text-center">
              <p className="font-dancing text-brand-gold2 text-2xl sm:text-3xl mb-3">
                Ready to Book?
              </p>
              <p className="font-inter text-white/60 text-sm mb-2">
                All packages include meat, buns, sauce, and your choice of sides.
              </p>
              <p className="font-oswald text-white/50 text-xs mb-5 tracking-wide">
                Minimum booking: $500 | 50% deposit required
              </p>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-gold hover:bg-brand-gold2 text-brand-dark font-oswald font-700 text-sm tracking-widest uppercase px-7 py-3 transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,160,17,0.4)] hover:scale-105"
              >
                Book Your Event Now ★
              </button>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
