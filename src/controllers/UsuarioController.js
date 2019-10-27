const connection = require("../../connection.js")
var md5 = require('md5')

class UsuarioController {

    constructor () {}

    auth (req,res) {
			var usuario = req.body.usuario;
			var senha = req.body.senha;
			const retorno = {
					name: usuario,
					senha: senha,
			};

			return res
			.status(200)
			.json(retorno)
    };

	cadastrar (req, res){

    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      
      var inserts = {
                    nome: req.body.nome, 
                    email: req.body.email,
                    senha: md5(req.body.senha)
                    
      };

      connection.query('INSERT INTO usuario set ?', inserts , function (error, results, fields) {
        if (error) {
          return connection.rollback(function() {
            throw error;
          });
        }
        connection.commit(function(err) {
          if (err) {
            return connection.rollback(function() {
              throw err;
            });
          }

          return res.status(200)

        });
      });
      
    });
		
			
	}
}

module.exports = new UsuarioController()
