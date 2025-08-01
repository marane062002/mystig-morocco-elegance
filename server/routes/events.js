const express = require('express');
const { body, validationResult } = require('express-validator');
const Event = require('../models/Event');
const { auth, sellerOrAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events for the authenticated seller
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, type, city } = req.query;
    
    const query = { organizer: req.user.id };
    if (status) query.status = status;
    if (type) query.type = type;
    if (city) query['location.city'] = new RegExp(city, 'i');

    const events = await Event.find(query)
      .populate('organizer', 'name email')
      .sort({ 'date.start': 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Event.countDocuments(query);

    res.json({
      success: true,
      data: events,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      organizer: req.user.id
    }).populate('organizer', 'name email');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/events
// @desc    Create new event
// @access  Private
router.post('/', [
  auth,
  sellerOrAdmin,
  body('title').trim().isLength({ min: 2, max: 100 }).withMessage('Event title must be between 2 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('type').isIn(['festival', 'sport', 'culture', 'music', 'art', 'food', 'conference']).withMessage('Invalid event type'),
  body('date.start').isISO8601().withMessage('Start date must be a valid date'),
  body('date.end').isISO8601().withMessage('End date must be a valid date'),
  body('location.venue').notEmpty().withMessage('Venue is required'),
  body('location.city').notEmpty().withMessage('City is required'),
  body('tickets.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1')
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

    const eventData = {
      ...req.body,
      organizer: req.user.id,
      'tickets.available': req.body.tickets.capacity
    };

    const event = new Event(eventData);
    await event.save();

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private
router.put('/:id', [
  auth,
  sellerOrAdmin,
  body('title').optional().trim().isLength({ min: 2, max: 100 }),
  body('description').optional().trim().isLength({ min: 10, max: 2000 }),
  body('type').optional().isIn(['festival', 'sport', 'culture', 'music', 'art', 'food', 'conference'])
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

    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, organizer: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      message: 'Event updated successfully',
      data: event
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private
router.delete('/:id', auth, sellerOrAdmin, async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      organizer: req.user.id
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/events/:id/tickets/purchase
// @desc    Purchase event tickets
// @access  Private
router.post('/:id/tickets/purchase', [
  auth,
  body('ticketType').notEmpty().withMessage('Ticket type is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
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

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const { ticketType, quantity } = req.body;
    const ticketPricing = event.tickets.pricing.find(p => p.type === ticketType);

    if (!ticketPricing) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ticket type'
      });
    }

    if (ticketPricing.quantity - ticketPricing.sold < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough tickets available'
      });
    }

    // Update ticket sales
    ticketPricing.sold += quantity;
    event.tickets.sold += quantity;
    
    await event.save();

    const totalAmount = ticketPricing.price * quantity;

    res.json({
      success: true,
      message: 'Tickets purchased successfully',
      data: {
        event: event.title,
        ticketType,
        quantity,
        unitPrice: ticketPricing.price,
        totalAmount,
        currency: ticketPricing.currency
      }
    });
  } catch (error) {
    console.error('Purchase tickets error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;