window.onload = beginningAnimation();

//Global Variables
let playerScore = 0;
let computerScore = 0;

let buttons = document.querySelectorAll(".button");
const body = document.querySelector("body");
const main = document.querySelector("main");
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const userscore_span = document.querySelector("#user-score")
const compscore_span = document.querySelector("#comp-score")
const result_p = document.querySelector(".result > p");
const scoreboard_div = document.querySelector(".score-board")

body.addEventListener("click", skipAnime());
body.addEventListener("keydown", skipAnime());

function skipAnime() {
  const span = document.querySelectorAll("span");
  span.forEach((span) => span.classList.add("skip"));
}

function beginningAnimation() {
    fadeIn();
    //need to turn nodelist of spans into an array so we can access last value for ontransitionend
    const desc1 = document.querySelector("#desc1");
    let desc1Span = desc1.querySelectorAll("span");
  
    desc1Span = Array.from(desc1Span);
  
    const desc2 = document.querySelector("#desc2");
    const desc3 = document.querySelector("#desc3");
  
    desc1Span[desc1Span.length - 1].ontransitionend = () => {
      desc1.classList.add("fade-out");
  
      desc1.addEventListener("animationend", () => {
        desc1.classList.add("disappear");
        desc1.classList.remove("animate");
        desc2.classList.remove("disappear");
        desc2.classList.add("animate");
        fadeIn();
        /* need to collect nodelist of span 
  in the same function we activate fadein()
  or else nodelist will be empty */
        let desc2Span = desc2.querySelectorAll("span");
        desc2Span = Array.from(desc2Span);
  
        desc2Span[desc2Span.length - 1].ontransitionend = () => {
          desc2.classList.add("fade-out");
          desc2.addEventListener("animationend", () => {
            desc2.classList.add("disappear");
            desc2.classList.remove("animate");
            desc3.classList.remove("disappear");
            desc3.classList.add("animate");
            fadeIn();
  
            let desc3Span = desc3.querySelectorAll("span");
            desc3Span = Array.from(desc3Span);
  
            desc3Span[desc3Span.length - 1].ontransitionend = () => {
              const cta = document.querySelector("#cta");
  
              cta.classList.add("drop-down");
  
              cta.addEventListener("animationend", () => {
                const gameCtn = document.querySelector("#game-container");
  
                setTimeout(function () {
                  gameCtn.classList.add("fade-in");
                }, 300);
              });
            };
          });
        };
      });
    };
  }

  function fadeIn() {
    let text = document.querySelector(".animate");
  
    let strText = text.textContent;
    let splitText = strText.split("");
    text.textContent = "";
    //append span tags to each character in the string
    for (i = 0; i < splitText.length; i++) {
      text.innerHTML += `<span>${splitText[i]}</span>`;
    }
  
    let char = 0;
    let timer = setInterval(onTick, 50);
  
    function onTick() {
      const span = text.querySelectorAll("span")[char];
      span.classList.add("fade");
      char++;
      //stops the function from running once the end of the string has been reached
      if (char === splitText.length) {
        complete();
        return;
      }
    }
    function complete() {
      clearInterval(timer);
      timer = null;
    }
  }

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

    

