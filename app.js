const express = require('express');
var cors = require('cors')
const bodyParser = require("body-parser")
const routes = require("./src/routes");


const app = express();

app.use(bodyParser.json());

app.use(cors())

app.use('/api', routes);

module.exports = app;