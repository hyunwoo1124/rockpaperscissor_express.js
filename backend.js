"use strict"
// This is only required for objects on the actual rpc game to "seal object game"
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

app.set('view engine', 'ejs');

const rps = class
{
    constructor(computerScore, humanScore, tieScore, totalGame, gameResult, computerChoice) {

        this.computerScore = computerScore = 0;
        this.humanScore = humanScore = 0;
        this.tieScore = tieScore = 0;
        this.totalGame = totalGame = 0;
        this.gameResult = gameResult;
        this.computerChoice = computerChoice=0;
    }
}

// Handles HTML request of the url
app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/index.html');
});

let rpsObj= new rps();

app.post('/mygame', function(req, res){
    console.log("Got data: " + req.body.choice);
    //   console.log("Got data: " + req.body.Paper);
    // console.log("Got data: " + req.body.Scissor);


    // gets the players choice - jason 3/20
    let playersChoice = req.body.choice;
    Object.seal(playersChoice);

   
    let obj = Object.seal(rps);
    
    let computer= rpsObj.compChoice();

    rpsObj.compare(playersChoice, computer);

        // keivn 3/24
    // made game.ejs to dynamically generate pages, require work to redirect to the main page again
    res.render('game', {gameResult: rpsObj.gameResult, player: playersChoice, server: rpsObj.computerChoice, playerScore: rpsObj.humanScore, serverScore:rpsObj.computerScore, totalScore: rpsObj.totalGame, tieScore: rpsObj.tieScore});

    // res.redirect('/');
})


app.listen(3000);


// random choice between 0 and 3 to determine computers choice - jason 3/20
rps.prototype.compChoice = function() {
    this.computerChoice = Math.floor(Math.random() * 3);

    if (this.computerChoice === 0) {
        this.computerChoice = "Rock";
        return this.computerChoice;
    } else if (this.computerChoice === 1) {
        this.computerChoice = "Paper";
        return this.computerChoice;
    } else if (this.computerChoice === 2) {
        this.computerChoice = "Scissors";
        return this.computerChoice;
    }
    console.log("Computer uses: " + this.computerChoice);
}



// compares the choices - jason 3/20
rps.prototype.compare= function(playersChoice, computerChoice)
{


    if (playersChoice === computerChoice) {
        console.log("Tie");
        this.tieScore++;
        this.gameResult = "Tie!";
    } else if (playersChoice === 'Rock') {
        if (computerChoice === 'Paper') {
            console.log("Computer Wins");
            this.computerScore++;
            this.gameResult = "You lose!";
        } else {
            console.log("Player wins");
            this.humanScore++;
            this.gameResult = "You win!";
        }
    } else if (playersChoice === 'Paper') {
        if (computerChoice === 'Scissors') {
            console.log("Computer Wins");
            this.computerScore++;
            this.gameResult = "You lose!";
        } else {
            console.log("Player wins");
           this. humanScore++;
           this.gameResult = "You win!";
        }
    } else if (playersChoice === 'Scissors') {
        if (computerChoice === 'Rock') {
            console.log("Computer Wins");
            this.computerScore++;
            this.gameResult = "You lose!";
        } else {
            console.log("Player wins");
            this.humanScore++;
            this.gameResult = "You win!";
        }
    }
    this.totalGame++;
    console.log("Human: ", this.humanScore);
    console.log("Computer: ", this.computerScore);
    console.log("Ties: ", this.tieScore);
    console.log("Total Score: ", this.totalGame);
}
