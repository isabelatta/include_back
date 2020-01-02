const connection = require("../../connection.js")
const returnMsg = require('../uteis/returnMsg');
const httpStatus = require('../uteis/httpStatus');

class SalaController {

  constructor () {}

  listarSalas (req,res) {
    const { id } = req.params;

    connection.query(`select s.descri, s.data, s.aberta, s.nome, assu.cor, assu.descri as assunDesc
                      from sala s 
                      inner join atividade a on s.ativ_id = a.id 
                      inner join assunto assu on a.assunto_id = assu.id 
                      WHERE usu_id = ?`, id,  function (error, results, fields) {
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

  cadastrarSala (req,res) {
    const { id } = req.params;
    console.log("Entrou");

    connection.beginTransaction(function(err) {
      if (err) {
        throw err;
      }
      const inserts = {
        usu_id: req.body.usuario,
        nome: req.body.nome, 
        descri: req.body.descri,
        data: new Date(req.body.data),
        aberta: req.body.aberta
      };

      console.log(inserts)

      connection.query('INSERT INTO sala set ?', inserts , function (error, results, fields) {
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
            id: results.insertId
          })
        });
      });
      
    }); 
  };

  
}

module.exports = new SalaController()