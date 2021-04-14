const mongoose = require('mongoose');

const unidadeSaudeSchema = new mongoose.Schema({
    nomeUnidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    descricaoUnidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    endUnidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    telUnidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    emailUnidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    latlongUnidade: {
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