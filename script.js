const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");

//Results
const userscore_span = document.querySelector("#user-score")
const compscore_span = document.querySelector("#comp-score")
const result_p = document.querySelector(".result > p");
const scoreboard_div = document.querySelector(".score-board")

//Global Variables
let playerScore = 0;
let computerScore = 0;

// for (let i= 0; i<5; i++){// }
//What beats what
const whatBeatswhat = {
rock: "scissors",
paper: "rock",
scissors: "paper"
}
  
//Computer Choice
const computerChoice = Object.keys(whatBeatswhat)
    
const getComputerChoice = function(){
let randomizeChoice = Math.floor(Math.random()*computerChoice.length)
return computerChoice[randomizeChoice]
}

//PlayRound
function playRound (playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        userscore_span.innerHTML = playerScore;
        compscore_span.innerHTML = computerScore;
        result_p.innerHTML = `It is a tie!!`
    }else if (whatBeatswhat[playerSelection] == computerSelection) {
        playerScore += 1; 
        userscore_span.innerHTML = playerScore;
        compscore_span.innerHTML = computerScore;
        if (playerScore <5) {result_p.innerHTML = `Player (${whatBeatswhat[playerSelection]}) beats Computer (${computerSelection})`}
        if (playerScore == 5){
            result_p.innerHTML = `Game over! You Win!` 
            endGame() }
    }else {
        computerScore += 1;
        userscore_span.innerHTML = playerScore;
        compscore_span.innerHTML = computerScore;
        if (computerScore <5) {result_p.innerHTML = `Computer (${computerSelection}) beats Player (${whatBeatswhat[playerSelection]}) `}
        if (computerScore == 5){
            result_p.innerHTML = `Game over! You Lose!`
            endGame()
        }
        }  
}

//EndGame
function endGame() {
    rock.disabled = true;
    paper.disabled = true;
    scissors.disabled = true;
}

//RestartGame, RestartScores

function restartGame() {
    restartScores()
    rock.disabled = false;
    paper.disabled = false;
    scissors.disabled = false;
}

function restartScores (){
    playerScore = 0;
    computerScore = 0;
    userscore_span.innerHTML = playerScore;
    compscore_span.innerHTML = computerScore;
}

//Event Listeners
function clickListener (event) {
    const playerSelection = event.target.id;
    const computerSelection = getComputerChoice();
    playRound(playerSelection, computerSelection);
    console.log(` Player: ${playerSelection} vs Computer: ${computerSelection}`);
    }
    
rock.addEventListener("click", clickListener);
paper.addEventListener("click", clickListener);
scissors.addEventListener("click", clickListener);





// let player = prompt(`Round : Pick either rock, paper, scissors`, "");
// const playerSelection = player.toLowerCase();
// const computerSelection = getComputerChoice();
// const result  = playRound(playerSelection, computerSelection);
// console.log(`${result} Player: ${playerSelection} vs Computer: ${computerSelection}`);
// console.log(`Total Score: Computer Score: ${computerScore} vs Player Score: ${playerScore}`);

    

