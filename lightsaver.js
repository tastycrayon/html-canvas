function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
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

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
let angle = 0;
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX - canvas.width / 2;
  mouse.y = event.clientY - canvas.height / 2;
  angle = Math.atan2(mouse.y, mouse.x);
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Particles
class Particle {
  constructor(x, y, radius, color, distFromC) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.distFromC = distFromC;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.x = canvas.width / 2 + this.distFromC * Math.cos(angle);
    this.y = canvas.height / 2 + this.distFromC * Math.sin(angle);

    this.draw();
  }
}

// Implementation
let particles;
function init() {
  particles = [];
  const length = 150;
  const radius = 5;
  for (let i = 0; i < length; i++) {
    const color = `hsl(${(i * 360) / 100},50%,50%)`;
    const x = canvas.width / 2 + i * Math.cos(Math.PI);
    const y = canvas.height / 2 + i * Math.sin(-Math.PI);
    particles.push(new Particle(x, y, radius, color, i));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  // c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "rgba(0, 0, 0, 0.07)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.update();
  });
}

init();
animate();
