'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const meats = [
  {
    name: 'Chopped Chicken',
    description: 'Seasoned and slow-smoked, then hand-chopped to tender perfection. Lighter in flavor but rich in authentic Eastern Carolina BBQ tradition.',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=800&auto=format&fit=crop',
    tag: '★ Crowd Favorite',
  },
  {
    name: 'Chopped Turkey',
    description: 'Tender and juicy, Carolina-style. A flavorful alternative that captures the essence of Eastern North Carolina smoking traditions.',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=800&auto=format&fit=crop',
    tag: '★ Fan Favorite',
  },
  {
    name: 'Chopped Pork BBQ',
    description: 'The authentic classic — whole shoulder pork, slow-smoked over real wood, hand-chopped to melt-in-your-mouth perfection. Pure Eastern Carolina.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    tag: '★ Signature',
  },
];

function MeatCard({ meat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden card-hover cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
        <Image
          src={meat.image}
          alt={meat.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
        <div className="absolute inset-0 bg-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tag badge */}
        <div className="absolute top-4 left-4 bg-brand-gold px-3 py-1">
          <span className="font-oswald text-brand-dark text-xs tracking-widest uppercase">{meat.tag}</span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-brand-dark border border-brand-purple/20 group-hover:border-brand-gold/40 transition-colors duration-500 p-6">
        <h3 className="font-oswald font-700 text-white text-2xl tracking-wide uppercase mb-3 group-hover:text-brand-gold transition-colors duration-300">
          {meat.name}
        </h3>
        <p className="font-inter text-white/60 text-sm leading-relaxed">
          {meat.description}
        </p>

        {/* Bottom accent line */}
        <div className="mt-5 h-0.5 bg-gradient-to-r from-brand-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </motion.div>
  );
}

export default function Meats() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section className="relative bg-[#0D0D0D] py-24 lg:py-36 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#C9A011 1px, transparent 1px), linear-gradient(90deg, #C9A011 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Purple glow left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="star-divider justify-center mb-4">
            <span className="font-oswald text-xs tracking-[0.4em] text-brand-gold uppercase">★ Our Proteins ★</span>
          </div>
          <h2 className="font-oswald font-700 text-white text-4xl lg:text-6xl uppercase leading-tight">
            Choose Your <span className="text-brand-gold">Que</span>
          </h2>
          <p className="font-inter text-white/50 text-base mt-4 max-w-xl mx-auto">
            All three meats slow-smoked over real wood, chopped fresh to order in the authentic Eastern Carolina style.
          </p>
        </motion.div>

        {/* Meat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {meats.map((meat, i) => (
            <MeatCard key={meat.name} meat={meat} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="font-dancing text-brand-gold2 text-2xl mb-4">Available by the pan, the tray or the pint</p>
          <button
            onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-oswald text-sm tracking-widest uppercase text-white/60 hover:text-brand-gold transition-colors underline underline-offset-4"
          >
            View Menu & Pricing →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
