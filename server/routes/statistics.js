const express = require('express');
const Hotel = require('../models/Hotel');
const Event = require('../models/Event');
const Package = require('../models/Package');
const { auth, sellerOrAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/statistics/dashboard
// @desc    Get dashboard statistics for seller
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const currentDate = new Date();
    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

    // Get hotels statistics
    const hotels = await Hotel.find({ owner: userId });
    const totalHotels = hotels.length;
    const activeHotels = hotels.filter(h => h.status === 'active').length;
    const totalRooms = hotels.reduce((sum, hotel) => sum + hotel.rooms.total, 0);
    const hotelBookingsThisMonth = hotels.reduce((sum, hotel) => sum + hotel.bookings.thisMonth, 0);

    // Get events statistics
    const events = await Event.find({ organizer: userId });
    const totalEvents = events.length;
    const activeEvents = events.filter(e => e.status === 'published').length;
    const totalTicketsSold = events.reduce((sum, event) => sum + event.tickets.sold, 0);
    const eventRevenue = events.reduce((sum, event) => {
      return sum + event.tickets.pricing.reduce((eventSum, pricing) => {
        return eventSum + (pricing.price * pricing.sold);
      }, 0);
    }, 0);

    // Get packages statistics
    const packages = await Package.find({ owner: userId });
    const totalPackages = packages.length;
    const activePackages = packages.filter(p => p.status === 'active').length;
    const packageBookingsThisMonth = packages.reduce((sum, pkg) => sum + pkg.bookings.thisMonth, 0);

    // Calculate total revenue (simplified - in real app, you'd have booking/payment records)
    const hotelRevenue = hotels.reduce((sum, hotel) => {
      return sum + (hotel.pricing.basePrice * hotel.bookings.thisMonth);
    }, 0);

    const packageRevenue = packages.reduce((sum, pkg) => {
      return sum + (pkg.pricing.basePrice * pkg.bookings.thisMonth);
    }, 0);

    const totalRevenue = hotelRevenue + eventRevenue + packageRevenue;

    // Calculate average rating across all services
    const allRatings = [...hotels, ...packages].map(item => item.rating.average).filter(rating => rating > 0);
    const averageRating = allRatings.length > 0 
      ? Math.round((allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length) * 10) / 10 
      : 0;

    // Monthly data for charts (last 6 months)
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = month.toLocaleDateString('fr-FR', { month: 'short' });
      
      // Simplified calculation - in real app, you'd query actual booking records
      const monthlyRevenue = Math.floor(totalRevenue * (0.8 + Math.random() * 0.4));
      const monthlyBookings = Math.floor((hotelBookingsThisMonth + packageBookingsThisMonth) * (0.7 + Math.random() * 0.6));
      
      monthlyData.push({
        month: monthName,
        revenue: monthlyRevenue,
        bookings: monthlyBookings,
        clients: Math.floor(monthlyBookings * 0.8)
      });
    }

    // Top performing offers
    const topOffers = [
      ...hotels.map(hotel => ({
        name: hotel.name,
        type: 'hotel',
        bookings: hotel.bookings.thisMonth,
        revenue: hotel.pricing.basePrice * hotel.bookings.thisMonth,
        rating: hotel.rating.average
      })),
      ...events.map(event => ({
        name: event.title,
        type: 'event',
        bookings: event.tickets.sold,
        revenue: event.calculateRevenue(),
        rating: 4.5 // Events don't have ratings in our model, using default
      })),
      ...packages.map(pkg => ({
        name: pkg.name,
        type: 'package',
        bookings: pkg.bookings.thisMonth,
        revenue: pkg.pricing.basePrice * pkg.bookings.thisMonth,
        rating: pkg.rating.average
      }))
    ].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

    res.json({
      success: true,
      data: {
        overview: {
          totalRevenue,
          totalBookings: hotelBookingsThisMonth + packageBookingsThisMonth,
          totalClients: Math.floor((hotelBookingsThisMonth + packageBookingsThisMonth) * 0.8),
          averageRating,
          totalHotels,
          activeHotels,
          totalEvents,
          activeEvents,
          totalPackages,
          activePackages,
          totalRooms,
          totalTicketsSold
        },
        monthlyData,
        topOffers: topOffers.map(offer => ({
          ...offer,
          revenue: `${offer.revenue.toLocaleString()} MAD`
        }))
      }
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/statistics/revenue
// @desc    Get detailed revenue statistics
// @access  Private
router.get('/revenue', auth, async (req, res) => {
  try {
    const { period = '6months' } = req.query;
    const userId = req.user.id;

    // This is a simplified version - in a real app, you'd have detailed booking/payment records
    const hotels = await Hotel.find({ owner: userId });
    const events = await Event.find({ organizer: userId });
    const packages = await Package.find({ owner: userId });

    const revenueData = {
      hotels: hotels.reduce((sum, hotel) => sum + (hotel.pricing.basePrice * hotel.bookings.thisMonth), 0),
      events: events.reduce((sum, event) => sum + event.calculateRevenue(), 0),
      packages: packages.reduce((sum, pkg) => sum + (pkg.pricing.basePrice * pkg.bookings.thisMonth), 0)
    };

    const totalRevenue = Object.values(revenueData).reduce((sum, revenue) => sum + revenue, 0);

    res.json({
      success: true,
      data: {
        totalRevenue,
        breakdown: revenueData,
        currency: 'MAD'
      }
    });
  } catch (error) {
    console.error('Get revenue statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;