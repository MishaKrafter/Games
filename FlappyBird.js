const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

bird.src = "https://itproger.com/img/news/flappy_bird_bird.png";
bg.src = "https://itproger.com/img/news/flappy_bird_bg.png";
fg.src = "https://itproger.com/img/news/flappy_bird_fg.png";
pipeUp.src = "https://itproger.com/img/news/flappy_bird_pipeUp.png";
pipeBottom.src = "https://itproger.com/img/news/flappy_bird_pipeBottom.png";

document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 44;
}

const pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
}

let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;

let gap = 110;
let grav = 1.5;

let xPos = 10;
let yPos = 150;

let difficulty = 0;

function updateDifficulty() {

    if (score >= 10 && score < 20) {
        difficulty = 1;
        grav = 1.75;
        gap = 105;
    }

    else if (score >= 20 && score < 35) {
        difficulty = 2;
        grav = 2;
        gap = 100;
    }

    else if (score >= 35 && score < 50) {
        difficulty = 3;
        grav = 2.25;
        gap = 95;
    }

    else if (score >= 50) {
        difficulty = 4;
        grav = 2.25;
        gap = 90;
    }
}

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {

        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        ctx.drawImage(fg, 0, cvs.height - fg.height);
        ctx.drawImage(bird, xPos, yPos);

        if(pipe[i].x === 100) {

            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });

        }

        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= cvs.height - fg.height || yPos <= 0) {

            location.reload();

        }

        if(pipe[i].x === 5) {

            score++;
            updateDifficulty();

            if (score > bestScore) {
                bestScore = score;
                localStorage.setItem("bestScore", bestScore);
            }
        }
    }

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "30px Аvеnіr Nехt W1G";

    ctx.fillText("Score: " + score, 5, cvs.height - 20);
    ctx.fillText("Best: " + bestScore, 5, cvs.height - 50);
    ctx.fillText("Difficulty: " + difficulty, 130, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
