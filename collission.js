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
const getDistance = (x1, y1, x2, y2) => {
  const dx = x1 - x2;
  const dy = y1 - y2;
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

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
    this.gravity = 1;
    this.friction = 0.9;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
    context.strokeStyle = this.color;
    context.stroke();
    context.closePath();
  }

  update() {
    this.draw();
  }
}

// Implementation
let objects;
let circle1, circle2;
function init() {
  objects = [];
  for (let i = 0; i < 2; i++) {
    const radius = getrandomIntFromRange(20, 60);
    const x = getrandomIntFromRange(radius, canvas.width - radius);
    const y = getrandomIntFromRange(radius, canvas.height - radius);
    const dx = getrandomIntFromRange(-1, 1);
    const dy = getrandomIntFromRange(3, 4);
    let color = getrandomColor();

    objects.push(new Ball(x, y, dx, dy, radius, color));
  }
}

const radius = 30;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  //mouse
  objects[0].x =
    mouse.x + objects[0].radius < canvas.width && mouse.x > radius
      ? mouse.x
      : objects[0].x;
  objects[0].y =
    mouse.y + objects[0].radius < canvas.height && mouse.y > radius
      ? mouse.y
      : objects[0].y;
  //collision
  const distance = getDistance(
    objects[0].x,
    objects[0].y,
    objects[1].x,
    objects[1].y
  );
  const R = objects[0].radius + objects[1].radius;
  if (distance <= R) objects[1].color = "blue";
  else objects[1].color = "yellow";
  for (const object of objects) object.update();
}

init();
animate();
