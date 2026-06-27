'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const words = ['Chicken', 'Turkey', 'Pork'];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Parallax transforms
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const textY    = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  const scrollToMenu = () => {
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative w-full h-screen min-h-[640px] overflow-hidden flex items-center justify-center"
    >
      {/* Parallax background image */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 scale-110 origin-center"
      >
        <Image
          src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1920&auto=format&fit=crop"
          alt="BBQ Grill with smoke and fire"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Multi-layer dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 via-brand-dark/60 to-brand-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-brand-dark/40" />
      </motion.div>

      {/* Smoke particle effects via CSS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 rounded-full bg-white/5 blur-3xl animate-float"
            style={{
              width: `${120 + i * 60}px`,
              height: `${120 + i * 60}px`,
              left: `${10 + i * 18}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Purple glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-purple/15 rounded-full blur-[80px] pointer-events-none" />

      {/* Main content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="w-12 h-px bg-brand-gold" />
          <span className="font-oswald text-brand-gold text-sm tracking-[0.35em] uppercase">
            Eastern Carolina Style BBQ
          </span>
          <span className="w-12 h-px bg-brand-gold" />
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-2"
        >
          <div className="font-dancing text-white text-5xl sm:text-7xl leading-none drop-shadow-2xl">
            The
          </div>
          <div className="flex items-baseline justify-center gap-3 leading-none">
            <span className="font-dancing text-brand-gold text-7xl sm:text-9xl drop-shadow-2xl" style={{ textShadow: '0 0 60px rgba(201,160,17,0.5)' }}>
              Que
            </span>
            <span className="font-oswald font-700 text-white text-6xl sm:text-8xl tracking-widest drop-shadow-2xl">
              GUY
            </span>
          </div>
          <div className="font-oswald text-white/50 text-sm tracking-[0.5em] uppercase mt-1">
            LLC.
          </div>
        </motion.div>

        {/* Script tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-dancing text-brand-gold2 text-xl sm:text-3xl mb-2 drop-shadow-lg"
        >
          Bringing the Smoke. Bringing the Flavor.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="font-dancing text-white text-xl sm:text-3xl mb-8"
        >
          Bringing the <span className="text-brand-gold font-700 italic" style={{ textShadow: '0 0 30px rgba(201,160,17,0.6)' }}>Carolina</span> to You!
        </motion.div>

        {/* Rotating protein badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className="font-oswald text-white/60 text-sm tracking-widest uppercase">
            Low & Slow. Real Smoke. Real Flavor.
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToContact}
            className="group relative overflow-hidden bg-brand-gold text-brand-dark font-oswald font-700 text-sm tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,160,17,0.6)] hover:scale-105"
          >
            <span className="relative z-10">★ Book Your Event</span>
            <div className="absolute inset-0 bg-brand-gold2 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          </button>

          <button
            onClick={scrollToMenu}
            className="group border border-white/40 hover:border-brand-gold text-white hover:text-brand-gold font-oswald font-500 text-sm tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 backdrop-blur-sm"
          >
            View Our Menu →
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToMenu}
      >
        <span className="font-oswald text-xs text-white/40 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-brand-gold rounded-full" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-black to-transparent pointer-events-none" />
    </section>
  );
}
