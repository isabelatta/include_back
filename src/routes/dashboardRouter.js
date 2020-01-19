const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController')


router.get('/atividade/:id', DashboardController.getAtividade);
router.get('/listarEquipes/:id', DashboardController.listarEquipes);

module.exports = router;