const express = require('express');
const router = express.Router();
const AtividadeController = require('../controllers/AtividadeController')


router.get('/listarAssuntos', AtividadeController.listarAssuntos);



module.exports = router;