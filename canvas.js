let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
// context.fillStyle = "rgba(255, 0, 0, 0.5)";
// context.fillRect(100, 100, 50, 50);
// context.fillStyle = "rgba(0, 0, 255, 0.5)";
// context.fillRect(300, 100, 50, 50);

// context.beginPath();
// context.moveTo(100, 200);
// context.lineTo(200, 200);
// context.lineTo(250, 150);
// context.strokeStyle = "black";
// context.stroke();

const colors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};
const getRandomColor = () => {
  return colors[Math.round(getRandom(0, colors.length))];
};

const mouse = { x: undefined, y: undefined };
window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener("mouseout", (event) => {
  mouse.x = undefined;
  mouse.y = undefined;
});
//resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
// object based
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.color = getRandomColor();
  this.minRadius = 5;
  this.maxRadius = 50;
  this.radius = this.minRadius;

  this.draw = () => {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  };
  this.update = () => {
    this.draw();
    if (this.x + this.radius > window.innerWidth || this.x - radius < 0)
      this.dx = -this.dx;
    if (this.y + this.radius > window.innerHeight || this.y - radius < 0)
      this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;

    //mouse Interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius <= this.maxRadius) this.radius += 1;
    } else if (this.radius >= this.minRadius) this.radius -= 1;
  };
}

const init = () => {
  const circleArray = [];
  const numberOfCircles = 100;
  for (let i = 0; i < numberOfCircles; i++) {
    const radius = getRandom(10, 40);
    const x = getRandom(radius, window.innerWidth - radius);
    const y = getRandom(radius, window.innerHeight - radius);
    const dx = getRandom(1, 2);
    const dy = getRandom(1, 2);
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }

  const animate = () => {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const circle of circleArray) circle.update();
  };
  animate();
};

init();
