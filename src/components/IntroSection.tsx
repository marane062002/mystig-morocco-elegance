const IntroSection = () => {
  return (
    <section className="py-32 bg-luxury-beige">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-12 text-foreground text-center">
            Why travel with us
          </h2>
          <div className="w-32 h-px bg-primary mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">Tailored journeys of the soul</h3>
              <p className="text-muted-foreground leading-relaxed">Every voyage is intricately designed to reflect your dreams and inner yearnings</p>
            </div>
            <div className="text-center p-6">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">Luxury with spirit</h3>
              <p className="text-muted-foreground leading-relaxed">From opulent riads to secluded desert camps, each detail whispers indulgence and reverence</p>
            </div>
            <div className="text-center p-6">
              <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">Seamless booking</h3>
              <p className="text-muted-foreground leading-relaxed">Effortless planning with Google Pay and real-time support from our expert team</p>
            </div>
          </div>
          
          <div className="text-center">
            <button className="btn-luxury px-8 py-4 text-lg">Learn more about our philosophy</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;