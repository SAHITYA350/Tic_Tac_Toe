
console.log("Welcome to Tic Tac Toe!!");

let music = new Audio("Elektronomia - Sky High _ Progressive House _ NCS - Copyright Free Music.mp3");
music.volume = 0.1; // Set volume to 50%
// Function to start the music
const startMusic = () => {
    music.play().catch(error => {
        console.error("Error playing music:", error);
    });
}
// Call startMusic when the user clicks a button to start the game
document.getElementById('startButton').addEventListener('click', () => {
    startMusic();
    // Other game initialization code...
});
let turnSound = new Audio("click.mp3");
let gameoverAudio = new Audio("WIN sound effect no copyright.mp3");
let turn = "X";
let gameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}

const checkWin = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && 
            (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) && 
            (boxtexts[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " WON !!";
            gameover = true;
            document.querySelector('.gifimg').getElementsByTagName('img')[0].style.width = "200px";

              // Highlight winning boxes
            e.forEach(index => {
                boxtexts[index].style.backgroundColor = "lightgray";
            });

            // Play gameover sound
            gameoverAudio.play();
        }
    });
}


// Function to check for a draw
const checkDraw = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    let filled = Array.from(boxtexts).every(box => box.innerText !== "");
    if (filled && !gameover) {
        document.querySelector('.info').innerText = "It's a Draw!";
        gameover = true;
    }
}

// Function to reset the game

const resetGame = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    Array.from(boxtexts).forEach(box => {
        box.innerText = "";
        box.style.backgroundColor = ""; // Reset background color
    });
    turn = "X";
    gameover = false;
    document.querySelector('.info').innerText = "Turn for " + turn;
};


// Game logic

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !gameover) {
            boxtext.innerText = turn;
            turnSound.play();
            checkWin();
            checkDraw();
            if (!gameover) {
                turn = changeTurn();
                document.getElementsByClassName('info')[0].innerHTML = "Turn for " + turn;
            }
        }
    });
});



//Add onclick listener to reset button

reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    gameover = false;
    document.getElementsByClassName("info")[0].innerText = " Turn for " + turn;
     document.querySelector('.gifimg').getElementsByTagName('img')[0].style.width = "0px";

})

reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
        element.style.backgroundColor = "";
    });
    turn = "X";
    gameover = false;
    document.querySelector(".info").innerText = "Turn for " + turn;
    document.querySelector(".gifimg img").style.width = "0px";

    // Reset the strike line
    const line = document.querySelector(".line");
    line.style.width = "0";
    line.style.transform = "";
    line.style.display = "none";
});
