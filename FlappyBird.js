const cvs = document.getElementsByTagName("canvas");
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

const gap = 90;

document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
}

const pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

let score = 0;

let xPos = 10;
let yPos = 150;

const grav = 1.5;


function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;
    }
}
