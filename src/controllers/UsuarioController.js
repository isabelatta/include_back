const connection = require("../../connection.js")
const jwt = require('jsonwebtoken');
const md5 = require('md5')
const returnMsg = require('../uteis/returnMsg');
const httpStatus = require('../uteis/httpStatus');

class UsuarioController {

  constructor () {}

  auth (req,res) {

    const values = [req.body.email]

    connection.query('SELECT * FROM usuario WHERE email = ?', values, function (error, results, fields) {
        if(error){
          return res
            .status(httpStatus.SERVER_ERROR)
        } else {
          if (results.length > 0){
            const user = results[0];
            
            if (user.senha === md5(req.body.senha)) {
              const idUser = user.id;
              const token = jwt.sign({ idUser }, process.env.SECRET, {
                expiresIn: 300 // expires in 5min
              });
              return res
              .status(httpStatus.SUCCESS)
              .send({
                auth: true,
                token: token,
                nome: user.nome,
              });
            }
            return res
            .status(httpStatus.BAD_REQUEST)
            .send({
              errorMsg: returnMsg.INCORRECT_PASSWORD
            });
          } 

          return res
          .status(httpStatus.BAD_REQUEST)
          .send({
            errorMsg: returnMsg.USER_NOT_FOUND
          });
          
        }
    });
    
  };

  cadastrar (req, res){

    connection.beginTransaction(function(err) {
      if (err) {
        throw err;
      }
      
      const inserts = {
        nome: req.body.nome, 
        email: req.body.email,
        senha: md5(req.body.senha)             
      };

      connection.query('INSERT INTO usuario set ?', inserts , function (error, results, fields) {
        if (error) {
          connection.rollback();
          return res
          .status(httpStatus.BAD_REQUEST)
          .send({
            errorMsg: returnMsg.UNIQUE_EMAIL
          });
        }
        connection.commit(function(err) {
          if (err) {
            return connection.rollback(function() {
              throw err;
            });
          }

          return res.status(httpStatus.SUCCESS)

        });
      });
      
    });   
  }
}

module.exports = new UsuarioController()
