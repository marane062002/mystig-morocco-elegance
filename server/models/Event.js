const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  type: {
    type: String,
    required: true,
    enum: ['festival', 'sport', 'culture', 'music', 'art', 'food', 'conference']
  },
  category: {
    type: String,
    required: true,
    enum: ['football', 'basketball', 'concert', 'exhibition', 'workshop', 'ceremony', 'competition']
  },
  date: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  time: {
    start: { type: String, required: true },
    end: String
  },
  location: {
    venue: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
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
  tickets: {
    capacity: { type: Number, required: true, min: 1 },
    sold: { type: Number, default: 0 },
    available: { type: Number, required: true },
    pricing: [{
      type: { type: String, required: true }, // VIP, Standard, Economy
      price: { type: Number, required: true, min: 0 },
      currency: { type: String, default: 'MAD' },
      quantity: { type: Number, required: true },
      sold: { type: Number, default: 0 }
    }]
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled', 'completed'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    website: String
  },
  requirements: {
    ageLimit: Number,
    dresscode: String,
    specialRequirements: [String]
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
eventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  // Update available tickets
  this.tickets.available = this.tickets.capacity - this.tickets.sold;
  next();
});

// Calculate total revenue
eventSchema.methods.calculateRevenue = function() {
  return this.tickets.pricing.reduce((total, ticket) => {
    return total + (ticket.price * ticket.sold);
  }, 0);
};

module.exports = mongoose.model('Event', eventSchema);