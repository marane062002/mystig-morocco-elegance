const express = require('express');
const { auth, sellerOrAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/transport
// @desc    Get transport services
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Mock data for transport services
    const transportServices = [
      {
        id: 1,
        type: 'airport-transfer',
        name: 'Transfert Aéroport VIP',
        description: 'Service de transfert privé depuis/vers l\'aéroport',
        price: 250,
        currency: 'MAD',
        capacity: 4,
        features: ['Chauffeur professionnel', 'Véhicule climatisé', 'WiFi gratuit'],
        status: 'active'
      },
      {
        id: 2,
        type: 'taxi',
        name: 'Taxi Premium Marrakech',
        description: 'Service de taxi haut de gamme dans Marrakech',
        price: 80,
        currency: 'MAD',
        capacity: 4,
        features: ['Véhicule récent', 'Chauffeur expérimenté', 'Climatisation'],
        status: 'active'
      },
      {
        id: 3,
        type: 'bus',
        name: 'Navette Touristique',
        description: 'Transport en groupe pour excursions',
        price: 35,
        currency: 'MAD',
        capacity: 25,
        features: ['Guide touristique', 'Arrêts multiples', 'Confortable'],
        status: 'active'
      }
    ];

    res.json({
      success: true,
      data: transportServices
    });
  } catch (error) {
    console.error('Get transport services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;