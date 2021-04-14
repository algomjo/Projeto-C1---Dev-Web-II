const unidSaudeModel = require('../models/unidadeSaude-model');
const pesModel = require('../models/pessoa-model');
const agendModel = require('../models/agendamento-model');



exports.adicionarUnidade = async (req, res) => {
try {
  unidSaudeModel.find((err, unidade) => {
    if(err){
        console.log("Não foi possível recuperar a unidade de saúde!");
        res.json({
            status: "erro",
            message: "Não foi possível recuperar unidades de saúde e inserir uma nova unidade de saúde!"
        });
    }
    //Eu tenho a lista dos alunos

    for(let i = 0; i < unidade.length; i++){
        if(req.body.emailUnidade === unidade[i].emailUnidade){
            res.json({
                status: "erro",
                message: `A unidade de saúde ${req.body.nomeUnidade} já está cadastrado no sistema com e-mail: ${req.body.emailUnidade}`
            });
            return;
        }
    }

    let novaUnidade = new unidSaudeModel();
    novaUnidade.nomeUnidade = req.body.nomeUnidade;
    novaUnidade.descricaoUnidade = req.body.descricaoUnidade;
    novaUnidade.endUnidade = req.body.endUnidade;
    novaUnidade.telUnidade = req.body.telUnidade;
    novaUnidade.emailUnidade = req.body.emailUnidade;
    novaUnidade.latlongUnidade = req.body.latlongUnidade;
    
  
    
    novaUnidade.save((erro) => {
        if(erro){
            res.send({
                status: "erro",
                message: "Não foi possível inserir o aluno."
            });
        }else{
            res.send({
                status: "ok",
                message: `Unidade ${req.body.nomeUnidade} inserida com sucesso!`
            });
        }
    })
});


  


} catch (error) {
  console.log(error);
  res.status(400).json({ error: "Erro ao criar nova unidade de saúde" });
}

}



exports.listarUnidade = async (req, res) => {

  try {
       
const unidadeSaude = await unidSaudeModel.find().populate(['pessoa', 'unidadeSaude', 'agendamento' ]);
return res.json({ unidadeSaude })    

   } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error loading projects" });
   }
}

exports.listarUnidadePorID = async (req, res) => {
  try {
       
    const unidadeSaude = await unidSaudeModel.findById(req.params.id);
    return res.send({ unidadeSaude })    
    
       } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao localizar a unidade" });
       }
}

exports.atualizarUnidade = (req, res) => {
  let idUnidade = req.params.id;

  unidSaudeModel.findById(idUnidade, (erro, unidade) => {
      if(erro || !unidade){
          console.log("Não foi possível recuperar as Unidades de Saúde!");
          res.json({
              status: "erro",
              message: `Não foi possível recuperar a unidade de saúde de id ${idUnidade} para atualização!`
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

exports.removerUnidade = async (req, res) => {
  try {
       
    const unidadeSaude = await unidSaudeModel.findByIdAndRemove(req.params.id);
    return res.json({ status: "ok",
                      message: `Unidade de saúde ID: ${req.params.id}, removido com sucesso!`

    })    
    
       } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao deletar a unidade de saúde!" });
       }
}