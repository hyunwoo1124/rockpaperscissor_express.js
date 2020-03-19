//"use strict" This is only required for objects on the actual rpc game to "seal object game"
const express = require('express');
const app = express();
//const server = require('http').createServer(app); dont need to use http since we are using 'express'
//const io = require('socket.io').listen(server);   Rule did say not to use any packages other than his lectures
/*
Newly added -kevin-
*/
// post method is stored in the body so parser is necessary to handle post request
const bodyParser = require("body-parser");
// Allow extended to change/modify objects (may have to change later depending how our prg goes)
app.use(bodyParser.urlencoded({extended:true}));
//app.set('view engine', 'ejs'); lets use this after we get front-end and back-end is connected


// Handles HTML request of the url
app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/index.html');
});

app.post('/mygame', function(req, res){
    console.log("Got data: " + req.body.Rock);
    console.log("Got data: " + req.body.Paper);
    console.log("Got data: " + req.body.Scissor);

})

app.listen(3000);
