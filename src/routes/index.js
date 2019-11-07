const express = require('express');
const router = express.Router();
const UsuarioRouter = require('./usuarioRouter');
const SalaRouter = require('./salaRouter');

router.use('/usuario', UsuarioRouter);
router.use('/sala', SalaRouter);

module.exports = router