const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/AlunoController')


router.get('/inserirCodigo/:codigo', AlunoController.inserirCodigo);
router.get('/infoSala/:codigo', AlunoController.infoSala);
router.get('/entradaSaidas/:codigo', AlunoController.entradaSaidas);


module.exports = router;