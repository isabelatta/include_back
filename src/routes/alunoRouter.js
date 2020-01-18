const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/AlunoController')


router.get('/inserirCodigo/:codigo', AlunoController.inserirCodigo);
router.get('/infoSala/:codigo', AlunoController.infoSala);
router.get('/entradaSaidas/:codigo', AlunoController.entradaSaidas);
router.post('/salvarEquipe', AlunoController.salvarEquipe);
router.post('/salvarCodigo', AlunoController.salvarCodigo);
router.put('/editarCodigo', AlunoController.editarCodigo);
router.get('/consultarCodigo/:equipe', AlunoController.consultarCodigo);

module.exports = router;