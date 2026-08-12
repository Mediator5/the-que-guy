'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { value: '500+', label: 'Events Catered' },
  { value: '10+',  label: 'Years of Flavor' },
  { value: '25mi', label: 'Service Radius' },
];

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const imgRef = useRef(null);
  const imgInView = useInView(imgRef, { once: true, margin: '-60px' });

  return (
    <section id="about" className="relative bg-brand-black py-24 lg:py-36 overflow-hidden">
      {/* Background purple glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image side */}
          <motion.div
            ref={imgRef}
            initial={{ opacity: 0, x: -60 }}
            animate={imgInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative h-[480px] lg:h-[580px] overflow-hidden">
              {/* Gold border accent */}
              <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-brand-gold z-10" />
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-brand-gold z-10" />

              <Image
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=900&auto=format&fit=crop"
                alt="Eastern Carolina BBQ"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-brand-gold px-5 py-3">
                <p className="font-oswald font-700 text-brand-dark text-lg tracking-wider uppercase">
                  Low &amp; Slow
                </p>
                <p className="font-oswald text-brand-dark/70 text-xs tracking-widest uppercase">
                  The Carolina Way
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 mt-6 divide-x divide-brand-purple/30">
              {stats.map((s) => (
                <div key={s.label} className="text-center py-5 bg-brand-dark/40 first:rounded-l last:rounded-r border border-brand-purple/20">
                  <p className="font-oswald font-700 text-brand-gold text-2xl lg:text-3xl">{s.value}</p>
                  <p className="font-oswald text-white/60 text-xs tracking-widest uppercase mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Text side */}
          <div className="flex flex-col gap-6">
            <FadeUp delay={0.1}>
              <div className="star-divider mb-2">
                <span className="font-oswald text-xs tracking-[0.4em] text-brand-gold uppercase">★ Our Story ★</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h2 className="font-oswald font-700 text-white text-4xl lg:text-5xl xl:text-6xl leading-tight uppercase">
                Authentic.<br />
                <span className="text-brand-gold">Traditional.</span><br />
                Eastern Carolina.
              </h2>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="font-inter text-white/70 text-lg leading-relaxed">
                Growing up in Eastern North Carolina, I spent my summers working alongside my uncle at our family's BBQ stand in Riverside. While most kids were sleeping in, my mother made sure my brothers, cousins, and I were up at 4:00 a.m. to help prepare for the day ahead. Those early mornings taught us the craft of authentic Eastern North Carolina BBQ — the traditions passed down through generations.
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <p className="font-inter text-white/70 text-lg leading-relaxed">
                We learned that Chopped Que isn't simply a cooking method — it's a cultural staple and a source of community pride. As I grew older, I expanded on those traditions by developing my own recipes for chopped turkey and chicken while honoring the authentic Eastern North Carolina process I learned as a child. Today, The Que Guy LLC brings those traditions to Central Ohio, introducing an authentic Eastern North Carolina BBQ experience to a market where this style remains largely untapped.
              </p>
            </FadeUp>

            <FadeUp delay={0.5}>
              <div className="border-l-4 border-brand-gold pl-5 py-2 my-2">
                <p className="font-dancing text-brand-gold2 text-2xl lg:text-3xl">
                  &ldquo;Slow Smoked. Chopped Right. Served with Carolina Pride.&rdquo;
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.6}>
              <p className="font-inter text-white/70 text-sm leading-relaxed italic border-l-2 border-brand-gold pl-4">
                Our mission is simple: to share the authentic taste of Eastern North Carolina chopped BBQ through quality food, exceptional service, and a commitment to preserving a tradition that has been part of my family for generations.
              </p>
            </FadeUp>

            <FadeUp delay={0.65}>
              <div className="flex flex-wrap gap-3 mt-4">
                {['Wood Smoked', 'Eastern NC Style', 'Family Recipes', 'Columbus, OH'].map((tag) => (
                  <span
                    key={tag}
                    className="font-oswald text-xs tracking-widest uppercase px-3 py-1.5 border border-brand-purple/50 text-brand-purple2 bg-brand-purple/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.7}>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="self-start mt-2 bg-brand-purple hover:bg-brand-purple2 text-white font-oswald font-600 text-sm tracking-widest uppercase px-7 py-3.5 transition-all duration-300 hover:shadow-[0_0_25px_rgba(91,13,181,0.5)] hover:scale-105"
              >
                Book Your Event ★
              </button>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
