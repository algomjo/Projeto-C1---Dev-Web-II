const agendModel = require('../models/agendamento-model');

const mongoose = require('mongoose');





exports.adicionarAgendamento = async (req, res) => {
try {    
    agendModel.find((err, pessoa) => {
    if(err){
        console.log("Não foi possível recuperar o agendamento!");
        res.json({
            status: "erro",
            message: "Não foi possível recuperar agendamento e portanto inserir um novo agendamento!"
        });
    }
    //Eu tenho a lista dos alunos

    for(let i = 0; i < pessoa.length; i++){
        if(req.body.cpfPessoa === pessoa[i].cpfPessoa){
            res.json({
                status: "erro",
                message: `Já existe um agendamento marcado para data ${req.body.dataHoraAgendamento}`
            });
            return;
        }
    }

    let n_Agendamento = new agendModel();
    n_Agendamento.pessoa_id =  req.body.pessoa_id;
    n_Agendamento.dataHoraAgendamento = req.body.dataHoraAgendamento;
    n_Agendamento.necEspeciais = req.body.necEspeciais;
    newPessoa.obsAgendamento = req.body.obsAgendamento; 
  
    
    n_Agendamento.save((erro) => {
        if(erro){
            res.send({
                status: "erro",
                message: "Não foi possível inserir o novo agendamento."
            });
        }else{
            res.send({
                status: "ok",
                message: `Usuário ID: ${req.body.pessoa_id}, agendado com sucesso com sucesso!`
            });
        }
    })
});




} catch (error) {
  console.log(error);
  res.status(400).json({ error: "Erro ao agendar um novo horario" });
}

}



exports.listarAgendamento = async (req, res) => {
try {
       
const agendamento = await agendModel.find();
return res.json({ agendamento })    

   } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao carregar Lista de horário" });
   }
}

exports.listarAgendamentoID = async (req, res) => {
  try {
       
    const unidadeSaude = await agendModel.findById(req.params.id);
    return res.send({ unidadeSaude })    
    
       } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao localizar a horário de agendamento" });
       }
}

exports.atualizarAgendam = (req, res) => {
  let id_Agendamento = req.params.id;

  agendModel.findById(id_Agendamento, (erro, agendamento) => {
      if(erro || !unidade){
          console.log("Não foi possível recuperar Unidades de Saúde!");
          res.json({
              status: "erro",
              message: `Não foi possível recuperar unidade de saúde de id ${id_Agendamento} para atualização!`
          });
      }else{
        agendamento.pessoa_id =  req.body.pessoa_id;
        agendamento.dataHoraAgendamento = req.body.dataHoraAgendamento;
        agendamento.necEspeciais = req.body.necEspeciais;
        agendamento.obsAgendamento = req.body.obsAgendamento; 
      
      
        agendamento.save((err => {
              if(err){
                  res.json({
                      status: "erro",
                      message: "Houve um erro ao atualizar o agendamento!"
                  });
              }else{
                  res.json({
                      status: "ok",
                      message: `Agendamento ${dataHoraAgendamento}, atualizado!`,
                      novoAgendamento: agendamento
                  })
              }
          }))
      }
  });  
}

exports.removerAgendamento = async (req, res) => {
  try {
       
    const pessoa = await agendModel.findByIdAndRemove(req.params.id);
    return res.json({ status: "ok",
                      message: `Usuário ID: ${req.params.id}, removido!`

    })    
    
       } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao deletar o usuário!" });
       }
}