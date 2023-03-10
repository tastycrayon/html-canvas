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

let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");

const getrandomIntFromRange = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};
const getrandomColor = () => {
  return colors[getrandomIntFromRange(0, colors.length)];
};
const distance = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.hypot(dx, dy);
};

const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
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

//helper
/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };

  return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;
  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    // example 5 degree is rotated at -5 degree angle thus becoming 0 degree
    const angle = -Math.atan2(yDist, xDist);

    // Store mass in var for better readability in collision equation
    const [m1, m2] = [particle.mass, otherParticle.mass];

    // Velocity before equation
    const [u1, u2] = [
      rotate(particle.velocity, angle),
      rotate(otherParticle.velocity, angle),
    ];
    // Velocity after 1d collision equation
    // m1, m2, and velocities u1, u2 before collision, v1, v2 after collision
    // m1 * u1 + m2 * u2 = m1 * v1 + m2 * v2
    const [v1, v2] = [
      {
        x: u1.x * ((m1 - m2) / (m1 + m2)) + (2 * m2 * u2.x) / (m1 + m2),
        y: u1.y,
      },
      {
        x: u2.x * ((m2 - m1) / (m1 + m2)) + (2 * m1 * u1.x) / (m1 + m2),
        y: u2.y,
      },
    ];

    // Final velocity after rotating axis back to original location
    const [v1Final, v2Final] = [rotate(v1, -angle), rotate(v2, -angle)];

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = v1Final.x;
    particle.velocity.y = v1Final.y;

    otherParticle.velocity.x = v2Final.x;
    otherParticle.velocity.y = v2Final.y;
  }
}

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: Math.random() * 4 + 2,
      y: Math.random() * 4 + 2,
    };
    this.mass = this.radius / 10;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.stroke();
    context.fill();
    context.closePath();
  }

  update(particles) {
    if (this.x + this.radius > canvas.width || this.x < this.radius)
      this.velocity.x = -this.velocity.x;
    if (this.y + this.radius > canvas.height || this.y < this.radius)
      this.velocity.y = -this.velocity.y;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    //collision
    for (const particle of particles) {
      // skip current one while macthing with others
      if (this === particle) continue;
      const R = particle.radius + this.radius;
      const d = distance(this.x, this.y, particle.x, particle.y);

      //if collided
      if (d < R) resolveCollision(this, particle);
    }
    //end collision
    this.draw();
  }
}

// Implementation
let particles;
const numberOfParticles = 100;
function init() {
  particles = [];
  for (let i = 0; i < numberOfParticles; i++) {
    const radius = getrandomIntFromRange(10, 40);
    let x = getrandomIntFromRange(radius, canvas.width - radius);
    let y = getrandomIntFromRange(radius, canvas.height - radius);
    let color = getrandomColor();

    //prevent particle spawning on top of each other
    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        if (j > 1000) break;
        const d = distance(x, y, particles[j].x, particles[j].y);
        const R = radius + particles[j].radius;
        // console.log(d > R);
        if (d < R) {
          y = getrandomIntFromRange(radius, canvas.height - radius);
          x = getrandomIntFromRange(radius, canvas.width - radius);
          j = -1;
        }
      }
    }
    particles.push(new Particle(x, y, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (const particle of particles) particle.update(particles);
}

init();
animate();

console.log(particles);
