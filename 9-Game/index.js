const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
const CANVAS_HEIGHT = canvas.height = 600;
const CANVAS_WIDHT = canvas.width = 600;

const playerImage = new Image();
playerImage.src = 'img/shadow_dog.png';

const spriteWidth = 575;
const spriteHeight = 523;

let animationTable = [];
let frameTable = [
    {
        name: 'idle',
        frame: 7
    },
    {
        name: 'jump',
        frame: 7
    },
    {
        name: 'fall',
        frame: 7
    },
    {
        name: 'run',
        frame: 8
    },
    {
        name: 'dizzy',
        frame: 11
    },
    {
        name: 'sit',
        frame: 5
    },
    {
        name: 'roll',
        frame: 7
    },
    {
        name: 'bite',
        frame: 7
    },
    {
        name: 'ko',
        frame: 12
    },
    {
        name: 'getHit',
        frame: 4
    },
];
frameTable.forEach((state, index) => {
    animationTable[state.name] = {
        frame: state.frame,
        index: index
    };
});

let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrame = 2;

let playerState = 'idle';
let playerStateIndex = 0;
const dropdown = document.getElementById('playerState');
dropdown.addEventListener('change', (e) => {
    playerState = e.target.value;
    playerStateIndex = animationTable[playerState].index;
    frameY = playerStateIndex;
});

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDHT, CANVAS_HEIGHT);
    ctx.drawImage(playerImage, frameX * spriteWidth,
        frameY * spriteHeight, spriteWidth,
        spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame++;

    frameX = Math.floor(gameFrame / staggerFrame) % animationTable[playerState].frame;
    requestAnimationFrame(animate);
}
animate();