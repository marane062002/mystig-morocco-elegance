const IntroSection = () => {
  return (
    <section className="py-32 bg-luxury-beige">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center fade-in-up">
          <h2 className="font-serif text-5xl md:text-6xl font-light mb-12 text-foreground leading-none tracking-wide">
            L'Art du Voyage
          </h2>
          <div className="w-32 h-px bg-primary mx-auto mb-12"></div>
          <p className="font-elegant text-xl md:text-2xl font-light leading-relaxed text-muted-foreground max-w-2xl mx-auto italic">
            "Chaque voyage est une symphonie d'émotions, orchestrée dans les dunes dorées du Sahara."
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;