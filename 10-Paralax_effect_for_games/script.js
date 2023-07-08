let gameSpeed = 5;
let slider = document.getElementById("gameSpeed");
slider.addEventListener("input", function(e) {
    gameSpeed = e.target.value;
    document.getElementById("showGameSpeed").innerHTML="<b>"+gameSpeed+"</b>";
});


let img1 = new Image();
img1.src = "backgroundLayers/layer-1.png";
let img2 = new Image();
img2.src = "backgroundLayers/layer-2.png";
let img3 = new Image();
img3.src = "backgroundLayers/layer-3.png";
let img4 = new Image();
img4.src = "backgroundLayers/layer-4.png";
let img5 = new Image();
img5.src = "backgroundLayers/layer-5.png";


let canvas = document.getElementById("canvas");
let CANVAS_WIDTH = canvas.width =  1200;
let CANVAS_HEIGHT = canvas.height = 700;
canvas.style.width = CANVAS_WIDTH + "px";
canvas.style.height = CANVAS_HEIGHT + "px";
let ctx = canvas.getContext("2d");

class Layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if(this.x <= -this.width){
            this.x = 0;
        }
        this.x = this.x - this.speed;
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

let layer1 = new Layer(img1, 0.2);
let layer2 = new Layer(img2, 0.4);
let layer3 = new Layer(img3, 0.6);
let layer4 = new Layer(img4, 0.8);
let layer5 = new Layer(img5, 1);

let background = [layer1, layer2, layer3, layer4, layer5];

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    background.forEach(layer => {
        layer.update();
        layer.draw();
    });
    requestAnimationFrame(animate);
}
animate();