window.onload = beginningAnimation();

//Global Variables
let playerScore = 0;
let computerScore = 0;

let buttons = document.querySelectorAll(".button");
const body = document.querySelector("body");
const main = document.querySelector("main");
const Rock = document.querySelector("#Rock");
const Paper = document.querySelector("#Paper");
const Scissors = document.querySelector("#Scissors");
const userscore_span = document.querySelector("#user-score");
const compscore_span = document.querySelector("#comp-score");
const result_p = document.querySelector(".result > p");
const endDesc = document.querySelector("#end-desc");
const returnMainBtn = document.querySelector("#retry-btn");
const desc = document.querySelector("#desc3");
const endAlrt = document.querySelector("#end-alert");


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
  Rock: "Scissors",
  Paper: "Rock",
  Scissors: "Paper",
};

//Computer Choice
const computerChoice = Object.keys(whatBeatswhat);

const getComputerChoice = function () {
  let randomizeChoice = Math.floor(Math.random() * computerChoice.length);
  return computerChoice[randomizeChoice];
};

//PlayRound
function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    userscore_span.innerHTML = playerScore;
    compscore_span.innerHTML = computerScore;
    result_p.innerHTML = `It is a tie!!`;
  } else if (whatBeatswhat[playerSelection] == computerSelection) {
    playerScore += 1;
    userscore_span.innerHTML = playerScore;
    compscore_span.innerHTML = computerScore;
    if (playerScore === 1) {
      result_p.innerHTML = `Way to go!!! You won. ${whatBeatswhat[playerSelection]} beats ${computerSelection}`;
    }
    if (playerScore === 2) {
      result_p.innerHTML = `${whatBeatswhat[playerSelection]} beats ${computerSelection}. Well played! You're pretty good at this.`;
    }
    if (playerScore === 3) {
      result_p.innerHTML = `${whatBeatswhat[playerSelection]} beats ${computerSelection}. Yes!! Keep that winning spirit alive!!`;
    }
    if (playerScore === 4) {
      result_p.innerHTML = `${whatBeatswhat[playerSelection]} beats ${computerSelection}. One more to secure the win!! `;
    }
    if (playerScore === 5) {
      result_p.innerHTML = `Game over! You Win!`;
      endGame();
      declareWinner();
    }
  } else {
    computerScore += 1;
    userscore_span.innerHTML = playerScore;
    compscore_span.innerHTML = computerScore;
    if (computerScore === 1) {
      result_p.innerHTML = `Oh no! You lost. ${computerSelection} beats ${whatBeatswhat[playerSelection]}`;
    }
    if (computerScore === 2) {
      result_p.innerHTML = `${computerSelection} beats ${whatBeatswhat[playerSelection]}. Oops, that one slipped away. Stay focused!`;
    }
    if (computerScore === 3) {
      result_p.innerHTML = `${computerSelection} beats ${whatBeatswhat[playerSelection]}. You can turn this around! Keep trying!`;
    }
    if (computerScore === 4) {
      result_p.innerHTML = `${computerSelection} beats ${whatBeatswhat[playerSelection]}. It's not over yet! Rise up and show them what you're made of!`;
    }
    if (computerScore === 5) {
      result_p.innerHTML = `Game over! You Lose!`; 
      endGame();
      declareWinner();
    }
  }
}

//EndGame
function endGame() {
  Rock.disabled = true;
  Paper.disabled = true;
  Scissors.disabled = true;
}

//Event Listeners
function clickListener(event) {
  const playerSelection = event.target.id;
  const computerSelection = getComputerChoice();
  playRound(playerSelection, computerSelection);
  console.log(` Player: ${playerSelection} vs Computer: ${computerSelection}`);
}

Rock.addEventListener("click", clickListener);
Paper.addEventListener("click", clickListener);
Scissors.addEventListener("click", clickListener);

function declareWinner() {
  rplContent();
  if (playerScore > computerScore) {
    endDesc.textContent = "You win! The ancient warriors stand no chance!!";
    returnMainBtn.innerText = "Play Again";
  } else {
    endDesc.textContent = "You lost...The ancient warrior prevails, sealing your fate..";
    returnMainBtn.innerText = "Try Again?";
  }
  fadeIn();

  let endDescSpan = endDesc.querySelectorAll("span");
  endDescSpan = Array.from(endDescSpan);

  endDescSpan[endDescSpan.length - 1].ontransitionend = () => {
    returnMainBtn.classList.add("fade-in");
    /*returnMainBtn.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 00,
      fill: "forwards",
      iterations: 1,
      delay: 0,
      easing: "ease-in",
    });*/
  };
}

function on() {
  document.getElementById("end-alert").style.display = "block";
}

function off() {
  document.getElementById("end-alert").style.display = "none";
}

function rplContent() {
  // main.classList.add("disappear");
  on();
  endAlrt.classList.remove("disappear");
  desc.classList.remove("animate");
  endDesc.classList.add("animate");

  returnMainBtn.addEventListener("click", () => {
    off();
    restartGame();
    // main.classList.remove("disappear");
    endAlrt.classList.add("disappear");
    desc.classList.add("animate");
    returnMainBtn.classList.remove("fade-in");
    
  });
}

//RestartGame, RestartScores

function restartGame() {
  restartScores();
  Rock.disabled = false;
  Paper.disabled = false;
  Scissors.disabled = false;
}

function restartScores() {
  fadeIn();
  playerScore = 0;
  computerScore = 0;
  keepPlayerScore();
  keepCpuScore();
}

function keepPlayerScore() {

  userscore_span.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 300,
    fill: "forwards",
    iterations: 1,
    delay: 0,
    easing: "ease-out",
  });

  userscore_span.textContent = playerScore;
}
function keepCpuScore() {

  compscore_span.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 300,
    fill: "forwards",
    iterations: 1,
    delay: 0,
    easing: "ease-out",
  });

  compscore_span.textContent = computerScore;
}
