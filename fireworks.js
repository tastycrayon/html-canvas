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
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.gravity = 0.005;
    this.friction = 0.98;
    this.alpha = 1;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update() {
    this.velocity.x = this.velocity.x * this.friction;
    this.velocity.y = this.velocity.y * this.friction;

    // this.velocity.x = this.velocity.x + this.gravity;
    this.velocity.y = this.velocity.y + this.gravity;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.draw();
    this.alpha -= 0.008;
  }
}

// Implementation
let particles;
function init() {
  particles = [];
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  //   c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "rgba(0, 0, 0, 0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, i) => {
    if (particle.alpha >= 0) particle.update();
    else particles.splice(i, 1);
  });
}

init();
animate();

window.addEventListener("click", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  const nummberOfPaticles = 400;
  const angleIncrement = (Math.PI * 2) / nummberOfPaticles;
  const radius = 2;
  const x = mouse.x;
  const y = mouse.y;
  const power = 8;
  for (let i = 0; i < nummberOfPaticles; i++) {
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    const velocity = {
      x: Math.cos(angleIncrement * i) * Math.random() * power,
      y: Math.sin(angleIncrement * i) * Math.random() * power,
    };
    particles.push(new Particle(x, y, radius, color, velocity));
  }
});
