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
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
  return colors[Math.round(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Particles
function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radian = Math.random() * Math.PI * 2;
  this.velocity = { x: 0.05, y: 0.5 };
  this.distanceFromCenter = randomIntFromRange(50, 300);
  this.lastPoint = { x: x, y: y };
  this.lastMouse = { x: x, y: y };

  this.draw = () => {
    c.beginPath();

    c.moveTo(this.lastPoint.x, this.lastPoint.y);
    c.lineTo(this.x, this.y);
    c.lineWidth = radius;
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  };

  this.update = () => {
    this.lastPoint.x = this.x;
    this.lastPoint.y = this.y;
    // move points over time
    this.radian += this.velocity.x;

    //drag effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
    console.log(this.lastMouse.x, mouse.x);
    // circuler motion
    this.x = this.lastMouse.x + Math.cos(this.radian) * this.distanceFromCenter;
    this.y = this.lastMouse.y + Math.sin(this.radian) * this.distanceFromCenter;

    this.draw();
  };
}

// Implementation
let particles;
const numberOfParticles = 200;
function init() {
  particles = [];

  for (let i = 0; i < numberOfParticles; i++) {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = Math.random() * 2 + 1;
    const color = randomColor();
    const particle = new Particle(x, y, radius, color);
    particles.push(particle);
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  //   c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "rgba(0,0,0,0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  for (const particle of particles) particle.update();
}

init();
animate();
