import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import IntroSection from '@/components/IntroSection';
import GalleryCarousel from '@/components/GalleryCarousel';
import ImageTextSection from '@/components/ImageTextSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import DestinationsGrid from '@/components/DestinationsGrid';
import AccommodationsSection from '@/components/AccommodationsSection';
import GastronomySection from '@/components/GastronomySection';
import TransportSection from '@/components/TransportSection';
import PlanBSection from '@/components/PlanBSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ExperienceSection from '@/components/ExperienceSection';
import ProductsSection from '@/components/ProductsSection';
import SpecialPackagesSection from '@/components/SpecialPackagesSection';
import ExperienceCarousel from '@/components/ExperienceCarousel';

const Index = () => {
  useScrollAnimation();

  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => link.addEventListener('click', handleClick));

    return () => {
      links.forEach(link => link.removeEventListener('click', handleClick));
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <IntroSection />
      <AboutSection />
      {/* <ServicesSection />
      <IntroSection />
      <GalleryCarousel />
      <ImageTextSection />
      <ActivitiesSection />
      <DestinationsGrid />
      <AccommodationsSection />
      <GastronomySection />
      <TransportSection />
      <PlanBSection /> */}
      
      <GalleryCarousel />
      <ImageTextSection />
      <ExperienceCarousel />
      <DestinationsGrid />
      <SpecialPackagesSection />

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
