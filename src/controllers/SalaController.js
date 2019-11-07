const connection = require("../../connection.js")
const returnMsg = require('../uteis/returnMsg');
const httpStatus = require('../uteis/httpStatus');

class SalaController {

  constructor () {}

  listarSalas (req,res) {
    const { id } = req.params;

    connection.query('SELECT * FROM sala WHERE usu_id = ?', id,  function (error, results, fields) {
      if(error){
        return res
          .status(httpStatus.SERVER_ERROR)
      } else {
          if (results.length > 0) {
            console.log("deu cert "+ results[0])
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

  
}

module.exports = new SalaController()