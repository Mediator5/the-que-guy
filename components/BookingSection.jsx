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

const orderTypes = [
  { id: 'full-pan',   label: 'Full Pan',            price: 'Turkey $120 · Chicken $120 · Pork $100' },
  { id: 'half-pan',   label: 'Half Pan',            price: 'Turkey $60 · Chicken $60' },
  { id: 'trays',      label: 'Order Trays',         price: 'Small $7 · Large $14 — with slaw & hushpuppies' },
  { id: 'pints',      label: 'Pints',               price: '16 oz $10 · Half pint $5' },
  { id: 'chicken',    label: 'Smoked Chicken',      price: 'Whole $14 · Half $7' },
  { id: 'consult',    label: 'Catering Consultation', price: 'Not sure yet — let’s build a menu together' },
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
    // Client Information
    name: '', phone: '', email: '',
    // Event Details
    eventType: '', eventDate: '', eventTime: '', eventLocation: '', guests: '',
    // What they want to order
    orderTypes: [],
    // Menu Selection
    meats: [], sides: [],
    // Extra notes
    message: '',
    // Terms
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const toggleInList = (key, value) =>
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.orderTypes.length === 0) {
      setError('Please choose at least one order type.');
      return;
    }
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
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* CLIENT INFORMATION */}
                <div className="border-t border-brand-gold/20 pt-4">
                  <h3 className="font-oswald text-brand-gold text-xs tracking-widest uppercase mb-4">Client Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-oswald text-xs text-white/50 tracking-widest uppercase block mb-1.5">Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="font-oswald text-xs text-white/50 tracking-widest uppercase block mb-1.5">Phone *</label>
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
                  <div className="mt-4">
                    <label className="font-oswald text-xs text-white/50 tracking-widest uppercase block mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* EVENT DETAILS */}
                <div className="border-t border-brand-gold/20 pt-4">
                  <h3 className="font-oswald text-brand-gold text-xs tracking-widest uppercase mb-4">Event Details</h3>
                  <div className="mb-4">
                    <label className="font-oswald text-xs text-white/50 tracking-widest uppercase block mb-1.5">Event Type *</label>
                    <select
                      name="eventType"
                      required
                      value={form.eventType}
                      onChange={handleChange}
                      className={`${inputClass} [color-scheme:dark]`}
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-oswald text-xs text-white/50 tracking-widest uppercase block mb-1.5">Event Date *</label>
                      <input
                        type="date"
                        name="eventDate"
                        required
                        value={form.eventDate}
                        onChange={handleChange}
                        className={`${inputClass} [color-scheme:dark]`}
                      />
                    </div>
                    <div>
                      <label className="font-oswald text-xs text-white/50 tracking-widest uppercase block mb-1.5">Event Time *</label>
                      <input
                        type="time"
                        name="eventTime"
                        required
                        value={form.eventTime}
                        onChange={handleChange}
                        className={`${inputClass} [color-scheme:dark]`}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="font-oswald text-xs text-white/50 tracking-widest uppercase block mb-1.5">Event Location *</label>
                    <input
                      type="text"
                      name="eventLocation"
                      required
                      placeholder="Event Address"
                      value={form.eventLocation}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="font-oswald text-xs text-white/50 tracking-widest uppercase block mb-1.5">Number of Guests *</label>
                    <input
                      type="number"
                      name="guests"
                      required
                      min="1"
                      placeholder="Expected guest count"
                      value={form.guests}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* ORDER TYPE */}
                <div className="border-t border-brand-gold/20 pt-4">
                  <h3 className="font-oswald text-brand-gold text-xs tracking-widest uppercase mb-1">What Are You Ordering? *</h3>
                  <p className="font-inter text-white/40 text-xs mb-4">Choose everything that applies — we&apos;ll confirm quantities with you.</p>
                  <div className="space-y-3">
                    {orderTypes.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                          form.orderTypes.includes(opt.label)
                            ? 'border-brand-gold/60 bg-brand-gold/10'
                            : 'border-brand-purple/30 hover:bg-brand-purple/10'
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={opt.label}
                          checked={form.orderTypes.includes(opt.label)}
                          onChange={() => toggleInList('orderTypes', opt.label)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <p className="font-oswald text-white font-600">{opt.label}</p>
                          <p className="font-inter text-white/50 text-xs">{opt.price}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* MENU SELECTION */}
                <div className="border-t border-brand-gold/20 pt-4">
                  <h3 className="font-oswald text-brand-gold text-xs tracking-widest uppercase mb-4">Menu Selection</h3>
                  <div className="mb-4">
                    <p className="font-oswald text-white/70 text-xs mb-3">Meats</p>
                    <div className="space-y-2">
                      {['Chicken', 'Turkey', 'Pork'].map((meat) => (
                        <label key={meat} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            value={meat}
                            checked={form.meats.includes(meat)}
                            onChange={() => toggleInList('meats', meat)}
                          />
                          <span className="font-inter text-white text-sm">Chopped {meat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="font-oswald text-white/70 text-xs mb-3">Sides</p>
                    <div className="space-y-2">
                      {['Coleslaw', 'Hushpuppies', 'Mac & Cheese', 'Baked Beans', 'Collard Greens', 'Potato Salad'].map((side) => (
                        <label key={side} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            value={side}
                            checked={form.sides.includes(side)}
                            onChange={() => toggleInList('sides', side)}
                          />
                          <span className="font-inter text-white text-sm">{side}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="font-oswald text-white/70 text-xs block mb-3">Quantities / Special Requests</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="e.g. 2 full pans of turkey, 1 half pan of chicken, 10 large trays…"
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-y`}
                    />
                  </div>
                </div>

                {/* TERMS & CONDITIONS */}
                <div className="border-t border-brand-gold/20 pt-4">
                  <h3 className="font-oswald text-brand-gold text-xs tracking-widest uppercase mb-4">Terms & Conditions</h3>
                  <div className="bg-brand-dark/40 border border-brand-purple/20 p-4 mb-4 text-xs space-y-2">
                    <p className="text-white/70">• 50% deposit required to secure booking</p>
                    <p className="text-white/70">• Remaining balance due 48 hours prior to event</p>
                    <p className="text-white/70">• Full-service catered events: $500 minimum</p>
                    <p className="text-white/70">• Final guest count due 72 hours prior</p>
                    <p className="text-white/70">• Cancellation within 7 days forfeits deposit</p>
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      required
                      checked={form.agreeTerms}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <span className="font-inter text-white/70 text-sm">I agree to the terms & conditions above</span>
                  </label>
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
                    {loading ? '⏳ Sending...' : '★ Submit Booking Request'}
                  </span>
                  <div className="absolute inset-0 bg-brand-gold2 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                </button>

                <p className="font-inter text-white/30 text-xs text-center">
                  For faster booking, call/text: <a href="tel:6149710711" className="text-brand-gold hover:text-brand-gold2">614-971-0711</a>
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
                Catered Events: $500 Minimum
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
