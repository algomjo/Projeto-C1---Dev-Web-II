const mongoose = require('mongoose');

const agendamentoSchema = new mongoose.Schema({
    pessoa_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    data_hora_agendamento: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
        require: false
    },
    necessidade_especiais: {
        type: mongoose.Schema.Types.Boolean,
        require: false
    },
    observação_agendamento: {
        type: mongoose.Schema.Types.String,
        require: false
    }
   });


let Agendamento = module.exports = mongoose.model('agendamento', agendamentoSchema);

module.exports.get = function(callback, limit){
    Agendamento.find(callback).limit(limit);
}