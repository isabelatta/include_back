const express = require('express');
var cors = require('cors')
const bodyParser = require("body-parser")
const routes = require("./src/routes");


const app = express();

app.use(bodyParser.json());

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//     next();
//   });


app.use(cors())

app.use('/api', routes);

module.exports = app;