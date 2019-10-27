const mysql = require("mysql");

var connection = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "12345678",
    database: "tcc_bd",
    multipleStatments : true
})

connection.connect((err) => {
    if(!err){
        console.log("Conectado");
    }
    else{
        console.log("A conexão falhou");
    }
})

module.exports = connection




