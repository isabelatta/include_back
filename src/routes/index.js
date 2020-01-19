const express = require('express');
const router = express.Router();
const UsuarioRouter = require('./usuarioRouter');
const SalaRouter = require('./salaRouter');
const AtividadeRouter = require('./atividadeRouter');
const AlunoRouter = require('./alunoRouter');
const DashboardRouter = require('./dashboardRouter');

router.use('/usuario', UsuarioRouter);
router.use('/sala', SalaRouter);
router.use('/atividade', AtividadeRouter);
router.use('/aluno', AlunoRouter);
router.use('/dashboard', DashboardRouter);

module.exports = router