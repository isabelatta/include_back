const express = require('express');
const router = express.Router();
const AtividadeController = require('../controllers/AtividadeController')


router.get('/listarAssuntos', AtividadeController.listarAssuntos);
router.get('/listarAtividades/:id', AtividadeController.listarAtividadesPorAssunto);
router.get('/listarEntradasSaidas/:id/:sala_id', AtividadeController.listarEntradasSaidasPorAtividade);
router.post('/cadastrar', AtividadeController.cadastrarAtividade);
router.post('/cadastrarEntradaSaida', AtividadeController.cadastrarEntradaSaida);
router.get('/desfazerAtividade/:sala_id', AtividadeController.desfazerAtividade);

module.exports = router;