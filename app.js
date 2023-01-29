const visible = document.querySelector(".visible");
const allCards = document.querySelector(".main-card-container");
const cards = document.querySelectorAll(".the-card");
const scoreRecord = document.querySelector(".score");
const timeRecord = document.querySelector(".timer");
const startGameScreen = document.querySelector(".start-game");
const youWinScreen = document.querySelector(".you-win-screen");
const gameOverScreen = document.querySelector(".game-over-screen");
const gameOverScoreMsg = document.querySelector(".game-over-score-msg");
const playAgainBtn = document.querySelector(".restart-btn");
const youWinPlayAgainBtn = document.querySelector(".you-win-restart-btn");
const pauseGameScreen = document.querySelector(".pause-game-screen");
const pauseBtn = document.querySelector(".pause-btn");
const resumeGameBtn = document.querySelector(".continue-game-btn");
const flippedCard = document.querySelector(".the-front");


let score = 0;
let sec = 30;
let hasFlippedCard = false;
let matchedCard = 0;
let firstCard, secondCard;
let lockBoard = false;
let timer;
let timesUp;


scoreRecord.innerHTML = `Score: ${score}`;
timeRecord.innerHTML = `Time: ${sec}s`;
youWinScreen.style = "display: none;";
gameOverScreen.style = "display: none;";
pauseGameScreen.style = "display: none;";



function flipCard (){

    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add("flip");

    if(!hasFlippedCard){

        hasFlippedCard = true;
        firstCard = this;

    }else{

        hasFlippedCard = false;
        secondCard = this;
        checkForMatch();

    }
}

function checkForMatch(){

    if(firstCard.dataset.framework === secondCard.dataset.framework){

        score++;
        scoreRecord.innerHTML = `Score: ${score}`;
        disableCards();

    }else{

        unflipCards();

    }

    if(score == 8){

        youWin();

    }
}

function disableCards(){

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

}

function unflipCards(){

    lockBoard = true;

    setTimeout(() => {

        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        lockBoard = false;
        resetBoard();

    }, 1500) 

}

function resetBoard(){

    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;

}

cards.forEach(card => card.addEventListener("click", flipCard));

function startGame(){

    startGameScreen.style = "display: none;";

    timer = setInterval(()=>{

        timeRecord.innerHTML = `Time: ${sec}s`;
        sec--;

    }, 1000)   
    timeOut();
    // shuffleCards();

}

startGameScreen.addEventListener("click", startGame);

function timeOut(){

        timesUp = setInterval(() => {

        if(sec < 0){

            clearInterval(timer);
            gameOverScreen.style = "display: block;";
            gameOverScoreMsg.innerHTML = `Matches Scored: ${score}`;

        }
    })   
}

window.onload = function(){

    let reloading = sessionStorage.getItem("reloading");
    if(reloading){

        sessionStorage.removeItem("reloading");
        startGame();

    }
}

function reloadPage() {

    sessionStorage.setItem("reloading", "true");
    document.location.reload();
    
}

playAgainBtn.addEventListener("click", reloadPage);
youWinPlayAgainBtn.addEventListener("click", reloadPage);



function youWin(){

    if(score = 8){

        clearInterval(timer);
        youWinScreen.style = "display: block;";

    }
}

function pauseGame(){

    clearInterval(timer);
    pauseGameScreen.style = "display: block;";

}

pauseBtn.addEventListener("click", pauseGame);


function resumeGame(){

    pauseGameScreen.style = "display: none;";

    timer = setInterval(()=>{

        timeRecord.innerHTML = `Time: ${sec}s`;
        sec--;

    }, 1000)   
    timeOut();

}

resumeGameBtn.addEventListener("click", resumeGame);


//Attempts to shuffle the cards

// (function shuffle() {

//     cards.forEach(card => {

//       let randomPos = Math.floor(Math.random() * 12);
//       card.style.order = randomPos;

//     });
//   })();


// function shuffleCards(){

//     matchedCard = 0;
//     firstCard = secondCard = "";

//     let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
//     arr.sort(() => Math.random() > 0.5 ? 1 : -1)
//     cards.forEach((card, index) => {

//         card.classList.remove("flip");
//         let imgTag = card.querySelector(".unflipped-card");
//         imgTag.src = `/images/img-${arr[index]}.png`;
//         card.addEventListener("click", flipCard);

//     });

// }