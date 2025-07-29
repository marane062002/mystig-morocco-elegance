import heroImage from '@/assets/hero-riad.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-4xl mx-auto">
          <div className="fade-in-up animate">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-wide">
              MystigTravel
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wider opacity-90">
              Voyages d'exception à travers le Maroc
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;