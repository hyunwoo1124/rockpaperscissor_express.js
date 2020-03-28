"use strict"
const express = require('express');
const app = express();

// post method is stored in the body so parser is necessary to handle post request
const bodyParser = require("body-parser");
// Allow extended to change/modify objects (may have to change later depending how our prg goes)
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

// class rps
const rps = class
{
    constructor(listen, computerScore, humanScore, tieScore, totalGame, gameResult, computerChoice) 
    {
        app.listen(listen);
        this.computerScore = computerScore = 0;
        this.humanScore = humanScore = 0;
        this.tieScore = tieScore = 0;
        this.totalGame = totalGame = 0;
        this.gameResult = gameResult;
        this.computerChoice = computerChoice=0;
    }
}
// rps prototype to compare radio button(index.html) with anonymous function
rps.prototype.compChoice = function() 
{
    this.computerChoice = Math.floor(Math.random() * 3);

    if (this.computerChoice === 0) 
    {
        this.computerChoice = "Rock";
        return this.computerChoice;
    } 
    else if (this.computerChoice === 1) 
    {
        this.computerChoice = "Paper";
        return this.computerChoice;
    } 
    else if (this.computerChoice === 2) 
    {
        this.computerChoice = "Scissors";
        return this.computerChoice;
    }
    console.log("Computer uses: " + this.computerChoice);
}

// Creating instance of a class rps -> rpsObj
let rpsObj= new rps(3000); 


// function prototype to compare player and computer choice
rps.prototype.compare = function(playersChoice, computerChoice)
{
    if (playersChoice === computerChoice) 
    {
        console.log("Tie");
        this.tieScore++;
        this.gameResult = "Tie!";
    } 
    else if (playersChoice === 'Rock') 
    {
        if (computerChoice === 'Paper') 
        {
            console.log("Computer Wins");
            this.computerScore++;
            this.gameResult = "You lose!";
        } 
        else 
        {
            console.log("Player wins");
            this.humanScore++;
            this.gameResult = "You win!";
        }
    } 
    else if (playersChoice === 'Paper') 
    {
        if (computerChoice === 'Scissors') 
        {
            console.log("Computer Wins");
            this.computerScore++;
            this.gameResult = "You lose!";
        } 
        else 
        {
            console.log("Player wins");
           this. humanScore++;
           this.gameResult = "You win!";
        }
    } 
    else if (playersChoice === 'Scissors') 
    {
        if (computerChoice === 'Rock') 
        {
            console.log("Computer Wins");
            this.computerScore++;
            this.gameResult = "You lose!";
        }
        else 
        {
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

// get method of index.html 
app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/index.html');
});
// post method to body parse and receive
app.post('/mygame', function(req, res)
{
    console.log("Got data: " + req.body.choice);
   
    let playersChoice = req.body.choice;
    // sealing playerchoice objects to disable add/delete 
    Object.seal(playersChoice);

    // sealing obj of instance of a class named rps
    let obj = Object.seal(rps);
    
    let computer= rpsObj.compChoice();

    rpsObj.compare(playersChoice, computer);

    // ejs dynamic page generation with newly updated scores every time game ends
    res.render('game', {gameResult: rpsObj.gameResult, player: playersChoice, server: rpsObj.computerChoice, playerScore: rpsObj.humanScore, serverScore:rpsObj.computerScore, totalScore: rpsObj.totalGame, tieScore: rpsObj.tieScore});

})
