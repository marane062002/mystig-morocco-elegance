const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Package name is required'],
    trim: true,
    maxlength: [100, 'Package name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  type: {
    type: String,
    required: true,
    enum: ['adventure', 'cultural', 'luxury', 'family', 'romantic', 'business', 'group']
  },
  duration: {
    days: { type: Number, required: true, min: 1 },
    nights: { type: Number, required: true, min: 0 }
  },
  destinations: [{
    city: String,
    region: String,
    duration: Number, // days spent in this destination
    activities: [String]
  }],
  inclusions: {
    accommodation: { type: Boolean, default: false },
    meals: { type: String, enum: ['none', 'breakfast', 'half-board', 'full-board'], default: 'none' },
    transport: { type: Boolean, default: false },
    guide: { type: Boolean, default: false },
    activities: [String],
    other: [String]
  },
  exclusions: [String],
  pricing: {
    basePrice: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'MAD' },
    pricePerPerson: { type: Boolean, default: true },
    groupDiscounts: [{
      minPeople: Number,
      discount: Number // percentage
    }],
    seasonal: [{
      season: String,
      multiplier: Number,
      startDate: Date,
      endDate: Date
    }]
  },
  images: [{
    url: String,
    caption: String,
    isPrimary: { type: Boolean, default: false }
  }],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    activities: [String],
    meals: [String],
    accommodation: String
  }],
  requirements: {
    minAge: Number,
    maxAge: Number,
    fitnessLevel: { type: String, enum: ['easy', 'moderate', 'challenging', 'extreme'] },
    specialRequirements: [String]
  },
  availability: {
    startDate: Date,
    endDate: Date,
    maxParticipants: { type: Number, default: 20 },
    minParticipants: { type: Number, default: 2 }
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive', 'archived'],
    default: 'draft'
  },
  bookings: {
    total: { type: Number, default: 0 },
    thisMonth: { type: Number, default: 0 }
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
packageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate average rating
packageSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating.average = Math.round((sum / this.reviews.length) * 10) / 10;
    this.rating.count = this.reviews.length;
  }
  return this.save();
};

module.exports = mongoose.model('Package', packageSchema);