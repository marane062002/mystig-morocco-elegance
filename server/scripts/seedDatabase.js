const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Event = require('../models/Event');
const Package = require('../models/Package');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🍃 MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Hotel.deleteMany({});
    await Event.deleteMany({});
    await Package.deleteMany({});

    console.log('🧹 Cleared existing data');

    // Create sample seller
    const seller = new User({
      name: 'Ahmed Benali',
      email: 'ahmed@mystigtravel.ma',
      password: 'password123',
      role: 'seller',
      phone: '+212661234567',
      businessInfo: {
        companyName: 'MystigTravel Morocco',
        license: 'LIC-2024-001',
        specialties: ['Desert Tours', 'Cultural Experiences', 'Luxury Travel'],
        description: 'Expert en voyages authentiques au Maroc depuis 15 ans'
      }
    });

    await seller.save();
    console.log('👤 Created sample seller');

    // Create sample hotels
    const hotels = [
      {
        name: 'Riad Atlas Premium',
        description: 'Riad de luxe au cœur de la médina de Marrakech, alliant tradition et modernité.',
        location: {
          address: '15 Derb Sidi Bouamar',
          city: 'Marrakech',
          region: 'Marrakech-Safi'
        },
        amenities: ['wifi', 'restaurant', 'spa', 'pool'],
        rooms: {
          total: 12,
          available: 8,
          types: [
            { name: 'Suite Junior', capacity: 2, price: 800, amenities: ['wifi', 'spa'] },
            { name: 'Suite Royale', capacity: 4, price: 1500, amenities: ['wifi', 'spa', 'room-service'] }
          ]
        },
        pricing: {
          basePrice: 1200,
          currency: 'MAD'
        },
        owner: seller._id,
        status: 'active',
        bookings: { total: 45, thisMonth: 28 }
      },
      {
        name: 'Hotel Sahara Luxury',
        description: 'Hôtel de charme aux portes du désert de Merzouga.',
        location: {
          address: 'Route de Merzouga',
          city: 'Merzouga',
          region: 'Drâa-Tafilalet'
        },
        amenities: ['wifi', 'restaurant', 'bar'],
        rooms: {
          total: 8,
          available: 5,
          types: [
            { name: 'Chambre Désert', capacity: 2, price: 2000, amenities: ['wifi'] }
          ]
        },
        pricing: {
          basePrice: 2800,
          currency: 'MAD'
        },
        owner: seller._id,
        status: 'active',
        bookings: { total: 32, thisMonth: 15 }
      }
    ];

    await Hotel.insertMany(hotels);
    console.log('🏨 Created sample hotels');

    // Create sample events
    const events = [
      {
        title: 'Festival Gnawa Essaouira',
        description: 'Festival de musique Gnawa traditionnel sur la côte atlantique.',
        type: 'festival',
        category: 'concert',
        date: {
          start: new Date('2024-06-20'),
          end: new Date('2024-06-23')
        },
        time: {
          start: '20:00',
          end: '02:00'
        },
        location: {
          venue: 'Place Moulay Hassan',
          address: 'Place Moulay Hassan',
          city: 'Essaouira'
        },
        tickets: {
          capacity: 500,
          available: 158,
          sold: 342,
          pricing: [
            { type: 'Standard', price: 150, currency: 'MAD', quantity: 400, sold: 280 },
            { type: 'VIP', price: 300, currency: 'MAD', quantity: 100, sold: 62 }
          ]
        },
        organizer: seller._id,
        status: 'published'
      },
      {
        title: 'Match Raja vs Wydad',
        description: 'Derby historique entre les deux grands clubs de Casablanca.',
        type: 'sport',
        category: 'football',
        date: {
          start: new Date('2024-07-15'),
          end: new Date('2024-07-15')
        },
        time: {
          start: '18:00',
          end: '20:00'
        },
        location: {
          venue: 'Stade Mohammed V',
          address: 'Boulevard Mohammed V',
          city: 'Casablanca'
        },
        tickets: {
          capacity: 1000,
          available: 244,
          sold: 756,
          pricing: [
            { type: 'Tribune', price: 100, currency: 'MAD', quantity: 600, sold: 456 },
            { type: 'VIP', price: 200, currency: 'MAD', quantity: 400, sold: 300 }
          ]
        },
        organizer: seller._id,
        status: 'published'
      }
    ];

    await Event.insertMany(events);
    console.log('🎪 Created sample events');

    // Create sample packages
    const packages = [
      {
        name: 'Circuit Impérial 7 Jours',
        description: 'Découverte des villes impériales du Maroc : Rabat, Meknès, Fès et Marrakech.',
        type: 'cultural',
        duration: { days: 7, nights: 6 },
        destinations: [
          { city: 'Rabat', region: 'Rabat-Salé-Kénitra', duration: 1, activities: ['Visite Kasbah', 'Tour Hassan'] },
          { city: 'Meknès', region: 'Fès-Meknès', duration: 1, activities: ['Bab Mansour', 'Médina'] },
          { city: 'Fès', region: 'Fès-Meknès', duration: 2, activities: ['Médina', 'Tanneries', 'Université Al Quaraouiyine'] },
          { city: 'Marrakech', region: 'Marrakech-Safi', duration: 3, activities: ['Jemaa el-Fna', 'Majorelle', 'Bahia'] }
        ],
        inclusions: {
          accommodation: true,
          meals: 'half-board',
          transport: true,
          guide: true,
          activities: ['Visites guidées', 'Spectacles traditionnels'],
          other: ['Assurance voyage']
        },
        pricing: {
          basePrice: 4500,
          currency: 'MAD',
          pricePerPerson: true
        },
        owner: seller._id,
        status: 'active',
        bookings: { total: 23, thisMonth: 12 }
      }
    ];

    await Package.insertMany(packages);
    console.log('📦 Created sample packages');

    console.log('✅ Database seeded successfully!');
    console.log('📧 Seller login: ahmed@mystigtravel.ma');
    console.log('🔑 Password: password123');

  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();