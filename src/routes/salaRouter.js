const express = require('express');
const router = express.Router();
const SalaController = require('../controllers/SalaController')


router.get('/listar/:id', SalaController.listarSalas);
router.get('/infoSala/:id', SalaController.infoSala);
router.get('/entradasSaidas/:id', SalaController.entradaSaidas);
router.post('/cadastrar', SalaController.cadastrarSala);

module.exports = router;