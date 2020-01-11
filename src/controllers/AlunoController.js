const connection = require("../../connection.js")
const returnMsg = require('../uteis/returnMsg');
const httpStatus = require('../uteis/httpStatus');

class AlunoController {

  constructor () {}

  inserirCodigo (req,res) {

    const values = [req.params.codigo]

    connection.query('SELECT codigo FROM sala WHERE aberta = 1 AND codigo = ?', values, function (error, results, fields) {
        if(error){
          return res
            .status(httpStatus.SERVER_ERROR)
        } else {
          if (results.length > 0){
            const sala = results[0];
              return res
              .status(httpStatus.SUCCESS)
              .send({
                auth: true,
                codigo: sala.codigo,
              });
          }
          return res
          .status(httpStatus.BAD_REQUEST)
          .send({
            errorMsg: returnMsg.SALA_NOT_FOUND
          });
          
        }
    });
    
  };

  infoSala (req,res) {

    const values = [req.params.codigo]

    connection.query(`SELECT *, s.id as sala_id FROM sala s 
                      INNER JOIN atividade a ON s.ativ_id = a.id 
                      WHERE aberta = 1 AND codigo = ?`, values, function (error, results, fields) {
        if(error){
          return res
            .status(httpStatus.SERVER_ERROR)
        } else {
          if (results.length > 0){
            const sala = results[0];
              return res
              .status(httpStatus.SUCCESS)
              .send({
                sala: sala,
              });
          }
          return res
          .status(httpStatus.BAD_REQUEST)
          .send({
            errorMsg: returnMsg.SALA_NOT_FOUND
          });
          
        }
    });  
  };

  entradaSaidas (req,res) {

    const values = [req.params.codigo]

    connection.query(`SELECT es.entrada, es.saida FROM sala s 
                      INNER JOIN atividade a ON s.ativ_id = a.id 
                      INNER JOIN sala_entrada_saida ses ON s.id = ses.sala_id 
                      INNER JOIN entrada_saida es ON ses.ent_sai_id = es.id
                      WHERE aberta = 1 AND codigo = ?`, values, function (error, results, fields) {
        if(error){
          return res
            .status(httpStatus.SERVER_ERROR)
        } else {
          if (results.length > 0){
              return res
              .status(httpStatus.SUCCESS)
              .send({
                entradasSaidas: results,
              });
          }
          return res
          .status(httpStatus.BAD_REQUEST)
          .send({
            errorMsg: returnMsg.SALA_NOT_FOUND
          });
          
        }
    });  
  };


  salvarEquipe (req,res) {

    connection.beginTransaction(function(err) {
      if (err) {
        throw err;
      }

      const inserts = {
        nome: req.body.nome,
        id_sala: req.body.sala,
      };
      console.log(inserts)

      connection.query('INSERT INTO equipe SET ?', inserts,
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
          .send({
            id: results.insertId,
          })
        });
      });

    });
  };
  
}




module.exports = new AlunoController()