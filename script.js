
let playerScore = 0;
let computerScore = 0;

for (let i= 0; i<5; i++){
    const whatBeatswhat = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
    }
    
    const computerChoice = Object.keys(whatBeatswhat)
    
    const getComputerChoice = function(){
    let randomizeChoice = Math.floor(Math.random()*computerChoice.length)
    return computerChoice[randomizeChoice]
    }
    
    function playRound (playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {return "It is a tie!!"}
    else if (whatBeatswhat[playerSelection] == computerSelection) {
        playerScore += 1; 
        return "Player wins!!"
    }else {
        computerScore += 1;
        return "Player loses!!"}  
    }
    
let player = prompt(`Round ${i+1}: Pick either rock, paper, scissors`, "");
const playerSelection = player.toLowerCase();
const computerSelection = getComputerChoice();
const result  = playRound(playerSelection, computerSelection);
console.log(`${result} Player: ${playerSelection} vs Computer: ${computerSelection}`);

}
console.log(`Total Score: Computer Score: ${computerScore} vs Player Score: ${playerScore}`);



