import { Mail, Phone, MapPin, Clock } from 'lucide-react';

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
                      Résidence Emeraude, Immeuble 6,<br />
                      Etage 1, Bureau 3<br />
                      Wlah Hlal Hssain, Sala Al Jadida<br />
                      Maroc
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary rounded-lg">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Téléphone</h4>
                    <p className="text-muted-foreground">
                      +212 524 123 456<br />
                      +212 661 234 567 (Mobile)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary rounded-lg">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">
                      info@mystictravel.ma<br />
                      reservations@mystictravel.ma
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary rounded-lg">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Horaires</h4>
                    <p className="text-muted-foreground">
                      Lun-Ven : 9h00 - 18h00<br />
                      Sam : 9h00 - 13h00<br />
                      Urgences : 24h/7j
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - Plan A Style */}
            <div className="fade-in-up">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Demande de Devis Rapide
                </h3>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-all duration-300"
                        placeholder="Votre nom complet"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-all duration-300"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-all duration-300"
                        placeholder="+212 6XX XXX XXX"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Nombre de voyageurs *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-all duration-300"
                        min="1"
                        defaultValue="2"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Type de voyage préféré
                    </label>
                    <select className="w-full px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-all duration-300">
                      <option>Voyage culturel</option>
                      <option>Voyage d'aventure</option>
                      <option>Voyage de luxe</option>
                      <option>Voyage en famille</option>
                      <option>Lune de miel</option>
                      <option>Voyage d'affaires</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Date de départ souhaitée
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Durée estimée
                      </label>
                      <select className="w-full px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-all duration-300">
                        <option>3-5 jours</option>
                        <option>6-8 jours</option>
                        <option>9-12 jours</option>
                        <option>Plus de 2 semaines</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Vos envies de voyage
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 bg-background border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-all duration-300 resize-none"
                      placeholder="Décrivez-nous vos préférences, centres d'intérêt et attentes pour ce voyage..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Obtenir mon devis personnalisé</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;