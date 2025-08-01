const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hotel name is required'],
    trim: true,
    maxlength: [100, 'Hotel name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    region: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  images: [{
    url: String,
    caption: String,
    isPrimary: { type: Boolean, default: false }
  }],
  amenities: [{
    type: String,
    enum: ['wifi', 'parking', 'restaurant', 'spa', 'pool', 'gym', 'bar', 'room-service', 'concierge', 'laundry']
  }],
  rooms: {
    total: { type: Number, required: true, min: 1 },
    available: { type: Number, required: true },
    types: [{
      name: String,
      capacity: Number,
      price: Number,
      amenities: [String]
    }]
  },
  pricing: {
    basePrice: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'MAD' },
    seasonal: [{
      season: String,
      multiplier: Number,
      startDate: Date,
      endDate: Date
    }]
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
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  bookings: {
    total: { type: Number, default: 0 },
    thisMonth: { type: Number, default: 0 }
  },
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
hotelSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate average rating
hotelSchema.methods.calculateAverageRating = function() {
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

module.exports = mongoose.model('Hotel', hotelSchema);