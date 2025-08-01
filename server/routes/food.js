const express = require('express');
const { auth, sellerOrAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/food
// @desc    Get food experiences
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Mock data for food experiences
    const foodExperiences = [
      {
        id: 1,
        name: 'Cours de Cuisine Marocaine',
        type: 'cooking-class',
        description: 'Apprenez à préparer un tajine authentique avec un chef local',
        duration: '3 heures',
        price: 450,
        currency: 'MAD',
        location: 'Riad traditionnel, Médina de Marrakech',
        includes: ['Ingrédients', 'Recettes', 'Dégustation', 'Certificat'],
        maxParticipants: 8,
        difficulty: 'Débutant',
        status: 'available'
      },
      {
        id: 2,
        name: 'Dîner Gastronomique au Palais',
        type: 'fine-dining',
        description: 'Expérience culinaire raffinée dans un palais historique',
        duration: '2.5 heures',
        price: 850,
        currency: 'MAD',
        location: 'Palais Bahia, Marrakech',
        includes: ['Menu 7 services', 'Vins sélectionnés', 'Spectacle traditionnel'],
        maxParticipants: 20,
        difficulty: 'Tous niveaux',
        status: 'available'
      },
      {
        id: 3,
        name: 'Tour Gastronomique des Souks',
        type: 'food-tour',
        description: 'Découverte des saveurs locales dans les souks de Fès',
        duration: '4 heures',
        price: 320,
        currency: 'MAD',
        location: 'Médina de Fès',
        includes: ['Guide expert', 'Dégustations multiples', 'Thé à la menthe'],
        maxParticipants: 12,
        difficulty: 'Tous niveaux',
        status: 'available'
      }
    ];

    res.json({
      success: true,
      data: foodExperiences
    });
  } catch (error) {
    console.error('Get food experiences error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;