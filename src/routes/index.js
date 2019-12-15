const express = require('express');
const router = express.Router();
const UsuarioRouter = require('./usuarioRouter');
const SalaRouter = require('./salaRouter');
const AtividadeRouter = require('./atividadeRouter');

router.use('/usuario', UsuarioRouter);
router.use('/sala', SalaRouter);
router.use('/atividade', AtividadeRouter);

module.exports = router