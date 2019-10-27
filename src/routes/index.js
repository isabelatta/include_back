const express = require('express');
const router = express.Router();
const UsuarioRouter = require('./usuarioRouter');

router.use('/usuario', UsuarioRouter);

module.exports = router