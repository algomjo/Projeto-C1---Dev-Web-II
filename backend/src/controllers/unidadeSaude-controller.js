const unidadeDeSaudeModel = require('../models/unidadeSaude-model');
const pessoaModel = require('../models/pessoa-model');
const agendamentoModel = require('../models/agendamento-model');


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

exports.adicionarUnidade = async (req, res) => {
try {
  unidadeDeSaudeModel.find((err, unidade) => {
    if(err){
        console.log("Não foi possível recuperar a unidade de saúde!");
        res.json({
            status: "erro",
            message: "Não foi possível recuperar as unidades de saúde e portanto inserir uma nova unidade de saúde!"
        });
    }
    //Eu tenho a lista dos alunos

    for(let i = 0; i < unidade.length; i++){
        if(req.body.email_unidade === unidade[i].email_unidade){
            res.json({
                status: "erro",
                message: `A unidade de saúde ${req.body.nome_unidade} já está cadastrado no sistema com e-mail: ${req.body.email_unidade}`
            });
            return;
        }
    }

    let newUnidade = new unidadeDeSaudeModel();
    newUnidade.nome_unidade = req.body.nome_unidade;
    newUnidade.descriacao_unidade = req.body.descriacao_unidade;
    newUnidade.endereco_unidade = req.body.endereco_unidade;
    newUnidade.telefone_unidade = req.body.telefone_unidade;
    newUnidade.email_unidade = req.body.email_unidade;
    newUnidade.latlong_unidade = req.body.latlong_unidade;
    
  
    
    newUnidade.save((erro) => {
        if(erro){
            res.send({
                status: "erro",
                message: "Não foi possível inserir o aluno."
            });
        }else{
            res.send({
                status: "ok",
                message: `Unidade ${req.body.nome_unidade} inserida com sucesso!`
            });
        }
    })
});


  
  // const {nome_unidade, descriacao_unidade, endereco_unidade, telefone_unidade, email_unidade, latlong_unidade} = req.body; 
  // const unidadeDeSaude = await unidadeDeSaudeModel.create({nome_unidade, descriacao_unidade, endereco_unidade, telefone_unidade, email_unidade, latlong_unidade});
  // res.json(unidadeDeSaude);

} catch (error) {
  console.log(error);
  res.status(400).json({ error: "Erro ao criar nova unidade de saúde" });
}

}



exports.listarUnidade = async (req, res) => {

  try {
       
const unidadeDeSaude = await unidadeDeSaudeModel.find().populate(['pessoa', 'unidadeSaude', 'agendamento' ]);
return res.json({ unidadeDeSaude })    

   } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error loading projects" });
   }
}

exports.listarUnidadePorID = async (req, res) => {
  try {
       
    const unidadeDeSaude = await unidadeDeSaudeModel.findById(req.params.id);
    return res.send({ unidadeDeSaude })    
    
       } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao localizar a unidade" });
       }
}

exports.atualizarUnidade = (req, res) => {
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

exports.removerUnidade = async (req, res) => {
  try {
       
    const unidadeDeSaude = await unidadeDeSaudeModel.findByIdAndRemove(req.params.id);
    return res.json({ status: "ok",
                      message: `Unidade de saúde ID: ${req.params.id}, removido com sucesso!`

    })    
    
       } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao deletar a unidade de saúde!" });
       }
}