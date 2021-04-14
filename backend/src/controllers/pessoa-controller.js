const unidSaudeModel = require('../models/unidadeSaude-model');
const pesModel = require('../models/pessoa-model');
const agendModel = require('../models/agendamento-model');

const mongoose = require('mongoose');



exports.listarAll = async (req, res) => {
    const unidades = await unidSaudeModel.find();
    const pessoas = await pesModel.find();

    const schemas = [];

    mongoose.modelNames().forEach(function(modelName){
        schemas.push(mongoose.model(modelName).schema.obj);
    })

    const novoObj = {
        Unidades:  unidades, 
        Pessoas:   pessoas

    }

    res.json(schemas)

};

exports.adicionarPessoa = async (req, res) => {
try {    
    pesModel.find((err, pessoa) => {
    if(err){
        console.log("Não foi possível recuperar o usuario!");
        res.json({
            status: "erro",
            message: "Não foi possível recuperar os usuarios e inserir novo usuario!"
        });
    }
    //Eu tenho a lista dos alunos

    for(let i = 0; i < pessoa.length; i++){
        if(req.body.cpfPessoa === pessoa[i].cpfPessoa){
            res.json({
                status: "erro",
                message: `Usuário  ${req.body.nomePessoa}, já está cadastrado no sistema com o CPF: ${req.body.cpfPessoa}`
            });
            return;
        }
    }

    let newPessoa = new pesModel();
    newPessoa.unidade_id =  req.body.unidade_id;
    newPessoa.nomePessoa = req.body.nomePessoa;
    newPessoa.cpfPessoa = req.body.cpfPessoa;
    newPessoa.dataNascimento = req.body.dataNascimento;
    newPessoa.telefonePessoa = req.body.telefonePessoa;
    newPessoa.grupoPrioritario = req.body.grupoPrioritario;
    newPessoa.endereçoPessoa = req.body.endereçoPessoa;
    newPessoa.emailPessoa = req.body.emailPessoa;
    
  
    
    newPessoa.save((erro) => {
        if(erro){
            res.send({
                status: "erro",
                message: "Não foi possível inserir o novo usuário."
            });
        }else{
            res.send({
                status: "ok",
                message: `Usuário ${req.body.nomePessoa}, inserida com sucesso!`
            });
        }
    })
});




} catch (error) {
  console.log(error);
  res.status(400).json({ error: "Erro ao criar nova unidade de saúde" });
}

}



exports.listarPessoa = async (req, res) => {
try {
       
const pessoas = await pesModel.find();
return res.json({ pessoas })    

   } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao carregar Lista de Pessoas" });
   }
}

exports.listarPessoaPorID = async (req, res) => {
  try {
       
    const unidadeSaude = await pesModel.findById(req.params.id);
    return res.send({ unidadeSaude })    
    
       } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao localizar a unidade" });
       }
}

exports.atualizarPessoa = (req, res) => {
  let idUnidade = req.params.id;

  unidSaudeModel.findById(idUnidade, (erro, unidade) => {
      if(erro || !unidade){
          console.log("Não foi possível recuperar Unidades de Saúde!");
          res.json({
              status: "erro",
              message: `Não foi possível recuperar unidade de saúde de id ${idUnidade} para atualização!`
          });
      }else{
        unidade.nomeUnidade = req.body.nomeUnidade;
        unidade.descricaoUnidade = req.body.descricaoUnidade;
        unidade.endUnidade = req.body.endUnidade;
        unidade.telUnidade = req.body.telUnidade;
        unidade.emailUnidade = req.body.emailUnidade;
        unidade.latlongUnidade = req.body.latlongUnidade;
      
        unidade.save((err => {
              if(err){
                  res.json({
                      status: "erro",
                      message: "Houve um erro ao atualizar da unidade de saúde!"
                  });
              }else{
                  res.json({
                      status: "ok",
                      message: `Unidade de saúde ${unidade.nomeUnidade} atualizado com sucesso!`,
                      novoUnidade: unidade
                  })
              }
          }))
      }
  });  
}

exports.removerPessoa = async (req, res) => {
  try {
       
    const pessoa = await pesModel.findByIdAndRemove(req.params.id);
    return res.json({ status: "ok",
                      message: `Usuário ID: ${req.params.id}, removido com sucesso!`

    })    
    
       } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao deletar o usuário!" });
       }
}