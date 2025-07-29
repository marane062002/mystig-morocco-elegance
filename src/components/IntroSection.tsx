const IntroSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in-up">
            <p className="font-serif text-2xl md:text-3xl leading-relaxed text-foreground mb-8">
              Au cœur des dunes de Merzouga, sous les étoiles du Sahara, 
              dans les ruelles parfumées de Marrakech et les médinas millénaires de Fès...
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              MystigTravel vous invite à découvrir le Maroc autrement. 
              Nos voyages sur mesure révèlent la beauté authentique du royaume, 
              entre tradition séculaire et luxe contemporain. 
              Chaque expérience est une invitation à l'émerveillement, 
              orchestrée avec le raffinement qui fait notre signature.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;