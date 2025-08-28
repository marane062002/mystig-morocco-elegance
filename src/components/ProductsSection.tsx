import { ArrowRight, Star, MapPin } from 'lucide-react';

const ProductsSection = () => {
  const featuredProducts = [
    {
      id: 1,
      category: 'Hôtels',
      name: 'Riad Atlas Premium',
      location: 'Marrakech, Médina',
      price: '1,200 MAD/nuit',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      description: 'Riad de luxe au cœur de la médina'
    },
    {
      id: 2,
      category: 'Forfaits',
      name: 'Circuit Impérial 7 jours',
      location: 'Marrakech, Fès, Rabat',
      price: '4,500 MAD',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      description: 'Découvrez les villes impériales'
    },
    {
      id: 3,
      category: 'Transport',
      name: 'Bus Premium',
      location: 'Marrakech → Casablanca',
      price: '120 MAD',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      description: 'Transport confortable et rapide'
    },
    {
      id: 4,
      category: 'Événements',
      name: 'Festival Gnawa',
      location: 'Essaouira',
      price: '150 MAD',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      description: 'Festival de musique traditionnelle'
    }
  ];

  return (
    <section className="py-20 bg-luxury-beige">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nos Produits Vedettes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez une sélection de nos meilleures offres pour un voyage inoubliable au Maroc
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-background rounded-xl border border-border overflow-hidden hover:shadow-luxury transition-all duration-500 hover:scale-105 fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                  {product.category}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="flex items-center text-muted-foreground text-sm mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  {product.location}
                </div>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">{product.price}</span>
                  <button className="text-primary hover:text-primary/80 transition-colors duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center fade-in-up">
          <a
            href="/products"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
          >
            <span>Voir tous nos produits</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;