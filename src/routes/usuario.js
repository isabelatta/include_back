 const express = require("express");
 const mysqlConnection = require("../../connection")
 const UsuarioController = require("../controllers/UsuarioController");

 const Router = express.Router();

//  Router.get("/",(req, res) =>{
//     mysqlConnection.query("select * from usuario", (err, rows, fields, )=>{
//         if(!err){
//             res.send(rows);
//         }
//         else{
//             console.log(err);
//         }
//     })
//  })


// Router.post("/login", LoginController.auth);

module.exports = Router