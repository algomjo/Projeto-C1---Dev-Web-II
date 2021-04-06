const unidadeDeSaudeModel = require('../models/unidadeSaude-model');
const pessoaModel = require('../models/pessoa-model');
const agendamentoModel = require('../models/agendamento-model');

const mongoose = require('mongoose');


//Rota basica que cria unidade, pessoas, agendamentos
// exports.adicionarAluno = async (req, res) => {

  
//         try {    
          
             
//             //Criar documento unidade
//             let unidade = new unidadeDeSaudeModel();            
//             unidade.nome_unidade = req.body.nome_unidade; 
//             unidade.descriacao_unidade =  req.body.descriacao_unidade;
//             unidade.endereco_unidade =  req.body.endereco_unidade;
//             unidade.telefone_unidade =  req.body.telefone_unidade;
//             unidade.email_unidade =  req.body.email_unidade;
//             unidade.latlong_unidade =  req.body.latlong_unidade;
//             const unidadeDeSaude = await unidadeDeSaudeModel.create(unidade);

            
//            //Criar documento pessoas
//             let pessoa = new pessoaModel();
//             pessoa.nome_pessoa = req.body.pessoa.nome_pessoa;
//             pessoa.cpf_pessoa = req.body.pessoa.cpf_pessoa;
//             pessoa.data_nascimento = req.body.pessoa.data_nascimento;
//             pessoa.telefone_pessoa = req.body.pessoa.telefone_pessoa;
//             pessoa.grupo_prioritario = req.body.pessoa.grupo_prioritario;
//             pessoa.endereço_pessoa = req.body.pessoa.endereço_pessoa;
//             pessoa.email_pessoa = req.body.pessoa.email_pessoa;
//             pessoa.unidade_id = unidadeDeSaude._id;
//             const pessoas = await pessoaModel.create(pessoa);

//             let agendamentos = new agendamentoModel();
//             agendamentos.data_hora_agendamento =  req.body.pessoa.agendamento.data_hora_agendamento;
//             agendamentos.necessidade_especiais =  req.body.pessoa.agendamento.necessidade_especiais;
//             agendamentos.observação_agendamento =  req.body.pessoa.agendamento.observação_agendamento;
//             agendamentos.pessoa_id = pessoas._id;
//             const agendamento = await agendamentoModel.create(agendamentos);

//             // const {nome_pessoa, cpf_pessoa, data_nascimento, telefone_pessoa, grupo_prioritario , endereço_pessoa, email_pessoa} = req.body.pessoa;
//             // const pessoa = await pessoaModel.create(nome_pessoa, cpf_pessoa, data_nascimento, telefone_pessoa, grupo_prioritario , endereço_pessoa, email_pessoa);

           
          

       
//          return res.json(unidadeDeSaude, pessoas, agendamento ); 
         
//         } catch (error) {
//           console.log(error);
//           res.status(400).json({ error: "Erro ao criar unidade de saude" });
//         }
// }

exports.listarAll = async (req, res) => {
    const unidades = await unidadeDeSaudeModel.find();
    const pessoas = await pessoaModel.find();

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
    pessoaModel.find((err, pessoa) => {
    if(err){
        console.log("Não foi possível recuperar o usuario!");
        res.json({
            status: "erro",
            message: "Não foi possível recuperar os usuarios e portanto inserir um novo usuario!"
        });
    }
    //Eu tenho a lista dos alunos

    for(let i = 0; i < pessoa.length; i++){
        if(req.body.cpf_pessoa === pessoa[i].cpf_pessoa){
            res.json({
                status: "erro",
                message: `O usuário  ${req.body.nome_pessoa}, já está cadastrado no sistema com o CPF: ${req.body.cpf_pessoa}`
            });
            return;
        }
    }

    let newPessoa = new pessoaModel();
    newPessoa.unidade_id =  req.body.unidade_id;
    newPessoa.nome_pessoa = req.body.nome_pessoa;
    newPessoa.cpf_pessoa = req.body.cpf_pessoa;
    newPessoa.data_nascimento = req.body.data_nascimento;
    newPessoa.telefone_pessoa = req.body.telefone_pessoa;
    newPessoa.grupo_prioritario = req.body.grupo_prioritario;
    newPessoa.endereço_pessoa = req.body.endereço_pessoa;
    newPessoa.email_pessoa = req.body.email_pessoa;
    
  
    
    newPessoa.save((erro) => {
        if(erro){
            res.send({
                status: "erro",
                message: "Não foi possível inserir o novo usuário."
            });
        }else{
            res.send({
                status: "ok",
                message: `Usuário ${req.body.nome_pessoa}, inserida com sucesso!`
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
       
const pessoas = await pessoaModel.find();
return res.json({ pessoas })    

   } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao carregar Lista de Pessoas" });
   }
}

exports.listarPessoaPorID = async (req, res) => {
  try {
       
    const unidadeDeSaude = await pessoaModel.findById(req.params.id);
    return res.send({ unidadeDeSaude })    
    
       } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao localizar a unidade" });
       }
}

exports.atualizarPessoa = (req, res) => {
  let id_unidade = req.params.id;

  unidadeDeSaudeModel.findById(id_unidade, (erro, unidade) => {
      if(erro || !unidade){
          console.log("Não foi possível recuperar as Unidades de Saúde!");
          res.json({
              status: "erro",
              message: `Não foi possível recuperar a unidade de saúde de id ${id_unidade} para atualização!`
          });
      }else{
        unidade.nome_unidade = req.body.nome_unidade;
        unidade.descriacao_unidade = req.body.descriacao_unidade;
        unidade.endereco_unidade = req.body.endereco_unidade;
        unidade.telefone_unidade = req.body.telefone_unidade;
        unidade.email_unidade = req.body.email_unidade;
        unidade.latlong_unidade = req.body.latlong_unidade;
      
        unidade.save((err => {
              if(err){
                  res.json({
                      status: "erro",
                      message: "Houve um erro ao atualizar da unidade de saúde!"
                  });
              }else{
                  res.json({
                      status: "ok",
                      message: `Unidade de saúde ${unidade.nome_unidade} atualizado com sucesso!`,
                      novoUnidade: unidade
                  })
              }
          }))
      }
  });  
}

exports.removerPessoa = async (req, res) => {
  try {
       
    const pessoa = await pessoaModel.findByIdAndRemove(req.params.id);
    return res.json({ status: "ok",
                      message: `Usuário ID: ${req.params.id}, removido com sucesso!`

    })    
    
       } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao deletar o usuário!" });
       }
}