import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Import your images (you'll need to add these to your assets)
// import fesCuisineImage from '@/assets/fes-cuisine.jpg';
// import sephardicCuisineImage from '@/assets/sephardic-cuisine.jpg';
// import breadMakingImage from '@/assets/bread-making.jpg';
// import fezTastingImage from '@/assets/fez-tasting.jpg';
// import carriageTourImage from '@/assets/carriage-tour.jpg';
// import calligraphyImage from '@/assets/calligraphy.jpg';
// import spaHammamImage from '@/assets/spa-hammam.jpg';
// import hennaImage from '@/assets/henna-rituals.jpg';
// import mountainEscapeImage from '@/assets/mountain-escape.jpg';
// import copperworkImage from '@/assets/copperwork.jpg';

const ExperienceCarousel = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const experiences = [
    {
      id: 'culinary-fes',
      image: "https://riad-layalina-fes.com/wp-content/uploads/tajine-agneau-pruneaux-au-riad-layalina-fes.jpg",
      title: 'Culinary Masterpieces of Fes',
      shortDescription: 'Luxurious cooking experience with a skilled chef',
      category: 'Culinary',
      details: {
        description: 'Explore the rich culinary arts of Fes with a professional chef who will guide you through traditional cooking techniques and share the secrets of preparing delicious Fassi dishes.',
        highlights: [
          'Discover fresh local ingredients like Fassi spices, olives, and nuts',
          'Learn to prepare dishes like couscous and tagine',
          'Visit local markets to purchase ingredients',
          'Master various cooking techniques'
        ],
        duration: '3-4 hours',
        location: 'Fes'
      }
    },
    {
      id: 'sephardic-cuisine',
      image: "https://aish.com/wp-content/uploads/2023/02/What-Is-Sephardi-Food-1240_x_698.jpg",
      title: 'Sephardic Cuisine Journey',
      shortDescription: 'Explore flavors, traditions, and history',
      category: 'Culinary',
      details: {
        description: 'Discover the culinary traditions of Jews expelled from Spain and Portugal in the 15th century, enriched with diverse ingredients and cultural influences.',
        highlights: [
          'Learn about key ingredients like grains, vegetables, and spices',
          'Master techniques like slow cooking, grilling, and frying',
          'Prepare traditional dishes like couscous, hummus, and paella',
          'Understand cultural influences and celebrations'
        ],
        duration: '3-4 hours',
        location: 'Fes'
      }
    },
    {
      id: 'bread-pastry',
      image: "https://kitchenaid.com.au/cdn/shop/articles/Bread_bowl.jpg?v=1689915783",
      title: 'Moroccan Bread & Pastry Making',
      shortDescription: 'Hands-on culinary journey in Fes',
      category: 'Culinary',
      details: {
        description: 'Immerse yourself in the world of traditional cooking with specialized workshops that teach the arts of bread and pastry-making.',
        highlights: [
          'Learn to select fresh ingredients like flour and yeast',
          'Practice manual techniques for kneading and mixing',
          'Bake in traditional ovens that serve as social hubs',
          'Prepare pastries like Baghrir and Rfisa'
        ],
        duration: '2-3 hours',
        location: 'Fes'
      }
    },
    {
      id: 'fez-tasting',
      image: "https://media.tacdn.com/media/attractions-splice-spp-360x240/12/e5/22/a5.jpg",
      title: 'Enchanting Tasting Experience in Fez',
      shortDescription: 'Explore culinary heritage through senses',
      category: 'Culinary',
      details: {
        description: 'A rich exploration of Fez\'s culinary heritage, blending tradition, culture, and sensory delight in one of Morocco\'s oldest cities.',
        highlights: [
          'Taste iconic Moroccan dishes like tagines, couscous, and pastilla',
          'Discover the use of spices like saffron, cumin, and cinnamon',
          'Explore street food culture with grilled meats and sweet pastries',
          'Participate in the traditional mint tea ritual'
        ],
        duration: '2-3 hours',
        location: 'Fes'
      }
    },
    {
      id: 'carriage-tour',
      image: "https://images.myguide-cdn.com/marrakech/companies/marrakech-horse-drawn-carriage-tour/large/marrakech-horse-drawn-carriage-tour-2824038.jpg",
      title: 'Majestic Carriage Rides in Marrakech',
      shortDescription: 'Discover Marrakech with horse-drawn carriage',
      category: 'Sightseeing',
      details: {
        description: 'Explore Marrakech in a unique and comfortable way with a magical horse-drawn carriage tour covering historical and beautiful landmarks.',
        highlights: [
          'Tour begins at famous Jemaa el-Fnaa square',
          'Visit landmarks like Majorelle Gardens and ancient palaces',
          'Enjoy beautiful traditional carriage designs',
          'Learn from local guide about city history and culture'
        ],
        duration: '30-60 minutes',
        location: 'Marrakech'
      }
    },
    {
      id: 'calligraphy',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLZf0KqjgUl0wP0wDWNzcFRaipWXztVQvuhQ&s",
      title: 'Arabic Calligraphy Mastery',
      shortDescription: 'Journey through culture and creativity',
      category: 'Cultural',
      details: {
        description: 'Transform into a remarkable journey through time and culture as you learn the art of Arabic calligraphy in the heart of a historic city.',
        highlights: [
          'Learn about the history and cultural significance of Arabic calligraphy',
          'Master writing techniques with guidance from a skilled teacher',
          'Create artistic pieces that reflect your unique style',
          'Experience the spiritual and meditative aspects of calligraphy'
        ],
        duration: '2-3 hours',
        location: 'Fes'
      }
    },
    {
      id: 'spa-hammam',
      image: "https://marrakechbestof.com/wp-content/uploads/2021/07/208711103_320658849704863_2658347928947707253_n-1024x681.jpg",
      title: 'Tranquility Spa & Hammam Experience',
      shortDescription: 'Spiritual and therapeutic journey in Fes',
      category: 'Wellness',
      details: {
        description: 'A unique spiritual and therapeutic journey that blends Moroccan traditions with self-care in a tranquil atmosphere, enhancing inner peace.',
        highlights: [
          'Enjoy steam bath and massage with natural ingredients',
          'Experience benefits of argan oil, essential oils, and black soap',
          'Use Moroccan clay for cleansing and detoxifying',
          'Relax with dried herbs like lavender and sage'
        ],
        duration: '2-3 hours',
        location: 'Fes'
      }
    },
    {
      id: 'henna-rituals',
      image: "https://ich.unesco.org/img/photo/thumb/17547-HUG.jpg",
      title: 'Henna Rituals',
      shortDescription: 'Tradition, art, and connection',
      category: 'Cultural',
      details: {
        description: 'Experience the deep spiritual and social dimension of henna in one of the most distinguished palaces in Fes.',
        highlights: [
          'Learn about henna as a symbol of protection and blessing',
          'Receive intricate and beautiful designs on hands and feet',
          'Enjoy traditional welcome with Moroccan tea and dates',
          'Participate in festive atmosphere with music and dance'
        ],
        duration: '1-2 hours',
        location: 'Fes'
      }
    },
    {
      id: 'mountain-escape',
      image: "https://www.uniqhotels.com/media/hotels/b3-hotel-orig/kasbah-du-toubkal.jpg.938x599_q85_box-0%2C0%2C1595%2C841_crop_detail.jpg",
      title: 'Zalagh Mountain Escape',
      shortDescription: 'Spiritual journey through nature',
      category: 'Adventure',
      details: {
        description: 'Combine the beauty of nature with spiritual depth in the Zalagh Mountain range, exploring the Amazigh way of life just 30 minutes from Fes.',
        highlights: [
          'Hike through ancient olive groves and stunning landscapes',
          'Enjoy a picnic lunch in the shade of pine trees at the summit',
          'Experience tranquility away from city hustle and bustle',
          'Learn about Amazigh heritage and way of life'
        ],
        duration: 'Half day',
        location: 'Zalagh Mountains near Fes'
      }
    },
    {
      id: 'copperwork',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgeB1c520in3SXMO_-iCQOMJgwrpDRYpTKOQ&s",
      title: 'Mastering Copperwork Art',
      shortDescription: 'Echoes of heritage in Fez',
      category: 'Cultural',
      details: {
        description: 'Dive into the essence of traditional arts by learning the ancient craft of copperwork in the handicraft capital of Morocco.',
        highlights: [
          'Learn about the history of copperwork dating back to early Islamic eras',
          'Engage with the metal through precise cutting, shaping, and hammering',
          'Carve intricate designs with geometric patterns and plant motifs',
          'Experience the spiritual dimension of this meticulous craft'
        ],
        duration: '3-4 hours',
        location: 'Fes'
      }
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === experiences.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? experiences.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <section className="py-20 bg-luxury-beige/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Unforgettable Moroccan Experiences
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Immerse yourself in the rich culture and traditions of Morocco through these carefully curated experiences
            </p>
          </div>

          {/* Carousel Container */}
          

          {/* Grid view for larger screens */}
          <div className="mt-16 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className="group cursor-pointer bg-white rounded-xl shadow-luxury overflow-hidden hover:shadow-luxury-hover transition-all duration-300"
                onClick={() => setSelectedExperience(experience)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="uppercase tracking-wide text-xs text-luxury-gold font-semibold">
                    {experience.category}
                  </div>
                  <h3 className="mt-2 font-serif text-xl font-bold text-foreground">
                    {experience.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {experience.shortDescription}
                  </p>
                  <button className="mt-4 text-luxury-gold hover:text-luxury-gold-dark font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Detail Modal */}
      {selectedExperience && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <div className="h-64 md:h-80">
                <img
                  src={selectedExperience.image}
                  alt={selectedExperience.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <div className="uppercase tracking-wide text-sm text-luxury-gold font-semibold">
                {selectedExperience.category}
              </div>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-foreground">
                {selectedExperience.title}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {selectedExperience.details.description}
              </p>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Experience Highlights</h3>
                <ul className="space-y-2">
                  {selectedExperience.details.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-luxury-gold mr-2">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground">Duration</h4>
                  <p className="text-foreground">{selectedExperience.details.duration}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground">Location</h4>
                  <p className="text-foreground">{selectedExperience.details.location}</p>
                </div>
              </div>

              <div className="mt-8">
                <button className="px-6 py-3 bg-luxury-gold text-white rounded-lg hover:bg-luxury-gold-dark transition-colors">
                  Book This Experience
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExperienceCarousel;