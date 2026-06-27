import Hero from '../components/Hero';
import About from '../components/About';
import Meats from '../components/Meats';
import MenuSection from '../components/MenuSection';
import CateringPackages from '../components/CateringPackages';
import EventTypes from '../components/EventTypes';
import ContractTerms from '../components/ContractTerms';
import BookingSection from '../components/BookingSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Meats />
      <MenuSection />
      <CateringPackages />
      <EventTypes />
      <ContractTerms />
      <BookingSection />
      <Footer />
    </>
  );
}
