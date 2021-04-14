const mongoose = require('mongoose');

const pessoaSchema = new mongoose.Schema({
    unidade_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    nomePessoa: {
        type: mongoose.Schema.Types.String,
        default: Date.now,
        require: false
    },
    cpfPessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    dataNascimento: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    telefonePessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    grupoPrioritario: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    endereçoPessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    emailPessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    //pertecem a unidade de saudes
    agendamento: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'agendamento', 
        require: false
    },
    
});


let pessoa = module.exports = mongoose.model('pessoa', pessoaSchema);

module.exports.get = function(callback, limit){
    Pessoa.find(callback).limit(limit);
}