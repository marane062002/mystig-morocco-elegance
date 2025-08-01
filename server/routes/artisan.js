const express = require('express');
const { auth, sellerOrAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/artisan
// @desc    Get artisan products
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Mock data for artisan products
    const artisanProducts = [
      {
        id: 1,
        name: 'Tapis Berbère Authentique',
        category: 'textiles',
        description: 'Tapis tissé à la main par les artisans berbères de l\'Atlas',
        price: 1200,
        currency: 'MAD',
        origin: 'Atlas Mountains',
        craftsman: 'Coopérative Féminine Tafraout',
        materials: ['Laine naturelle', 'Teintures végétales'],
        dimensions: '200x150 cm',
        status: 'available'
      },
      {
        id: 2,
        name: 'Poterie de Salé',
        category: 'ceramics',
        description: 'Céramique traditionnelle de Salé, décorée à la main',
        price: 350,
        currency: 'MAD',
        origin: 'Salé',
        craftsman: 'Atelier Benali',
        materials: ['Argile locale', 'Émaux traditionnels'],
        dimensions: '25x25 cm',
        status: 'available'
      },
      {
        id: 3,
        name: 'Bijoux en Argent Amazigh',
        category: 'jewelry',
        description: 'Bijoux traditionnels amazigh en argent massif',
        price: 800,
        currency: 'MAD',
        origin: 'Tiznit',
        craftsman: 'Maître Orfèvre Hassan',
        materials: ['Argent 925', 'Pierres semi-précieuses'],
        dimensions: 'Collier 45 cm',
        status: 'available'
      }
    ];

    res.json({
      success: true,
      data: artisanProducts
    });
  } catch (error) {
    console.error('Get artisan products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;