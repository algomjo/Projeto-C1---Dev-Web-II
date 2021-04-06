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


exports.adicionarAgendamento = async (req, res) => {
try {    
    agendamentoModel.find((err, pessoa) => {
    if(err){
        console.log("Não foi possível recuperar o agendamento!");
        res.json({
            status: "erro",
            message: "Não foi possível recuperar agendamento e portanto inserir um novo agendamento!"
        });
    }
    //Eu tenho a lista dos alunos

    for(let i = 0; i < pessoa.length; i++){
        if(req.body.cpf_pessoa === pessoa[i].cpf_pessoa){
            res.json({
                status: "erro",
                message: `Já existe um agendamento marcado para data ${req.body.data_hora_agendamento}`
            });
            return;
        }
    }

    let neAgendamento = new agendamentoModel();
    neAgendamento.pessoa_id =  req.body.pessoa_id;
    neAgendamento.data_hora_agendamento = req.body.data_hora_agendamento;
    neAgendamento.necessidade_especiais = req.body.necessidade_especiais;
    newPessoa.observação_agendamento = req.body.observação_agendamento; 
  
    
    neAgendamento.save((erro) => {
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
       
const agendamento = await agendamentoModel.find();
return res.json({ agendamento })    

   } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao carregar Lista de horario disponivel" });
   }
}

exports.listarAgendamentoPorID = async (req, res) => {
  try {
       
    const unidadeDeSaude = await agendamentoModel.findById(req.params.id);
    return res.send({ unidadeDeSaude })    
    
       } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao localizar a horario de agendamento" });
       }
}

exports.atualizarAgendamento = (req, res) => {
  let id_Agendamento = req.params.id;

  agendamentoModel.findById(id_Agendamento, (erro, agendamento) => {
      if(erro || !unidade){
          console.log("Não foi possível recuperar as Unidades de Saúde!");
          res.json({
              status: "erro",
              message: `Não foi possível recuperar a unidade de saúde de id ${id_Agendamento} para atualização!`
          });
      }else{
        agendamento.pessoa_id =  req.body.pessoa_id;
        agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
        agendamento.necessidade_especiais = req.body.necessidade_especiais;
        agendamento.observação_agendamento = req.body.observação_agendamento; 
      
      
        agendamento.save((err => {
              if(err){
                  res.json({
                      status: "erro",
                      message: "Houve um erro ao atualizar o agendamento de saúde!"
                  });
              }else{
                  res.json({
                      status: "ok",
                      message: `Agendamento ${data_hora_agendamento}, atualizado com sucesso!`,
                      novoAgendamento: agendamento
                  })
              }
          }))
      }
  });  
}

exports.removerAgendamento = async (req, res) => {
  try {
       
    const pessoa = await agendamentoModel.findByIdAndRemove(req.params.id);
    return res.json({ status: "ok",
                      message: `Usuário ID: ${req.params.id}, removido com sucesso!`

    })    
    
       } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao deletar o usuário!" });
       }
}