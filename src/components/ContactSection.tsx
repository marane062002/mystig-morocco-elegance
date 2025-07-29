import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Planifiez Votre Voyage
            </h2>
            <p className="text-xl text-muted-foreground">
              Nos experts vous accompagnent dans la création de votre voyage sur mesure
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="fade-in-up">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-8">
                Nous Contacter
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary rounded-lg">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Adresse</h4>
                    <p className="text-muted-foreground">
                      Avenue Mohammed V<br />
                      Marrakech, Maroc
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary rounded-lg">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Téléphone</h4>
                    <p className="text-muted-foreground">+212 524 123 456</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary rounded-lg">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">contact@mystigtravel.ma</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="fade-in-up">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 resize-none"
                    placeholder="Décrivez votre voyage idéal..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-luxury rounded-lg text-center"
                >
                  Envoyer la Demande
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;