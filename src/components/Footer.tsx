import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Qui sommes-nous', href: '#about' },
    { name: 'Nos Services', href: '#services' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Hébergements', href: '#accommodations' },
    { name: 'Expériences', href: '#activities' },
    { name: 'Gastronomie', href: '#gastronomy' },
    { name: 'Transport', href: '#transport' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Youtube, href: '#' },
  ];

  return (
    <footer className="bg-luxury-ivory border-t border-border/20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-3xl font-bold text-foreground mb-4">
              MysticTravel
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              Agence de voyage spécialisée dans la découverte authentique du Maroc. 
              Nous créons des expériences uniques et personnalisées qui respectent la culture locale 
              et révèlent les trésors cachés du royaume chérifien.
            </p>
            
            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Newsletter
              </h4>
              <div className="flex max-w-sm">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 transition-colors duration-300">
                  S'abonner
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">
              Nous Suivre
            </h4>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 bg-background rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            
            <div className="text-sm text-muted-foreground space-y-2">
              <p>+212 524 123 456</p>
              <p>info@mystictravel.ma</p>
              <p>Résidence Emeraude, Immeuble 6, Etage 1,</p>
              <p>Wlah Hlal Hssain, Sala Al Jadida, Maroc</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2024 MysticTravel. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Politique de confidentialité
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Conditions générales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;