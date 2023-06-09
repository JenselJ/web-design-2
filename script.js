const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 460;
canvas.height = 440;

//global settings
ctx.lineWidth = 10;
ctx.strokeStyle = "magenta";

// canvas shadows
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowColor = "white";

// gradients
const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient1.addColorStop("0.2", "pink");
gradient1.addColorStop("0.3", "red");

gradient1.addColorStop("0.4", "orange");

gradient1.addColorStop("0.5", "yellow");

gradient1.addColorStop("0.6", "green");

gradient1.addColorStop("0.7", "turquoise");

gradient1.addColorStop("0.8", "violet");

const gradient2 = ctx.createRadialGradient(
  canvas.width * 0.5,
  canvas.height * 0.5,
  30,
  canvas.width * 0.5,
  canvas.height * 0.5,
  200
);
gradient2.addColorStop("0.2", "green");
gradient2.addColorStop("0.4", "red");
gradient2.addColorStop("0.6", "blue");

// canvas pattern
const img = document.getElementById("broken");
// let loadedImageWidth = img.width;
// let loadedImageHeight = img.height;

// let scale_factor = Math.min(
//   canvas.width / img.width,
//   canvas.height / img.height
// );

// let newWidth = img.width * scale_factor;
// let newHeight = img.height * scale_factor;
// let x = canvas.width / 2 - newWidth / 2;
// let y = canvas.height / 2 - newHeight / 2;

// img.width = x;
// img.height = y;

const pattern1 = ctx.createPattern(text, "no-repeat");

ctx.strokeStyle = pattern1;

class Line {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.history = [{ x: this.x, y: this.y }];
    this.lineWidth = Math.floor(Math.random() * 15 + 1);
    this.hue = Math.floor(Math.random() * 360);
    this.maxLength = Math.floor(Math.random() * 150 + 10);
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = 5;
    this.lifeSpan = this.maxLength * 2;
    this.timer = 0;
  }
  draw(context) {
    // context.strokeStyle = "hsl(" + this.hue + ", 100%, 50%)";
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(this.history[0].x, this.history[0].y);

    for (let i = 0; i < this.history.length; i++) {
      context.lineTo(this.history[i].x, this.history[i].y);
    }
    context.stroke();
  }
  update() {
    this.timer++;
    if (this.timer < this.lifeSpan) {
      this.x += this.speedX + Math.random() * 50 - 25;
      this.y += this.speedY + Math.random() * 50 - 25;
      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > this.maxLength) {
        this.history.shift();
      }
    } else if (this.history.length <= 1) {
      this.reset();
    } else {
      this.history.shift();
    }
  }
  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.history = [{ x: this.x, y: this.y }];
    this.timer = 0;
  }
}

const linesArray = [];
const numberOfLines = 50;

for (let i = 0; i < numberOfLines; i++) {
  linesArray.push(new Line(canvas));
}

console.log(linesArray);
linesArray.forEach((line) => {
  line.draw(ctx);
});

class Effect {
  constructor(canvas, ctx) {
    this.context = ctx;
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.init();
  }

  drawText() {
    this.context.font = "250px Impact";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillStyle = "black";
    const text = this.context.fillText(
      "BROKEN",
      this.width * 0.5,
      this.height * 0.5,
      this.width * 0.9
    );
  }

  init() {
    this.drawText();
  }

  render() {
    this.drawText();
  }
}

const effect = new Effect(canvas, ctx);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.render();

  //draw line
  linesArray.forEach((line) => {
    line.draw(ctx);
    line.update();
  });
  //update line
  requestAnimationFrame(animate);
}
animate();
