const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController')


router.post('/auth', UsuarioController.auth);
router.post('/cadastrar', UsuarioController.cadastrar);



module.exports = router;