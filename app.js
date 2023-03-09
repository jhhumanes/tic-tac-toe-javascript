const gameboard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const resetButton = document.querySelector("#reset");
const startCells = [
    "", "", "", "", "", "", "", "", "",
];
const translations = {
    "circle": "círculos",
    "cross": "cruces",
};

let go;

resetButton.addEventListener("click", (e) => {
    e.preventDefault();
    createBoard();
    resetGame();
});

function createBoard() {
    gameboard.innerHTML = "";
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        cellElement.id = index;
        cellElement.addEventListener("click", addGo);
        gameboard.append(cellElement);
    });
}

function resetGame() {
    go = "circle";
    infoDisplay.textContent = "Empiezan los círculos";
}

createBoard();
resetGame();

function addGo(e) {
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross"  :"circle";
    infoDisplay.textContent = "Turno para: " + translations[go];
    e.target.removeEventListener("click", addGo);
    checkScore();
}

function checkScore() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const allSquares = document.querySelectorAll(".square");

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains("circle")
        );

        if (circleWins) {
            infoDisplay.textContent = "¡Ganan los Círculos!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }


    });

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains("cross")
        );

        if (crossWins) {
            infoDisplay.textContent = "¡Ganan las Cruces!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }
    });
}
