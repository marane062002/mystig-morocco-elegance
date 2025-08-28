import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Filter, MapPin, Star, Clock, Users, ShoppingCart, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCart } from '@/contexts/CartContext';
import { hotelsAPI, packagesAPI, transportAPI, foodAPI, artisanAPI, eventsAPI } from '@/services/api';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const { addItem } = useCart();

  useScrollAnimation();

  const categories = [
    { id: 'all', name: 'All Products', icon: '🌟' },
    { id: 'hotels', name: 'Hotels & Riads', icon: '🏨' },
    { id: 'packages', name: 'Travel Packages', icon: '📦' },
    { id: 'transport', name: 'Transport', icon: '🚗' },
    { id: 'events', name: 'Events', icon: '🎭' },
    { id: 'food', name: 'Gastronomy', icon: '🍽️' },
    { id: 'artisan', name: 'Artisan Crafts', icon: '🎨' }
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && categories.find(cat => cat.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let allProducts: any[] = [];

      if (selectedCategory === 'all' || selectedCategory === 'hotels') {
        try {
          const hotels = await hotelsAPI.getAll();
          const hotelProducts = (hotels.content || hotels || []).map((hotel: any) => ({
            ...hotel,
            category: 'hotels',
            type: 'hotel',
            location: `${hotel.city || 'Morocco'}${hotel.region ? `, ${hotel.region}` : ''}`,
            price: hotel.basePrice || 0,
            currency: hotel.currency || 'MAD',
            image: hotel.images?.[0]?.url || 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
            rating: hotel.average || 4.5
          }));
          allProducts = [...allProducts, ...hotelProducts];
        } catch (error) {
          console.error('Error fetching hotels:', error);
        }
      }

      if (selectedCategory === 'all' || selectedCategory === 'packages') {
        try {
          const packages = await packagesAPI.getAll();
          const packageProducts = (packages.content || packages || []).map((pkg: any) => ({
            ...pkg,
            category: 'packages',
            type: 'package',
            location: 'Morocco',
            price: pkg.basePrice || pkg.price || 0,
            currency: pkg.currency || 'MAD',
            image: pkg.images?.[0]?.url || 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
            rating: pkg.average || 4.6
          }));
          allProducts = [...allProducts, ...packageProducts];
        } catch (error) {
          console.error('Error fetching packages:', error);
        }
      }

      if (selectedCategory === 'all' || selectedCategory === 'transport') {
        try {
          const transports = await transportAPI.getAll();
          const transportProducts = (transports.items || transports || []).map((transport: any) => ({
            ...transport,
            category: 'transport',
            type: 'transport',
            location: transport.city || 'Morocco',
            price: transport.price || 0,
            currency: transport.currency || 'MAD',
            image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
            rating: 4.3
          }));
          allProducts = [...allProducts, ...transportProducts];
        } catch (error) {
          console.error('Error fetching transport:', error);
        }
      }

      if (selectedCategory === 'all' || selectedCategory === 'food') {
        try {
          const foods = await foodAPI.getAll();
          const foodProducts = (foods.content || foods || []).map((food: any) => ({
            ...food,
            category: 'food',
            type: 'food',
            location: food.location || 'Morocco',
            price: food.price || 0,
            currency: food.currency || 'MAD',
            image: food.images?.[0]?.url || 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
            rating: 4.7
          }));
          allProducts = [...allProducts, ...foodProducts];
        } catch (error) {
          console.error('Error fetching food:', error);
        }
      }

      if (selectedCategory === 'all' || selectedCategory === 'artisan') {
        try {
          const artisans = await artisanAPI.getAll();
          const artisanProducts = (artisans.items || artisans || []).map((artisan: any) => ({
            ...artisan,
            category: 'artisan',
            type: 'artisan',
            location: artisan.origin || 'Morocco',
            price: artisan.price || 0,
            currency: artisan.currency || 'MAD',
            image: artisan.images?.[0]?.url || 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
            rating: 4.4
          }));
          allProducts = [...allProducts, ...artisanProducts];
        } catch (error) {
          console.error('Error fetching artisan:', error);
        }
      }

      if (selectedCategory === 'all' || selectedCategory === 'events') {
        try {
          const events = await eventsAPI.getAll();
          const eventProducts = (events.content || events || []).map((event: any) => ({
            ...event,
            category: 'events',
            type: 'event',
            location: `${event.city || 'Morocco'}${event.venue ? `, ${event.venue}` : ''}`,
            price: event.tickets?.[0]?.price || 0,
            currency: event.tickets?.[0]?.currency || 'MAD',
            image: event.images?.[0]?.url || 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
            rating: 4.5
          }));
          allProducts = [...allProducts, ...eventProducts];
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      }

      setProducts(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'name':
      default:
        return a.name?.localeCompare(b.name) || 0;
    }
  });

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      type: product.type,
      image: product.image,
      description: product.description
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-luxury-ivory via-luxury-beige to-luxury-sand">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto fade-in-up">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              Our Products & Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our selection of authentic experiences in Morocco
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search for a product, destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-background/80 backdrop-blur-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-background border border-border hover:border-primary hover:shadow-md'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            {/* Filters & Sort */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-lg hover:shadow-md transition-all duration-300"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-muted/30 rounded-xl border border-border">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Price Range (MAD)
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-24 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Min"
                    />
                    <span className="text-muted-foreground">to</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-24 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading products...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing {sortedProducts.length} products
                  {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="group bg-background rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                        {categories.find(c => c.id === product.category)?.icon} {product.type}
                      </div>
                      
                      {/* Rating */}
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                      </div>

                      {/* Quick Add to Cart */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-110 shadow-lg"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center text-muted-foreground text-sm mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            {product.location}
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Additional Info */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          {product.capacity && (
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{product.capacity}</span>
                            </div>
                          )}
                          {product.duration && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{product.duration}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <span className="text-xl font-bold text-primary">
                            {product.price} {product.currency}
                          </span>
                          <p className="text-xs text-muted-foreground capitalize">{product.type}</p>
                        </div>
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-md"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {sortedProducts.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;