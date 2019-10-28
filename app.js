/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, rollAudio, rollOneAudio, holdAudio, startAudio, helpAudio, winAudio, sixCount, newWinningScore;

init();

//Setup the roll dice btn and function
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
         //Add Random Number
        var dice = Math.floor(Math.random()*6) + 1;
        var dice2 = Math.floor(Math.random()*6) + 1;
        //Display the result
        var diceDOM = document.querySelector('.dice');
        var dice2DOM = document.querySelector('.dice2');
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice2').style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        dice2DOM.src = 'dice-' + dice2 + '.png';
        
        //Update the round score If the number rolled is not 1
        if (dice !== 1 && dice !== 6 && dice2 !== 1 && dice2 !==6){
            //Add Score
            roundScore += dice + dice2;
            //putting text to log
            
            document.querySelector('.log-text').textContent = 'Roll or Hold';
            addScore();
        } else if (dice === 6 && dice!==1 && dice2 !== 1 && sixCount === 0) {
            roundScore += dice + dice2;  
            addScore();
            sixCount += 1;
            document.querySelector('#player-' + activePlayer + '-sixes').textContent = '6';
            //putting text to log
            
            document.querySelector('.log-text').textContent = 'Careful! Rolled one SIX';
            console.log(sixCount);
            
        } else if (dice2 === 6 && dice!==1 && dice2 !== 1 && sixCount === 0) {
            roundScore += dice + dice2;  
            addScore();
            sixCount += 1;
            document.querySelector('#player-' + activePlayer + '-sixes').textContent = '6';
            //putting text to log
            
            document.querySelector('.log-text').textContent = 'Careful! Rolled one SIX';
            console.log(sixCount);
            
        } else if (dice === 6 && dice!==1 && dice2 !== 1 && sixCount === 1) {
            sixCount += 1;
            nextPlayer();
            console.log(sixCount);
            document.querySelector('#player-0-sixes').textContent = ' ';
            document.querySelector('#player-1-sixes').textContent = ' ';
            //putting text to log
            
            document.querySelector('.log-text').textContent = 'Rolled TWO six! Turn lost.';
            
            rollOneAudio.play();          
        } else if (dice2 === 6 && dice!==1 && dice2 !== 1 && sixCount === 1) {
            sixCount += 1;
            nextPlayer();
            console.log(sixCount);
            document.querySelector('#player-0-sixes').textContent = ' ';
            document.querySelector('#player-1-sixes').textContent = ' ';
            //putting text to log
            document.querySelector('.log-text').textContent = 'Rolled TWO six! Turn lost.';
            
            rollOneAudio.play();          
        } else if (dice=== 6 && dice2 === 6 && dice !== 1 && dice2 !== 1) {
            sixCount += 2;
            nextPlayer();
            console.log(sixCount);
            document.querySelector('#player-0-sixes').textContent = ' ';
            document.querySelector('#player-1-sixes').textContent = ' ';
            //putting text to log
            document.querySelector('.log-text').textContent = 'Rolled TWO six! Turn lost.';
        }
        else {
            //If player rolls a 1 -> Activate the next player function
            nextPlayer();
            rollOneAudio.play();
            sixCount = 0;
            //putting text to log
            document.querySelector('.log-text').textContent = 'Rolled a ONE! Turn lost.';
            
            
        }

    }
   
});

//Setup the Hold btn function
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //Add the current score to the players total score
        scores[activePlayer] += roundScore;
        //Update the UI to show the total players score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //reset the sixCount variable
        sixCount = 0
        document.querySelector('#player-0-sixes').textContent = ' ';
        document.querySelector('#player-1-sixes').textContent = ' ';
        //playAudio play
        holdAudio.play();
        //Check if player won the game
        
        if (scores[activePlayer] >= 100 || scores[activePlayer] >= newWinningScore) {
            //Show winner message on UI
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            //putting text to log
            
            document.querySelector('.log-text').textContent = 'Game has Ended';
            winAudio.play();
            //Set the gamePlaying variable to false, as the game will end here.
            gamePlaying = false;
        } else {
        //If player clicks hold -> Activate the next player function
        nextPlayer();
        
        }

    }
    
    
});



//Setup of the inital function
function init (){
    
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    //Set the instructions panel display to none
    document.querySelector('.instructions-panel').style.display = 'none';
    // Set up audio files
    rollAudio = new Audio('roll-1.wav');
    rollOneAudio = new Audio ('rollOne.wav');
    holdAudio = new Audio ('hold.wav');
    startAudio = new Audio ('start.wav');
    helpAudio = new Audio ('help.wav');
    winAudio = new Audio ('win.wav');
    //putting text to log
    
    document.querySelector('.log-text').textContent = 'Roll the dice to start the game';
    
    
    //reset sixCount and UI
    sixCount = 0;
    document.querySelector('#player-0-sixes').textContent = ' ';
    document.querySelector('#player-1-sixes').textContent = ' ';
    //play new game sound
    startAudio.play();

    var currentScore = document.querySelector('#score-0').textContent;

    //Setting player round scores to 0
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //Setting player total scores to 0
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    //Hide the dice from showing
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    //Restore the name of the players
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //Remove the winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    //Remove active player UI
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

};

function addScore() {
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    rollAudio.play();
}

function nextPlayer() {

            //Next Player
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //? sign equals if and : equals else
        
            // Set roundscore back to 0
            roundScore = 0;
            //UI sets to 0 too
            document.getElementById('current-0').textContent = '0';
            document.getElementById('current-1').textContent = '0';
    
            //Chaging the UI to show the active player
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
    
            //Hide the dice when player changes
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';

            // reset sixcount value and UI
            sixCount = 0;
            document.querySelector('#player-0-sixes').textContent = ' ';
            document.querySelector('#player-1-sixes').textContent = ' ';



}

//New Game btn event
document.querySelector('.btn-new').addEventListener('click', init);

//Instructions btn event
document.querySelector('.btn-help').addEventListener('click', function(){

    document.querySelector('.instructions-panel').classList.add('fade-in');
    document.querySelector('.instructions-panel').style.display = 'block';
    helpAudio.play();
    gamePlaying = false;
    //reset six count and UI
    

});
//back btn event
document.querySelector('.btn-back').addEventListener('click', function(){

    document.querySelector('.instructions-panel').style.display = 'none';
    helpAudio.play();
    gamePlaying = true;
    

});

//Set btn function
function set(){
    newWinningScore = document.getElementById("myWinningScore").value;
}



