import { Users, Award, Globe, Heart } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Who Are We?
            </h2>
            <div className="w-24 h-px bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              MysticTravel is a travel agency specializing in authentic discovery of Morocco, 
              offering unique and personalized experiences for over 15 years.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="fade-in-up">
              <h3 className="font-serif text-3xl font-bold text-foreground mb-6">
                Our Mission
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We are committed to revealing the authentic beauty of Morocco through tailor-made journeys 
                that respect local culture and environment. Our passionate team accompanies you in discovering 
                the hidden treasures of the Cherifian kingdom.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From the bustling medina of Marrakech to the golden dunes of the Sahara, through the 
                majestic Atlas mountains, we create unforgettable experiences that touch the souls 
                of our travelers.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 fade-in-up">
              <div className="text-center p-6 bg-luxury-beige rounded-xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-bold text-2xl text-foreground mb-2">15+</h4>
                <p className="text-muted-foreground">Years of experience</p>
              </div>
              
              <div className="text-center p-6 bg-luxury-beige rounded-xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-bold text-2xl text-foreground mb-2">5000+</h4>
                <p className="text-muted-foreground">Satisfied travelers</p>
              </div>
              
              <div className="text-center p-6 bg-luxury-beige rounded-xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-bold text-2xl text-foreground mb-2">50+</h4>
                <p className="text-muted-foreground">Unique destinations</p>
              </div>
              
              <div className="text-center p-6 bg-luxury-beige rounded-xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-bold text-2xl text-foreground mb-2">98%</h4>
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