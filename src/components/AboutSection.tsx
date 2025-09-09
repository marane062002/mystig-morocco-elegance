import { Users, Award, Globe, Heart } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Us
            </h2>
            <div className="w-24 h-px bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed italic">
              Our Essence is Experience .. But our Passion is Morocco
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="fade-in-up">
              <h3 className="font-serif text-3xl font-bold text-foreground mb-6">
                Our Journey
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Mystic Travel was founded in 2024 by Mohammed Badre, Mohammed Bouchareb, and Alaoui Chrifi Kamal. 
                It bridges ancestral Moroccan wisdom with modern digital finesse.
              </p>
              <h4 className="font-semibold text-foreground mb-4 text-xl">Meet the visionaries</h4>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h5 className="font-semibold text-foreground">Mohammed Bouchareb</h5>
                  <p className="text-sm text-muted-foreground">Co-Founder & Technical Director - 58 years in tourism & craftsmanship, guardian of Fes' artisanal traditions.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h5 className="font-semibold text-foreground">Mohammed Badre</h5>
                  <p className="text-sm text-muted-foreground">Founder & Manager - 15 years in project management, passion for tourism, innovation, and Moroccan heritage.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h5 className="font-semibold text-foreground">Alaoui Chrifi Kamal</h5>
                  <p className="text-sm text-muted-foreground">Co-Creator & Expert Guide - Native of Fes, deeply rooted in Moroccan tradition, offering soulful guidance.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 fade-in-up">
              <div className="text-center p-6 bg-luxury-beige rounded-xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-bold text-2xl text-foreground mb-2">1+</h4>
                <p className="text-muted-foreground">Month of operation</p>
              </div>
              
              <div className="text-center p-6 bg-luxury-beige rounded-xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-bold text-2xl text-foreground mb-2">25+</h4>
                <p className="text-muted-foreground">Happy travelers</p>
              </div>
              
              <div className="text-center p-6 bg-luxury-beige rounded-xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-bold text-2xl text-foreground mb-2">12+</h4>
                <p className="text-muted-foreground">Curated destinations</p>
              </div>
              
              <div className="text-center p-6 bg-luxury-beige rounded-xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-bold text-2xl text-foreground mb-2">100%</h4>
                <p className="text-muted-foreground">Satisfaction rate</p>
              </div>
            </div>
          </div>

          <div className="bg-luxury-beige rounded-2xl p-8 fade-in-up">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
              Our Values
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h4 className="font-bold text-foreground mb-3">Authenticity</h4>
                <p className="text-muted-foreground">
                  We prioritize authentic experiences that respect 
                  Moroccan culture and traditions.
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-foreground mb-3">Excellence</h4>
                <p className="text-muted-foreground">
                  Every detail of your journey is carefully orchestrated 
                  to offer you an exceptional experience.
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-foreground mb-3">Sustainability</h4>
                <p className="text-muted-foreground">
                  We are committed to responsible tourism that preserves 
                  the environment and supports local communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;