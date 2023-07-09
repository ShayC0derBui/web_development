let canvas = document.getElementById('canvas1');
let ctx = canvas.getContext('2d');
let CANVAS_WIDTH = canvas.width = 350;
let CANVAS_HEIGHT = canvas.height = 600;
canvas.style.width = CANVAS_WIDTH + 'px';
canvas.style.height = CANVAS_HEIGHT + 'px';

let gameFrame = 0;
let numEnemies1 = 10;

class Enemy1{
    constructor() {
        this.image = new Image();
        this.image.src = 'enemies/enemy1.png';
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.flapSpeedStaggerFrame = Math.floor(Math.random() * 3 + 1); //More speed - the slower it is
        this.frame = 0;
    }
    update() {
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;
        if(gameFrame % this.flapSpeedStaggerFrame === 0){
            this.frame > 4? this.frame = 0 : this.frame++;
        }
    }
    draw() { 
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
let enemies = [];
for (let i = 0; i < numEnemies1;i++){
    enemies.push(new Enemy1());
}
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemies.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();

