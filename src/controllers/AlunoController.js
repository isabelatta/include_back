const connection = require("../../connection.js")
const returnMsg = require('../uteis/returnMsg');
const httpStatus = require('../uteis/httpStatus');

class AlunoController {

  constructor () {}

  inserirCodigo (req,res) {

    const values = [req.params.codigo]

    connection.query('SELECT codigo FROM sala WHERE codigo = ?', values, function (error, results, fields) {
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
                      WHERE codigo = ?`, values, function (error, results, fields) {
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
                      WHERE codigo = ?`, values, function (error, results, fields) {
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

  consultarCodigo (req,res) {

    const values = [req.params.equipe]

    connection.query(`SELECT c.codigo FROM codigo c
                      WHERE equipe_id = ?`, values, function (error, results, fields) {
        if(error){
          return res
            .status(httpStatus.SERVER_ERROR)
        } else {
          if (results.length > 0){
              return res
              .status(httpStatus.SUCCESS)
              .send({
                codigo: results[0].codigo,
              });
          }
          return res
          .status(httpStatus.BAD_REQUEST)
          .send({
            errorMsg: returnMsg.EMPTY_CODE
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

  salvarCodigo (req,res) {

    connection.beginTransaction(function(err) {
      if (err) {
        throw err;
      }

      const inserts = {
        codigo: req.body.code,
        equipe_id: req.body.equipe_id,
      };
      console.log(inserts)

      connection.query('INSERT INTO codigo SET ?', inserts,
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

  editarCodigo (req,res) {

    connection.beginTransaction(function(err) {
      if (err) {
        throw err;
      }

      console.log(req.body.code);
      console.log(req.body.equipe_id);

      const codigo = req.body.code;
      const equipe_id = req.body.equipe_id;

      connection.query('UPDATE codigo SET codigo = ? WHERE equipe_id = ?', [codigo, equipe_id] ,
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
          .send()
        });
      });

    });
  };


  finalizarAtiv (req,res) {

    connection.beginTransaction(function(err) {
      if (err) {
        throw err;
      }

      const id = req.body.idEquipe;
      const finalizado = req.body.finalizado;

      connection.query('UPDATE equipe SET finalizado = ? WHERE id = ?', [finalizado, id] ,
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
          .send()
        });
      });

    });
  };
  
}




module.exports = new AlunoController()