//import require modules
const express = require("express");
const path    = require("path");

//create a express app
var app     = express();

//get rout of public dir where is located the static elements
var publicPath = path.resolve(__dirname, 'www');

app.use(express.static(publicPath));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/www/index.html');
});
app.listen(8080);