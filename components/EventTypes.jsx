'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const events = [
  {
    name: 'Weddings',
    icon: '💍',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
    description: 'Make your big day unforgettable with authentic Carolina BBQ.',
  },
  {
    name: 'Corporate Events',
    icon: '🏢',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop',
    description: 'Impress your team and clients with real smoke, real flavor.',
  },
  {
    name: 'Family Reunions',
    icon: '👨‍👩‍👧‍👦',
    image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?q=80&w=600&auto=format&fit=crop',
    description: 'Bring the family together over the best BBQ in Columbus.',
  },
  {
    name: 'Birthdays',
    icon: '🎂',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop',
    description: 'Level up your birthday bash with award-worthy BBQ catering.',
  },
  {
    name: 'Graduations',
    icon: '🎓',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop',
    description: 'Celebrate the milestone with food as epic as the achievement.',
  },
  {
    name: 'Church Events',
    icon: '⛪',
    image: 'https://images.unsplash.com/photo-1438232992991-995b671e4b6c?q=80&w=600&auto=format&fit=crop',
    description: 'Feed the congregation with Southern comfort and real BBQ.',
  },
];

function EventCard({ event, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden cursor-pointer card-hover"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-brand-purple/20" />

        {/* Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/30 text-xl">
          {event.icon}
        </div>
      </div>

      {/* Content */}
      <div className="bg-brand-dark border border-brand-purple/20 group-hover:border-brand-gold/30 transition-colors duration-300 p-5">
        <h3 className="font-oswald font-600 text-white text-lg tracking-wide uppercase mb-2 group-hover:text-brand-gold transition-colors">
          {event.name}
        </h3>
        <p className="font-inter text-white/50 text-sm leading-relaxed">
          {event.description}
        </p>
        <div className="mt-3 flex items-center gap-2 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-oswald tracking-widest uppercase">Book This Event</span>
          <span className="text-xs">→</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventTypes() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section id="events" className="relative bg-[#0D0D0D] py-24 lg:py-36 overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-brand-purple/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="star-divider justify-center mb-4">
            <span className="font-oswald text-xs tracking-[0.4em] text-brand-gold uppercase">★ Perfect For ★</span>
          </div>
          <h2 className="font-oswald font-700 text-white text-4xl lg:text-6xl uppercase">
            Every <span className="text-brand-gold">Occasion</span>
          </h2>
          <p className="font-inter text-white/50 text-base mt-4 max-w-xl mx-auto">
            From intimate birthdays to 150-person corporate gatherings — The Que Guy shows up ready to smoke.
          </p>
        </motion.div>

        {/* Event cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {events.map((event, i) => (
            <EventCard key={event.name} event={event} index={i} />
          ))}
        </div>

        {/* And More banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="font-dancing text-brand-gold2 text-2xl mb-1">And More!</p>
          <p className="font-inter text-white/40 text-sm">
            No event too big or too small. If you&apos;re celebrating, we&apos;re there.
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-5 bg-brand-gold hover:bg-brand-gold2 text-brand-dark font-oswald font-700 text-sm tracking-widest uppercase px-8 py-3.5 transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,160,17,0.4)] hover:scale-105"
          >
            ★ Let Us Cater Your Next Event
          </button>
        </motion.div>
      </div>
    </section>
  );
}
