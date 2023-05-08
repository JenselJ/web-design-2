const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 460;
canvas.height = 440;

//global settings
ctx.lineWidth = 10;
ctx.strokeStyle = "magenta";

class Line {
  constructor(canvas) {
    this.canvas = canvas;
    this.startX = Math.random() * this.canvas.width;
    this.startY = Math.random() * this.canvas.height;
    this.endX = Math.random() * this.canvas.width;
    this.endY = Math.random() * this.canvas.height;
    this.lineWidth = Math.floor(Math.random() * 15 + 1);
    this.hue = Math.floor(Math.random() * 360);
  }
  draw(context) {
    context.strokeStyle = "hsl(" + this.hue + ", 100%, 50%)";
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(this.startX, this.startY);
    context.lineTo(this.endX, this.endY);
    context.stroke();
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
