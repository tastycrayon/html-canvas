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
    this.velocity = velocity;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
}

// Implementation
let particles = [];
const numberOfPartciles = 30;
const spawnSpeed = 200;
const angleRatio = (Math.PI * 2) / numberOfPartciles;
const distanceFromCenter = 30;
const radius = 5;

let hueRadians = 0;
const loopParticle = (x, y) => {
  for (let i = 0; i < numberOfPartciles; i++) {
    const velocity = {
      x: Math.cos(angleRatio * i),
      y: Math.sin(angleRatio * i),
    };
    const color = `hsl(${Math.round(hueRadians * 360)}, 50%, 50%)`;
    particles.push(new Particle(x, y, radius, color, velocity));
  }
  hueRadians += 0.01;
};

function init() {
  particles = [];
  loopParticle(canvas.width / 2, canvas.height / 2);
}

//loop
const generateRing = () => {
  setTimeout(generateRing, spawnSpeed);
  loopParticle(mouse.x, mouse.y);
};
generateRing();

// clean canvas
setTimeout(() => {
  setInterval(() => {
    particles.splice(0, numberOfPartciles);
  }, spawnSpeed);
}, 10 * 1000);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
  });
}

init();
animate();
