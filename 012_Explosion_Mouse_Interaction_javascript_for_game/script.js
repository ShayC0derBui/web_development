let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let canvasPosition = canvas.getBoundingClientRect();

canvas.width = 600;
canvas.height = 600;
let staggerFrame = 5;
let gameFrame = 0;

const explosions = [];

class Explosions {
    constructor(x, y) {
        this.x = x - canvasPosition.left;
        this.y = y - canvasPosition.top;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.image = new Image();
        this.image.src = 'img/boom.png';
        this.frame = 0;
        this.angle = Math.random() * 6.2;
        this.sound = new Audio();
        this.sound.src = 'audio/poof.wav';
    }
    update() {
        if (this.frame == 0) {
            this.sound.play();
        }
        if (this.frame < 5) {
            if (gameFrame % staggerFrame === 0) {
                this.frame++;
            }
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
        ctx.restore();
    }
}

window.addEventListener('click', function (e) {
    createAnimations(e);
});
// window.addEventListener('mousemove', (e) => {
//     createAnimations(e);
// });


function createAnimations(e) {
    let positionX = e.x;
    let positionY = e.y;
    explosions.push(new Explosions(positionX, positionY));
}

let lastTime = 0;
function animate(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    // console.log(deltaTime);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameFrame++;
    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        if (explosions[i].frame === 5) {
            explosions.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animate);
}
animate();