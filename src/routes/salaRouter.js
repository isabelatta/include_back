const express = require('express');
const router = express.Router();
const SalaController = require('../controllers/SalaController')


router.get('/listar/:id', SalaController.listarSalas);
router.post('/cadastrar', SalaController.cadastrarSala);

module.exports = router;