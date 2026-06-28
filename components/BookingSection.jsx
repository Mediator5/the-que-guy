'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Family Reunion',
  'Birthday',
  'Graduation',
  'Church Event',
  'Other',
];

const guestRanges = [
  'Under 50',
  '50–100',
  '100–150',
  '150+',
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

const inputClass =
  'w-full bg-brand-black/60 border border-brand-purple/30 focus:border-brand-gold text-white placeholder-white/30 font-inter text-sm px-4 py-3.5 outline-none transition-colors duration-200';

export default function BookingSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    eventType: '', date: '', guests: '', message: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-brand-black py-24 lg:py-36 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(91,13,181,0.12),transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <FadeUp className="text-center mb-16">
          <div className="star-divider justify-center mb-4">
            <span className="font-oswald text-xs tracking-[0.4em] text-brand-gold uppercase">★ Get In Touch ★</span>
          </div>
          <h2 className="font-oswald font-700 text-white text-4xl lg:text-6xl uppercase">
            Book Your <span className="text-brand-gold">Event</span>
          </h2>
          <p className="font-inter text-white/50 text-base mt-4 max-w-xl mx-auto">
            Dates fill up fast. Fill out the form below or call/text us directly to lock in your date.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Form — 3 cols */}
          <FadeUp delay={0.15} className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16 border border-brand-gold/30 bg-brand-gold/5"
              >
                <div className="text-5xl mb-5">🔥</div>
                <h3 className="font-oswald font-700 text-white text-3xl uppercase mb-3">
                  We Got It!
                </h3>
                <p className="font-dancing text-brand-gold2 text-2xl mb-4">
                  Bringing the Smoke to You Soon!
                </p>
                <p className="font-inter text-white/60 text-sm max-w-sm">
                  We&apos;ll reach out within 24 hours to confirm your date and details. Call us at{' '}
                  <a href="tel:6149710711" className="text-brand-gold">614-971-0711</a> for faster booking.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-oswald text-xs text-white/50 tracking-widest uppercase block mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="font-oswald text-xs text-white/50 tracking-widest uppercase block mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="(614) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div>
                  <label className="font-oswald text-xs text-white/50 tracking-widest uppercase block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-oswald text-xs text-white/50 tracking-widest uppercase block mb-1.5">Event Type *</label>
                    <select
                      name="eventType"
                      required
                      value={form.eventType}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="" disabled>Select event type</option>
                      {eventTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-oswald text-xs text-white/50 tracking-widest uppercase block mb-1.5">Guest Count</label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="" disabled>Estimated guests</option>
                      {guestRanges.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4 */}
                <div>
                  <label className="font-oswald text-xs text-white/50 tracking-widest uppercase block mb-1.5">Event Date *</label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={form.date}
                    onChange={handleChange}
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>

                {/* Row 5 */}
                <div>
                  <label className="font-oswald text-xs text-white/50 tracking-widest uppercase block mb-1.5">Message / Special Requests</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your event, dietary needs, or any special requests..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <div className="bg-red-900/40 border border-red-500/40 px-4 py-3 text-red-300 font-inter text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative overflow-hidden bg-brand-gold disabled:opacity-60 disabled:cursor-not-allowed text-brand-dark font-oswald font-700 text-sm tracking-widest uppercase px-8 py-4 mt-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,160,17,0.5)] hover:scale-[1.02]"
                >
                  <span className="relative z-10">
                    {loading ? '⏳ Sending...' : '★ Send Booking Request'}
                  </span>
                  <div className="absolute inset-0 bg-brand-gold2 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                </button>

                <p className="font-inter text-white/30 text-xs text-center">
                  Or call/text us directly: <a href="tel:6149710711" className="text-brand-gold hover:text-brand-gold2">614-971-0711</a>
                </p>
              </form>
            )}
          </FadeUp>

          {/* Contact info — 2 cols */}
          <FadeUp delay={0.3} className="lg:col-span-2 flex flex-col gap-6">

            {/* Book Early Banner */}
            <div className="bg-brand-gold text-brand-dark p-6 text-center">
              <p className="font-oswald font-700 text-2xl uppercase tracking-wide leading-tight">
                Book Early!
              </p>
              <p className="font-dancing text-xl mt-1">Dates Fill Up Fast!</p>
              <p className="font-inter text-brand-dark/70 text-xs mt-2 tracking-wide uppercase">
                Minimum Booking: $500
              </p>
            </div>

            {/* Contact items */}
            {[
              {
                label: 'Call / Text',
                value: '614-971-0711',
                href: 'tel:6149710711',
                icon: '📞',
              },
              {
                label: 'Email',
                value: 'thequeguyllc@gmail.com',
                href: 'mailto:thequeguyllc@gmail.com',
                icon: '✉️',
              },
              {
                label: 'Service Area',
                value: 'Columbus, OH & within 25 miles',
                icon: '📍',
              },
              {
                label: 'Follow Us',
                value: '@thequeguyllc',
                icon: '📱',
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-4 border border-brand-purple/20 bg-brand-dark/40">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-oswald text-brand-gold text-xs tracking-widest uppercase mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="font-oswald text-white text-base hover:text-brand-gold transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-oswald text-white text-base">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://facebook.com/thequeguyllc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-brand-purple/40 hover:border-brand-gold/50 hover:bg-brand-gold/5 py-3 font-oswald text-xs tracking-widest uppercase text-white/70 hover:text-brand-gold transition-all duration-300"
              >
                <span>fb</span> Facebook
              </a>
              <a
                href="https://instagram.com/thequeguyllc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-brand-purple/40 hover:border-brand-gold/50 hover:bg-brand-gold/5 py-3 font-oswald text-xs tracking-widest uppercase text-white/70 hover:text-brand-gold transition-all duration-300"
              >
                <span>ig</span> Instagram
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
