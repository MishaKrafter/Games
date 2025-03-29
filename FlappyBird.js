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
    yPos -= 40;
}

const pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
}

let score = 0;

const gap = 100;
const grav = 1.5;

let xPos = 10;
let yPos = 150;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;
        
        if(pipe[i].x === 100) {
            
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
            
        }

        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {

            location.reload();

        }

        if(pipe[i].x === 5) {
            
            score++;
            
        }
    }
}

pipeBottom.onload = draw;
