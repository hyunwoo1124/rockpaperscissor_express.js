"use strict"
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
app.set('view engine', 'ejs');
server.listen(3000);



app.get('/', function(req, resp)
{
    resp.sendFile(_dirname + '/index.html');
});

