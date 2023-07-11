"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var collisionCanvas = document.getElementById('collisionCanvas');
var collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;
ctx.font = '4rem impact'; // console.log(canvas.width, canvas.height);

var score = 0;
var value = localStorage.getItem('highScore');

if (isNaN(value)) {
  localStorage.setItem('highScore', score);
}

var lastTime = 0;
var timeToNextRaven = 0;
var ravenInterval = 800;
var gameOver = false;
var zenState = false;
var zen = false;
var ravens = [];

var Raven =
/*#__PURE__*/
function () {
  function Raven() {
    _classCallCheck(this, Raven);

    this.image = new Image();
    this.image.src = 'img/raven.png';
    this.directionX = Math.random() * 5 + 2;
    this.directionY = Math.random() * 5 - 2.5;
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.sizeModifier = Math.random() * 0.6 + 0.4;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.maxFrame = 5;
    this.timeSinceFlap = 0;
    this.flapInterval = 400 / this.directionX;
    this.markedForDeletion = false;
    this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
    this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
  }

  _createClass(Raven, [{
    key: "update",
    value: function update(deltaTime) {
      if (this.x + this.width / 1.5 < 0) gameOver = true;

      if (this.x + this.width < 0) {
        this.markedForDeletion = true;
      }

      this.x -= this.directionX;
      this.y += this.directionY;

      if (this.y < 0 || this.y > canvas.height - this.height) {
        this.directionY *= -1;
      }

      this.timeSinceFlap += deltaTime;

      if (this.timeSinceFlap > this.flapInterval) {
        this.frame == this.maxFrame ? this.frame = 0 : this.frame++;
        this.timeSinceFlap = 0;

        if (this.directionX > 6) {
          for (var i = 0; i < 5; i++) {
            particles.push(new Particle(this.x, this.y, this.width));
          }
        }
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      collisionCtx.fillStyle = this.color;
      collisionCtx.fillRect(this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
  }]);

  return Raven;
}();

var explosions = [];

var Explosion =
/*#__PURE__*/
function () {
  function Explosion(x, y, size) {
    _classCallCheck(this, Explosion);

    this.image = new Image();
    this.image.src = 'img/boom.png';
    this.sound = new Audio();
    this.sound.src = 'audio/poof.wav';
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.size = size;
    this.width = this.spriteWidth * this.size;
    this.height = this.spriteHeight * this.size;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.frame = 0;
    this.timeFrame = 0;
    this.staggerTime = 60;
    this.maxFrame = 5;
    this.markedForDeletion = false;
  }

  _createClass(Explosion, [{
    key: "update",
    value: function update(deltaTime) {
      if (this.frame == 0) this.sound.play();
      this.timeFrame += deltaTime;

      if (this.timeFrame > this.staggerTime) {
        this.timeFrame = 0;
        this.frame == this.maxFrame ? this.markedForDeletion = true : this.frame++;
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
  }]);

  return Explosion;
}();

var particles = [];

var Particle =
/*#__PURE__*/
function () {
  function Particle(x, y, size) {
    _classCallCheck(this, Particle);

    this.size = size;
    this.x = x + size * 0.5 + Math.random() * 50 - 25;
    this.y = y + size * 0.33 + Math.random() * 50 - 25;
    this.radius = Math.random() * this.size / 10;
    this.maxRadius = Math.random() * 20 + 35;
    this.markedForDeletion = false;
    this.speedX = Math.random() * 1 + 0.5;
  }

  _createClass(Particle, [{
    key: "update",
    value: function update() {
      this.x += this.speedX;
      this.radius += 0.6;
      if (this.radius > this.maxRadius - 5) this.markedForDeletion = true;
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.save();
      ctx.fillStyle = '#CAF381'; // ctx.shadowColor = '#CAF381';
      // ctx.shadowBlur = 3;

      ctx.globalAlpha = 1 - this.radius / this.maxRadius;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }]);

  return Particle;
}();

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.fillText('Score: ' + score, 50, 70);
  ctx.fillStyle = 'white';
  ctx.fillText('Score: ' + score, 53, 73);
  ctx.fillStyle = 'black';
  ctx.fillText('High Score: ' + localStorage.getItem('highScore'), 50, 160);
  ctx.fillStyle = 'white';
  ctx.fillText('High Score: ' + localStorage.getItem('highScore'), 53, 163);
}

function drawGameOver() {
  ctx.font = '5rem impact';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
  ctx.font = '3rem impact';
  ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 60);
  ctx.fillText('High Score: ' + localStorage.getItem('highScore'), canvas.width / 2, canvas.height / 2 + 130);
  ctx.fillStyle = 'white';
  ctx.font = '5rem impact';
  ctx.fillText('GAME OVER', canvas.width / 2 + 3, canvas.height / 2 + 3);
  ctx.font = '3rem impact';
  ctx.fillText('Score: ' + score, canvas.width / 2 + 3, canvas.height / 2 + 63);
  ctx.fillText('High Score: ' + localStorage.getItem('highScore'), canvas.width / 2 + 3, canvas.height / 2 + 133);
}

function animate(timestamp) {
  collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextRaven += deltaTime;

  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven());
    timeToNextRaven = 0;
    ravens.sort(function (a, b) {
      return a.width - b.width;
    });
  }

  drawScore();
  [].concat(_toConsumableArray(particles), _toConsumableArray(ravens), _toConsumableArray(explosions)).forEach(function (raven) {
    return raven.update(deltaTime);
  });
  [].concat(_toConsumableArray(particles), _toConsumableArray(ravens), _toConsumableArray(explosions)).forEach(function (raven) {
    return raven.draw();
  });
  ravens = ravens.filter(function (raven) {
    return !raven.markedForDeletion;
  });
  explosions = explosions.filter(function (explosion) {
    return !explosion.markedForDeletion;
  });
  particles = particles.filter(function (particle) {
    return !particle.markedForDeletion;
  });
  if (zen || !gameOver) requestAnimationFrame(animate);else {
    drawGameOver();
    window.addEventListener('click', function () {
      restartGame();
    });
  }

  if (!zen && !zenState && score > localStorage.getItem('highScore')) {
    localStorage.setItem('highScore', score);
  }
}

animate(0);
window.addEventListener('click', function (e) {
  var detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
  var pc = detectPixelColor.data;
  ravens.forEach(function (raven) {
    if (raven.randomColors[0] == pc[0] && raven.randomColors[1] == pc[1] && raven.randomColors[2] == pc[2]) {
      raven.markedForDeletion = true;
      explosions.push(new Explosion(e.x, e.y, raven.sizeModifier));
      score++;
    }
  });
});
var zenBtn = document.querySelector('#cb3');
zenBtn.addEventListener('change', function () {
  if (zenBtn.checked) {
    zen = true;
    zenState = true;
  } else {
    zen = false;
  }
});

function restartGame() {
  location.reload();
}