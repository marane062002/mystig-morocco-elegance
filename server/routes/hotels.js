const express = require('express');
const { body, validationResult } = require('express-validator');
const Hotel = require('../models/Hotel');
const { auth, sellerOrAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/hotels
// @desc    Get all hotels for the authenticated seller
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, city } = req.query;
    
    const query = { owner: req.user.id };
    if (status) query.status = status;
    if (city) query['location.city'] = new RegExp(city, 'i');

    const hotels = await Hotel.find(query)
      .populate('owner', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Hotel.countDocuments(query);

    res.json({
      success: true,
      data: hotels,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get hotels error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/hotels/:id
// @desc    Get single hotel
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const hotel = await Hotel.findOne({
      _id: req.params.id,
      owner: req.user.id
    }).populate('owner', 'name email');

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    res.json({
      success: true,
      data: hotel
    });
  } catch (error) {
    console.error('Get hotel error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/hotels
// @desc    Create new hotel
// @access  Private
router.post('/', [
  auth,
  sellerOrAdmin,
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Hotel name must be between 2 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('location.address').notEmpty().withMessage('Address is required'),
  body('location.city').notEmpty().withMessage('City is required'),
  body('rooms.total').isInt({ min: 1 }).withMessage('Total rooms must be at least 1'),
  body('pricing.basePrice').isFloat({ min: 0 }).withMessage('Base price must be a positive number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const hotelData = {
      ...req.body,
      owner: req.user.id,
      'rooms.available': req.body.rooms.total
    };

    const hotel = new Hotel(hotelData);
    await hotel.save();

    res.status(201).json({
      success: true,
      message: 'Hotel created successfully',
      data: hotel
    });
  } catch (error) {
    console.error('Create hotel error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/hotels/:id
// @desc    Update hotel
// @access  Private
router.put('/:id', [
  auth,
  sellerOrAdmin,
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('description').optional().trim().isLength({ min: 10, max: 1000 }),
  body('pricing.basePrice').optional().isFloat({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const hotel = await Hotel.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    res.json({
      success: true,
      message: 'Hotel updated successfully',
      data: hotel
    });
  } catch (error) {
    console.error('Update hotel error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/hotels/:id
// @desc    Delete hotel
// @access  Private
router.delete('/:id', auth, sellerOrAdmin, async (req, res) => {
  try {
    const hotel = await Hotel.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    res.json({
      success: true,
      message: 'Hotel deleted successfully'
    });
  } catch (error) {
    console.error('Delete hotel error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/hotels/:id/reviews
// @desc    Add review to hotel
// @access  Private
router.post('/:id/reviews', [
  auth,
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    // Check if user already reviewed this hotel
    const existingReview = hotel.reviews.find(
      review => review.user.toString() === req.user.id
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this hotel'
      });
    }

    const review = {
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment
    };

    hotel.reviews.push(review);
    await hotel.calculateAverageRating();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: hotel
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;