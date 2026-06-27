import { Oswald, Dancing_Script, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'The Que Guy LLC | Eastern Carolina Style BBQ Catering',
  description:
    'Low & Slow. Real Smoke. Real Flavor. Eastern Carolina Style BBQ catering for weddings, corporate events, family reunions, and more in Columbus, OH. Call 614-971-0711.',
  keywords: ['BBQ catering', 'Eastern Carolina BBQ', 'Columbus OH catering', 'The Que Guy', 'pulled pork', 'chopped chicken', 'event catering'],
  openGraph: {
    title: 'The Que Guy LLC | Eastern Carolina Style BBQ',
    description: 'Bringing the Smoke. Bringing the Flavor. Bringing the Carolina to You!',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${dancing.variable} ${inter.variable}`}
    >
      <body className="font-inter bg-brand-black text-white antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
