const mongoose = require('mongoose');

const unidadeSaudeSchema = new mongoose.Schema({
    nome_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    descriacao_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    endereco_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    telefone_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    latlong_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    pessoa: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'pessoa',
        require: true,
    }]
});


let UnidadeSaude = module.exports = mongoose.model('unidadeSaude', unidadeSaudeSchema);

module.exports.get = function(callback, limit){
    UnidadeSaude.find(callback).limit(limit);
}