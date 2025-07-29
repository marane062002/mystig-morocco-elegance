import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import IntroSection from '@/components/IntroSection';
import GalleryCarousel from '@/components/GalleryCarousel';
import ImageTextSection from '@/components/ImageTextSection';
import ExperienceSection from '@/components/ExperienceSection';
import DestinationsGrid from '@/components/DestinationsGrid';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
      <GalleryCarousel />
      <ImageTextSection />
      <ExperienceSection />
      <DestinationsGrid />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
