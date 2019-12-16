const express = require('express');
const router = express.Router();
const AtividadeController = require('../controllers/AtividadeController')


router.get('/listarAssuntos', AtividadeController.listarAssuntos);
router.get('/listarAtividades/:id', AtividadeController.listarAtividadesPorAssunto);
router.get('/listarEntradasSaidas/:id', AtividadeController.listarEntradasSaidasPorAtividade);



module.exports = router;