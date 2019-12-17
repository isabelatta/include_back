const connection = require("../../connection.js")
const returnMsg = require('../uteis/returnMsg');
const httpStatus = require('../uteis/httpStatus');

class AtividadeController {

  constructor () {}

  listarAssuntos (req, res) {

    connection.query('SELECT * FROM assunto',  function (error, results, fields) {
      if(error){
        return res
          .status(httpStatus.SERVER_ERROR)
      } else {
          if (results.length > 0) {
            return res
            .send(results)
          } else {
            return res
              .status(httpStatus.BAD_REQUEST)
              .send({
                errorMsg: returnMsg.EMPTY_CLASS
              });
          }
        }
    });
  };

  listarAtividadesPorAssunto (req, res) {
    const { id } = req.params;

    connection.query('SELECT * FROM atividade WHERE assunto_id = ?', id,  function (error, results, fields) {
      if(error){
        return res
          .status(httpStatus.SERVER_ERROR)
      } else {
          if (results.length > 0) {
            return res
            .send(results)
          } else {
            return res
              .status(httpStatus.BAD_REQUEST)
              .send({
                errorMsg: returnMsg.EMPTY_CLASS
              });
          }
        }
    });
  }

  listarEntradasSaidasPorAtividade (req, res) {
    const { id } = req.params;

    connection.query('SELECT * FROM entrada_saida WHERE ativ_id = ? AND sala_id is NULL', id,  function (error, results, fields) {
      if(error){
        return res
          .status(httpStatus.SERVER_ERROR)
      } else {
          if (results.length > 0) {
            return res
            .send(results)
          } else {
            return res
              .status(httpStatus.BAD_REQUEST)
              .send({
                errorMsg: returnMsg.EMPTY_CLASS
              });
          }
        }
    });
  }

  cadastrarAtividade(req,res) {
  
    connection.beginTransaction(function(err) {
      if (err) {
        throw err;
      }

      const sala_id = req.body.salaId;
      const entradasSaidas = req.body.entradaSaidaIds;

      const values = [];

      entradasSaidas.forEach(eS => {
        const insert = [sala_id, eS];
        values.push(insert);
      });

      console.log(values);

      // const inserts = {
      //   usu_id: req.body.usuario,
      //   nome: req.body.nome, 
      //   descri: req.body.descri,
      //   data: new Date(req.body.data),
      //   aberta: req.body.aberta
      // };


      const ativ_id = req.body.atividade

      connection.query('UPDATE sala SET ativ_id = ? WHERE id = ?', [ativ_id, sala_id] ,
      function (error, results, fields) {
        if (error) {
          connection.rollback();
          return res
          .status(httpStatus.BAD_REQUEST)
          .send({
            errorMsg: error
          });
        }
        connection.query('INSERT INTO sala_entrada_saida (sala_id, ent_sai_id) VALUES ?', [values] ,
        function (error, results, fields) {
          if (error) {
            connection.rollback();
            return res
            .status(httpStatus.BAD_REQUEST)
            .send({
              errorMsg: error
            });
          }
          connection.commit(function(err) {
            if (err) {
              return connection.rollback(function() {
                throw err;
              });
            }
            return res
            .status(httpStatus.SUCCESS)
          });
        });
      });
      
    }); 
  };

  
}

module.exports = new AtividadeController()