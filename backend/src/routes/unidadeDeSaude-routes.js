let router = require('express').Router();

const apiController = require('../controllers/unidadeSaude-controller');

// router.post('/', apiController.adicionarAluno);

router.post('/', apiController.adicionarUnidade);

router.get('/', apiController.listarUnidade);

router.get('/:id', apiController.listarUnidadePorID);

router.put('/:id', apiController.atualizarUnidade);

router.delete('/:id', apiController.removerUnidade);

module.exports = router;