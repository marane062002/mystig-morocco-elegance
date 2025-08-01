const express = require('express');
const { body, validationResult } = require('express-validator');
const Package = require('../models/Package');
const { auth, sellerOrAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/packages
// @desc    Get all packages for the authenticated seller
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, type } = req.query;
    
    const query = { owner: req.user.id };
    if (status) query.status = status;
    if (type) query.type = type;

    const packages = await Package.find(query)
      .populate('owner', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Package.countDocuments(query);

    res.json({
      success: true,
      data: packages,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get packages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/packages
// @desc    Create new package
// @access  Private
router.post('/', [
  auth,
  sellerOrAdmin,
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Package name must be between 2 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('type').isIn(['adventure', 'cultural', 'luxury', 'family', 'romantic', 'business', 'group']).withMessage('Invalid package type'),
  body('duration.days').isInt({ min: 1 }).withMessage('Duration must be at least 1 day'),
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

    const packageData = {
      ...req.body,
      owner: req.user.id
    };

    const package = new Package(packageData);
    await package.save();

    res.status(201).json({
      success: true,
      message: 'Package created successfully',
      data: package
    });
  } catch (error) {
    console.error('Create package error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;