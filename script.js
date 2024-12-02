const playerNamesInput = document.getElementById("playerNames");
const startForm = document.getElementById("startForm");
const startArea = document.getElementById("startArea");
const gameArea = document.getElementById("gameArea");
const playerDisplay = document.getElementById("playerDisplay");
const totalScoreDisplay = document.getElementById("totalScore");
const roundScoreDisplay = document.getElementById("roundScore");
const roundsDisplay = document.getElementById("rounds");
const diceDisplay = document.getElementById("diceDisplay");
const rollDiceButton = document.getElementById("rollDice");
const freezeScoreButton = document.getElementById("freezeScore");
const messageDisplay = document.getElementById("message");

let players = [];
let currentPlayerIndex = 0;
let roundScore = 0;
let rounds = 0;

startForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const names = playerNamesInput.value
        .split(",")
        .map(name => name.trim())
        .filter(name => name);

    if (names.length === 0) {
        messageDisplay.textContent = "Ange minst ett spelarnamn.";
        return;
    }

    players = names.map(name => ({ name, score: 0 }));
    startGame();
});

function startGame() {
    currentPlayerIndex = 0;
    rounds = 0;
    roundScore = 0;
    updateDisplay();
    startArea.style.display = "none";
    gameArea.style.display = "block";
}

function updateDisplay() {
    const currentPlayer = players[currentPlayerIndex];
    playerDisplay.textContent = currentPlayer.name;
    totalScoreDisplay.textContent = currentPlayer.score;
    roundScoreDisplay.textContent = roundScore;
    roundsDisplay.textContent = rounds;
    diceDisplay.className = "die"; 
    diceDisplay.innerHTML = ""; 
}

rollDiceButton.addEventListener("click", () => {
    messageDisplay.textContent = ""; 
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    displayDice(diceRoll);

    if (diceRoll === 1) {
        roundScore = 0;
        messageDisplay.textContent = `${players[currentPlayerIndex].name} slog en etta!`;
        nextRound();
    } else {
        roundScore += diceRoll;
        roundScoreDisplay.textContent = roundScore;
    }
});

freezeScoreButton.addEventListener("click", () => {
    players[currentPlayerIndex].score += roundScore;
    if (players[currentPlayerIndex].score >= 100) {
        messageDisplay.textContent = `${players[currentPlayerIndex].name} vinner spelet!`;
        rollDiceButton.disabled = true;
        freezeScoreButton.disabled = true;
    } else {
        nextRound();
    }
});

function nextRound() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    roundScore = 0;
    rounds++;
    messageDisplay.textContent = ""; 
    updateDisplay();
}

function displayDice(diceRoll) {
    diceDisplay.innerHTML = ""; 
    const dotPositions = [
        [4], 
        [0, 8], 
        [0, 4, 8], 
        [0, 2, 6, 8], 
        [0, 2, 4, 6, 8], 
        [0, 2, 3, 5, 6, 8], 
    ];

    dotPositions[diceRoll - 1].forEach(pos => {
        const dot = document.createElement("div");
        dot.className = "dot";
        dot.style.gridArea = `${Math.floor(pos / 3) + 1} / ${pos % 3 + 1}`;
        diceDisplay.appendChild(dot);
    });
}






