'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const terms = [
  { text: '50% Non-Refundable Deposit required to secure your date', icon: '💳' },
  { text: 'Remaining balance due 7 days prior to the event', icon: '📅' },
  { text: 'Minimum booking: $500', icon: '💰' },
  { text: 'Final headcount due 7 days before your event', icon: '👥' },
  { text: 'We arrive 1.5–2 hours before serving time for full setup', icon: '🕐' },
  { text: 'Cancellations within 7 days are non-refundable', icon: '⚠️' },
  { text: 'Travel fee may apply for events outside 25 miles of Columbus, OH', icon: '📍' },
];

export default function ContractTerms() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="relative bg-brand-dark py-24 overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(91,13,181,0.12),transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: heading */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="star-divider mb-5">
              <span className="font-oswald text-xs tracking-[0.4em] text-brand-gold uppercase">★ Contract Terms ★</span>
            </div>
            <h2 className="font-oswald font-700 text-white text-4xl lg:text-5xl uppercase leading-tight mb-6">
              Transparent &<br />
              <span className="text-brand-gold">Straightforward</span>
            </h2>
            <p className="font-inter text-white/60 text-base leading-relaxed mb-8">
              We believe in clear expectations from day one. Here&apos;s everything you need to know before booking The Que Guy for your event.
            </p>
            <div className="bg-brand-gold/10 border border-brand-gold/30 p-5">
              <p className="font-oswald text-brand-gold text-base tracking-wide uppercase mb-1">📞 Questions?</p>
              <p className="font-inter text-white/70 text-sm leading-relaxed">
                Call or text us at <a href="tel:6149710711" className="text-brand-gold hover:text-brand-gold2 transition-colors font-600">614-971-0711</a> or email <a href="mailto:thequeguyllc@gmail.com" className="text-brand-gold hover:text-brand-gold2 transition-colors font-600">thequeguyllc@gmail.com</a>
              </p>
            </div>
          </motion.div>

          {/* Right: terms list */}
          <div className="flex flex-col gap-3">
            {terms.map((term, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className="flex items-start gap-4 p-4 border border-brand-purple/20 hover:border-brand-gold/30 bg-brand-black/30 transition-colors duration-300 group"
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{term.icon}</span>
                <div className="flex items-start gap-3">
                  <span className="text-brand-gold text-lg flex-shrink-0 mt-0.5">✓</span>
                  <p className="font-inter text-white/75 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                    {term.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
