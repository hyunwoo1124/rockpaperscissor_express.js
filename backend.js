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
    console.log("Got data: " + req.body.choice);
 //   console.log("Got data: " + req.body.Paper);
   // console.log("Got data: " + req.body.Scissor);
    
    
    // gets the players choice - jason 3/20
    let playersChoice = req.body.choice;

    // random choice between 0 and 3 to determine computers choice - jason 3/20
    let computerChoice = Math.random() * 3;
    if (computerChoice < 1)
    {
        computerChoice = "Rock";
    }else if (1 < computerChoice < 2)
    {
        computerChoice = "Paper";
    } else if (computerChoice > 2)
    {
        computerChoice = "Scissors";
    }
// comparing who wins- jason 3/20
    compare(playersChoice,computerChoice);
})


app.listen(3000);

// compares the choices - jason 3/20
let compare = function(playersChoice, computerChoice) {
    if (playersChoice === computerChoice) {
        console.log("Tie");

    }
    if (playersChoice === 'Rock') {
        if (computerChoice === 'Paper') {
            console.log("Computer Wins");
        } else {
            console.log("Player wins");
        }
    }
    if (playersChoice === 'Paper') {
        if (computerChoice === 'Scissors') {
            console.log("Computer Wins");
        } else {
            console.log("Player wins");
        }
    }
    if (playersChoice === 'Scissors') {
        if (computerChoice === 'Rock') {
            console.log("Computer Wins");
        } else {
            console.log("Player wins");
        }
    }
}
