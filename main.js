const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Raw mouse input
const rawMouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

// Fixed endpoints
const P0 = { x: 100, y: canvas.height / 2 };
const P3 = { x: canvas.width - 100, y: canvas.height / 2 };

// Control points with physics
const P1 = { x: 300, y: canvas.height / 2, vx: 0, vy: 0 };
const P2 = { x: canvas.width - 300, y: canvas.height / 2, vx: 0, vy: 0 };

// Physics constants
const stiffness = 0.03;
const damping = 0.85;

// Mouse input
canvas.addEventListener("mousemove", (e) => {
  rawMouse.x = e.clientX;
  rawMouse.y = e.clientY;
});

// Cubic Bézier point
function bezierPoint(t, p0, p1, p2, p3) {
  const u = 1 - t;
  return {
    x:
      u * u * u * p0.x +
      3 * u * u * t * p1.x +
      3 * u * t * t * p2.x +
      t * t * t * p3.x,
    y:
      u * u * u * p0.y +
      3 * u * u * t * p1.y +
      3 * u * t * t * p2.y +
      t * t * t * p3.y
  };
}

// Spring physics update
function updateControlPoint(p, tx, ty) {
  const ax = (tx - p.x) * stiffness;
  const ay = (ty - p.y) * stiffness;

  p.vx = (p.vx + ax) * damping;
  p.vy = (p.vy + ay) * damping;

  p.x += p.vx;
  p.y += p.vy;
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Offset targets so curve bends
  const offset = 120;

  updateControlPoint(P1, rawMouse.x - offset, rawMouse.y);
  updateControlPoint(P2, rawMouse.x + offset, rawMouse.y);

  // Draw curve
  ctx.beginPath();
  for (let t = 0; t <= 1; t += 0.01) {
    const p = bezierPoint(t, P0, P1, P2, P3);
    if (t === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();

  requestAnimationFrame(draw);
}

draw();