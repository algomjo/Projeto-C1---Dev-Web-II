let router = require('express').Router();

const apiController = require('../controllers/agendamento-controller');

// router.post('/', apiController.adicionarAluno);

router.post('/', apiController.adicionarAgendamento);

router.get('/', apiController.listarAgendamento);

// router.get('/all', apiController.listarAll);

router.get('/:id', apiController.listarAgendamentoID);

router.put('/:id', apiController.atualizarAgendam);

router.delete('/:id', apiController.removerAgendamento);

module.exports = router;