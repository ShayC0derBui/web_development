/**@type {HTMLCanvasElement} */
let NPCs = 4;
let gameFrame = 0;
let numEnemies = 4;
CANVAS_WIDTH = 300;
CANVAS_HEIGHT = 600;

class Canvas {
    constructor(i) {
        this.canvas = document.getElementById('canvas' + i);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.canvas.style.width = CANVAS_WIDTH + 'px';
        this.canvas.style.height = CANVAS_HEIGHT + 'px';
        console.log(this.canvas);
        console.log(this.ctx);
    }
}

let canvas = [];
for (let i = 0; i < NPCs; i++) {
    canvas.push(new Canvas(i));
}

class Enemy1 {
    constructor(i) {
        this.i = i;
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
        // console.log("frame = " + this.frame);
        // console.log("flapSpeedStaggerFrame = " + this.flapSpeedStaggerFrame);
        // console.log("gameFrame = " + gameFrame);
        if (gameFrame % this.flapSpeedStaggerFrame === 0) {
            this.frame == 5 ? this.frame = 0 : this.frame++;
        }
        // gameFrame++;
    }
    draw(i = this.i) {
        canvas[i].ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
class Enemy2 {
    constructor(i) {
        this.i = i;
        this.image = new Image();
        this.image.src = 'enemies/enemy2.png';
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.frame = 0;
        this.speed = Math.random() * 2 + 1;
        this.flapSpeedStaggerFrame = 2 //More speed - the slower it is
        this.angle = Math.random() * 6.28;
        this.angleSpeed = Math.random() * 0.2;
        this.curve = Math.random() * 6;
    }
    update() {
        this.x -= this.speed;
        this.angle += this.angleSpeed;
        this.y += Math.sin(this.angle) * this.curve;
        // console.log("curve = " + this.curve);
        // console.log("sin = " + Math.sin(this.angle));
        // console.log("y = " + this.y);
        if (this.x + this.width < 0) {
            this.x = CANVAS_WIDTH;
            this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        }
        if (gameFrame % this.flapSpeedStaggerFrame == 0) {
            this.frame == 5 ? this.frame = 0 : this.frame++;
        }
        // gameFrame++;
    }
    draw(i = this.i) {
        canvas[i].ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
class Enemy3 {
    constructor(i) {
        this.i = i;
        this.image = new Image();
        this.image.src = 'enemies/enemy3.png';
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.frame = 0;
        this.flapSpeedStaggerFrame = Math.floor(Math.random() * 3 + 1); //More speed - the slower it is
        this.angle = Math.random() * 500;
        this.angleSpeed = Math.random() * 0.1 + 2;
        this.curve = Math.random() * 100 + 70;
    }
    update() {
        this.x = CANVAS_WIDTH / 2 * Math.sin(this.angle * Math.PI / 90) + CANVAS_WIDTH / 2 - this.width / 2;
        this.y = CANVAS_HEIGHT / 2 * Math.cos(this.angle * Math.PI / 180) + CANVAS_HEIGHT / 2 - this.height / 2;
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) {
            this.x = CANVAS_WIDTH;
        }
        if (gameFrame % this.flapSpeedStaggerFrame === 0) {
            this.frame == 5 ? this.frame = 0 : this.frame++;
        }
        // gameFrame++;
    }
    draw(i = this.i) {
        canvas[i].ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
class Enemy4 {
    constructor(i) {
        this.i = i;
        this.image = new Image();
        this.image.src = 'enemies/enemy3.png';
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.newX = Math.random() * (CANVAS_WIDTH - this.width);
        this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
        this.frame = 0;
        this.interval = 150//Math.floor(Math.random() * 200 + 50); 
        this.flapSpeedStaggerFrame = 6; //More speed - the slower it is
    }
    update() {
        let dx = this.newX - this.x;
        let dy = this.newY - this.y;
        this.x += dx / 45;
        this.y += dy / 45;
        if (gameFrame % this.interval === 0) {
            this.newX = Math.random() * (CANVAS_WIDTH - this.width);
            this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
        }
        if (gameFrame % this.flapSpeedStaggerFrame === 0) {
            this.frame == 5 ? this.frame = 0 : this.frame++;
        }
        console.log("gameFrame = " + gameFrame);
        // gameFrame++;
    }
    draw(i = this.i) {
        canvas[i].ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

let enemies = [];
for (let i = 0; i < NPCs; i++) {
    enemies[i] = [];
    for (let j = 0; j < numEnemies ; j++) {
        if (i % 4 === 0) {
            enemies[i].push(new Enemy1(i));
        } else if (i % 4 === 1) {
            enemies[i].push(new Enemy2(i));
        }
        else if (i % 4 === 2) {
            enemies[i].push(new Enemy3(i));
        }
        else if (i % 4 === 3) {
            enemies[i].push(new Enemy4(i));
        }
    }
}
function animate() {
    for (let i = 0; i < NPCs; i++) {
        canvas[i].ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        enemies[i].forEach(enemy => {
            enemy.update();
            enemy.draw();
        });
    }
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();


