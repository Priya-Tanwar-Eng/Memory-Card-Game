let cards = document.querySelector(".cards");
let startButton = document.querySelector("button");
let flipSound = new Audio("flipcard-91468.mp3");
let matchSound = new Audio("correct-6033.mp3");
let wrongSound = new Audio("buzzer-or-wrong-answer-20582.mp3");
let winnerSound = new Audio("winning-218995.mp3");
let clickSound = new Audio("clickSound.mp3");

let arr = ["🔥", "🔥", "🐍", "🐍", "🍀", "🍀", "⚛️", "⚛️", "🌟", "🌟", "🎵", "🎵"];
let flippedCards = [];
let lockBoard = false;

function sfArray(array) {
    let sfdArray = array.slice();
    for (let i = sfdArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [sfdArray[i], sfdArray[j]] = [sfdArray[j], sfdArray[i]];
    }
    return sfdArray;
}

function createCards() {
    playClickSound();
    cards.innerHTML = "";
    flippedCards = [];
    lockBoard = false;

    document.querySelector("h1").innerText = "🎉Memory Card Game🎉";
    
    let sfdArr = sfArray(arr);
    
    sfdArr.forEach(emoji => {
        let card = document.createElement("div");
        card.classList.add("card");

        let frontFace = document.createElement("div");
        frontFace.classList.add("card-front");
        frontFace.innerText = emoji; 

        let backFace = document.createElement("div");
        backFace.classList.add("card-back");
        backFace.innerText = "❓"; 

        card.appendChild(frontFace);
        card.appendChild(backFace);
        cards.appendChild(card);

        card.addEventListener("click", function () {
            playFlipSound();
            if (lockBoard || flippedCards.includes(card) || card.classList.contains("matched")) return;
            
            card.classList.add("flipped");
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                lockBoard = true;
                checkMatch();
            }
        });
    });

    startButton.innerText = "Reset";
    if(document.getElementById("image")){
        document.getElementById("image").remove();
    }
}

function checkMatch() {
    let [card1, card2] = flippedCards;
    let emoji1 = card1.querySelector(".card-front").innerText;
    let emoji2 = card2.querySelector(".card-front").innerText;

    if (emoji1 === emoji2) {
        setTimeout(() => {
            playMatchSound();
            card1.classList.add("matched");
            card2.classList.add("matched");
            resetBoard();
            checkWinner()
        }, 500);
    } else {
        playWrongSound();
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }
}

function checkWinner() {
    let matchedCards = document.querySelectorAll(".matched");
    if (matchedCards.length === arr.length) {
        setTimeout(() => {
            playWinnerSound();
        }, 1000);
    }
}

function resetBoard() {
    flippedCards = [];
    lockBoard = false;
}

function playFlipSound() {
    flipSound.play();
}

function playMatchSound() {
    matchSound.play();
}

function playWrongSound() {
    wrongSound.play();
}

function playWinnerSound() {
    winnerSound.play();
}

function playClickSound() {
    clickSound.play();
}

startButton.addEventListener("click", createCards);
