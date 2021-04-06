const mongoose = require('mongoose');

const pessoaSchema = new mongoose.Schema({
    unidade_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    nome_pessoa: {
        type: mongoose.Schema.Types.String,
        default: Date.now,
        require: false
    },
    cpf_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    data_nascimento: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    telefone_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    grupo_prioritario: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    endereço_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email_pessoa: {
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