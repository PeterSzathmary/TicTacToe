"use strict";

/* 
    B* = bool
*/

/* class for square for background in canvas */
class Tile {

    constructor (_x, _y, _width, _height) {

        this.x = _x;
        this.y = _y;

        this.width = _width;
        this.height = _height;

        this.xRange = this.x + this.width;
        this.yRange = this.y + this.height;
    }
}

/* canvas */
const canvas = window.document.createElement("canvas");
canvas.id = "canvas";
canvas.width = "330";
canvas.height = "330";
canvas.style.position = "absolute";
canvas.style.top = "0px";
canvas.style.left = "0px";
canvas.style.backgroundColor = "white";

/* again? h1*/
const again = window.document.createElement("h1");
again.className = "background-child"
again.textContent = "Again?";
again.style.marginTop = "99px";

/* h3 Yes - No */
const YorN = window.document.createElement("h3");
YorN.className = "background-child"
YorN.innerHTML = "<span id='yes;' onclick='reloadPage();'>Yes</span> - <span id='no;' onclick='endGame();'>No</span>";

const ctx /* context */ = canvas.getContext("2d");

let game5 = [
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1]
];

let game10 = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1]
];

/* options[0] = 5x5 | options[1] = 10x10 */
const options = [];
for (let i = 0; i < window.document.getElementsByClassName("board").length; i++) {

    options[i] = window.document.getElementsByClassName("board")[i];

}

let Bgame5 = false;
let Bgame10 = false;

const errorMsg = window.document.getElementById("error-msg");

/* if click on span with id 5x5 */
options[0].children[0].addEventListener("click", () => {

    Bgame5 = true;
    Bgame10 = false;

    errorMsg.textContent = "";
});

/* if click on span with id 10x10 */
options[1].children[0].addEventListener("click", () => {

    Bgame5 = false;
    Bgame10 = true;

    errorMsg.textContent = "";
});

const button = window.document.getElementById("button");

/* stores background children for future removing them from tree where they belong */
const backgroundChildren = [];
for (let i = 0; i < window.document.getElementById("background").children.length; i++) {

    backgroundChildren.push(window.document.getElementById("background").children[i]);

}

const background = window.document.getElementById("background");

const squares = [];
let squaresCopy = [];
const squares2DArray = [];

/* button click event */
button.addEventListener("click", () => {

    /* if no board was chosen error message will apear below the button */
    if (Bgame5 === false && Bgame10 === false) {

        errorMsg.style.color = "red";
        errorMsg.style.fontWeight = "700";
        errorMsg.textContent = "CHOOSE A BOARD";

    } else {

        let i = 0;

        /* removes background children so canvas can replace them */
        while (i < backgroundChildren.length) {
            backgroundChildren[i].remove();
            i++;
        }

        background.appendChild(canvas);
        
        /* draw in canvas 5 squares in every row and 5 squares in every column = 25 squares */
        if (Bgame5 === true) {

            for (let i = 0, y = 0; i < game5.length; i++, y += 66) {
                
                for (let j = 0, x = 0; j < game5[i].length; j++, x += 66) {

                    ctx.rect(x, y, 66, 66);
                    squares.push(new Tile(x, y, 66, 66));

                }
            }

            squaresCopy = Array.from(squares);

            ctx.stroke();

            while (squaresCopy.length) squares2DArray.push(squaresCopy.splice(0, 5));

        } /* draw in canvas 10 squares in every row and 10 squares in every column = 100 squares */ else {

            for (let i = 0, y = 0; i < game10.length; i++, y += 33) {
                for (let j = 0, x = 0; j < game10[i].length; j++, x += 33) {

                    ctx.rect(x, y, 33, 33);
                    squares.push(new Tile(x, y, 33, 33));

                }
            }

            squaresCopy = Array.from(squares);

            ctx.stroke();

            while (squaresCopy.length) squares2DArray.push(squaresCopy.splice(0, 10));

        }

        /* playing tic-tac-toe */
        play();

    }
});

let playerX = true;
let playerO = false;

/* for centering a shape */
let center = 0;

let whoWon; /* here will be stored who won */

let lineWidth; /* width for stroke */

function play() {
    canvas.addEventListener("click", (e) => {

        let mousePosX = e.offsetX;
        let mousePosY = e.offsetY;

        if (Bgame5) {
            center = 16.5;
            lineWidth = 4;
        } else {
            center = 8.25;
            lineWidth = 2;
        }

        /* player X */
        if (playerX && playerO === false) {

            for (let i = 0; i < squares2DArray.length; i++) {
                for (let j = 0; j < squares2DArray[i].length; j++) {
                    if ((mousePosX > squares2DArray[i][j].x && mousePosX < squares2DArray[i][j].xRange) && (mousePosY > squares2DArray[i][j].y && mousePosY < squares2DArray[i][j].yRange)) {

                        ctx.fillStyle = "black";
                        ctx.font = `${center * 2 + center}px vampirFont`;
                        ctx.fillText("X", squares2DArray[i][j].x + center, squares2DArray[i][j].y + center * 3);
                        ctx.stroke();
                        squares2DArray[i].splice(j, 1, "1X");

                        playerX = false;
                        playerO = true;

                        squaresCopy.push(1)

                        break;
                    }
                }
            }

        } /* player O */ else if (playerO && playerX === false) {

            for (let i = 0; i < squares2DArray.length; i++) {
                for (let j = 0; j < squares2DArray[i].length; j++) {
                    if ((mousePosX > squares2DArray[i][j].x && mousePosX < squares2DArray[i][j].xRange) && (mousePosY > squares2DArray[i][j].y && mousePosY < squares2DArray[i][j].yRange)) {

                        ctx.fillStyle = "black";
                        ctx.font = `${center * 2 + center}px vampirFont`;
                        ctx.fillText("O", squares2DArray[i][j].x + center, squares2DArray[i][j].y + center * 3);
                        ctx.stroke();
                        squares2DArray[i].splice(j, 1, "1O");

                        playerO = false;
                        playerX = true;

                        squaresCopy.push(1)

                        break;
                    }
                }
            }

        }

        /* if victory */
        if (victory()) {
            playerX = false;
            playerO = false;
            setTimeout(() => {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, 330, 330);
                ctx.textAlign = "center";
                ctx.font = "50px vampirFont";
                ctx.fillStyle = "black";
                ctx.fillText(whoWon, 165, 175.5);
            }, 1250);
            setTimeout(() => {
                canvas.remove();
                background.appendChild(again);
                background.appendChild(YorN);
            }, 4000);
        }

        /* if draw */
        if (squaresCopy.length === squares2DArray.length * squares2DArray.length) {
            playerX = false;
            playerO = false;
            setTimeout(() => {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, 330, 330);
                ctx.textAlign = "center";
                ctx.font = "50px vampirFont";
                ctx.fillStyle = "black";
                ctx.fillText("It's a draw!", 165, 175.5);
            }, 1250);
            setTimeout(() => {
                canvas.remove();
                background.appendChild(again);
                background.appendChild(YorN);
            }, 4000);
        }

    });
}

/* checks for victory */
function victory() {

    /* this checks rows */
    for (let i = 0; i < squares2DArray.length; i++) {
        for (let j = 0; j <= squares2DArray[i].length - 5; j++) {
            if (squares2DArray[i][j + 0] === "1X" && squares2DArray[i][j + 1] === "1X" && squares2DArray[i][j + 2] === "1X" && squares2DArray[i][j + 3] === "1X" && squares2DArray[i][j + 4] === "1X") {
                /* player X */
                whoWon = "Player X Won!";
                return true;
            } else if (squares2DArray[i][j + 0] === "1O" && squares2DArray[i][j + 1] === "1O" && squares2DArray[i][j + 2] === "1O" && squares2DArray[i][j + 3] === "1O" && squares2DArray[i][j + 4] === "1O") {
                /* player O */
                whoWon = "Player O Won!";
                return true;
            }
        }
    }

    /* this checks columns */
    for (let i = 0; i <= squares2DArray.length - 5; i++) {
        for (let j = 0; j < squares2DArray[i].length; j++) {
            if (squares2DArray[i + 0][j] === "1X" && squares2DArray[i + 1][j] === "1X" && squares2DArray[i + 2][j] === "1X" && squares2DArray[i + 3][j] === "1X" && squares2DArray[i + 4][j] === "1X") {
                /* player X */
                whoWon = "Player X Won!";
                return true;
            } else if (squares2DArray[i + 0][j] === "1O" && squares2DArray[i + 1][j] === "1O" && squares2DArray[i + 2][j] === "1O" && squares2DArray[i + 3][j] === "1O" && squares2DArray[i + 4][j] === "1O") {
                /* player O */
                whoWon = "Player O Won!";
                return true;
            }
        }
    }

    /* this checks right diagonal */
    for (let i = 0; i <= squares2DArray.length - 5; i++) {
        for (let j = 0; j <= squares2DArray[i].length - 5; j++) {
            if (squares2DArray[i + 0][j + 4] === "1X" && squares2DArray[i + 1][j + 3] === "1X" && squares2DArray[i + 2][j + 2] === "1X" && squares2DArray[i + 3][j + 1] === "1X" && squares2DArray[i + 4][j + 0] === "1X") {
                /* player X */
                whoWon = "Player X Won!";
                return true;
            } else if (squares2DArray[i + 0][j + 4] === "1O" && squares2DArray[i + 1][j + 3] === "1O" && squares2DArray[i + 2][j + 2] === "1O" && squares2DArray[i + 3][j + 1] === "1O" && squares2DArray[i + 4][j + 0] === "1O") {
                /* player O */
                whoWon = "Player O Won!";
                return true;
            }
        }
    }

    /* this checks left diagonal */
    for (let i = 0; i <= squares2DArray.length - 5; i++) {
        for (let j = 0; j <= squares2DArray[i].length - 5; j++) {
            if (squares2DArray[i + 0][j + 0] === "1X" && squares2DArray[i + 1][j + 1] === "1X" && squares2DArray[i + 2][j + 2] === "1X" && squares2DArray[i + 3][j + 3] === "1X" && squares2DArray[i + 4][j + 4] === "1X") {
                /* player X */
                whoWon = "Player X Won!";
                return true;
            } else if (squares2DArray[i + 0][j + 0] === "1O" && squares2DArray[i + 1][j + 1] === "1O" && squares2DArray[i + 2][j + 2] === "1O" && squares2DArray[i + 3][j + 3] === "1O" && squares2DArray[i + 4][j + 4] === "1O") {
                /* player O */
                whoWon = "Player O Won!";
                return true;
            }
        }
    }

}

function reloadPage() {
    window.location.reload();
}

function endGame() {
    again.remove();
    YorN.style.marginTop = "132px";
    YorN.style.fontSize = "32px";
    YorN.innerHTML = "<span>Thanks For Playing</span>";
}