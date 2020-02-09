const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController')


router.get('/atividade/:id', DashboardController.getAtividade);
router.get('/listarEquipes/:id', DashboardController.listarEquipes);
router.get('/salaEstado/:id', DashboardController.salaEstado);

module.exports = router;