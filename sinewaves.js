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

//gui setup
const gui = new dat.GUI();
const wave = {
  y: canvas.height / 2,
  amiplitude: 100,
  length: 0.01,
  velocity: 0.1,
  frequency: 0.01,
};
const bgColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01,
};
const strokeColor = {
  h: 200,
  s: 50,
  l: 50,
};
const waveFolder = gui.addFolder("wave");
waveFolder.add(wave, "y", 0, canvas.height / 2);
waveFolder.add(wave, "amiplitude", -300, 300);
waveFolder.add(wave, "length", -0.01, 0.01);
waveFolder.add(wave, "frequency", -0.1, 1);

const backgroundFolder = gui.addFolder("background");
backgroundFolder.add(bgColor, "r", 0, 255);
backgroundFolder.add(bgColor, "g", 0, 255);
backgroundFolder.add(bgColor, "b", 0, 255);
backgroundFolder.add(bgColor, "a", 0, 1);

const strokeFolder = gui.addFolder("stroke");
strokeFolder.add(strokeColor, "h", 0, 360);
strokeFolder.add(strokeColor, "s", 0, 100);
strokeFolder.add(strokeColor, "l", 0, 100);

//end gui
// sinwaves

let increment = wave.frequency;
function init() {
  const animate = () => {
    requestAnimationFrame(animate);
    c.fillStyle = `rgba(${bgColor.r},${bgColor.g},${bgColor.b},${bgColor.a})`;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.moveTo(0, canvas.height / 2);
    for (let i = 0; i < canvas.width; i++) {
      c.lineTo(
        i,
        wave.y +
          Math.sin(i * wave.length + increment) *
            Math.sin(increment) *
            wave.amiplitude
      );
    }
    c.strokeStyle = `hsl( ${strokeColor.h * Math.abs(Math.sin(increment))}, ${
      strokeColor.s
    }%, ${strokeColor.l}% )`;
    c.stroke();
    c.closePath();
    increment += wave.frequency;
  };
  animate();
}

init();
