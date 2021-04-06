let router = require('express').Router();

const apiController = require('../controllers/agendamento-controller');

// router.post('/', apiController.adicionarAluno);

router.post('/', apiController.adicionarAgendamento);

router.get('/', apiController.listarAgendamento);

// router.get('/all', apiController.listarAll);

router.get('/:id', apiController.listarAgendamentoPorID);

router.put('/:id', apiController.atualizarAgendamento);

router.delete('/:id', apiController.removerAgendamento);

module.exports = router;