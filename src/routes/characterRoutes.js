const express = require('express');
const characterController = require('../controller/characterController');

const router = express.Router();

// Rutas para personajes
router.get('/', characterController.getAllCharacters);
router.get('/:id', characterController.getCharacterById);
router.post('/', characterController.createCharacter);
router.put('/:id', characterController.updateCharacter);
router.delete('/:id', characterController.deleteCharacter);

module.exports = router;