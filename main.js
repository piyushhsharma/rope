const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// -------------------- Input --------------------
const rawMouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

canvas.addEventListener("mousemove", (e) => {
  rawMouse.x = e.clientX;
  rawMouse.y = e.clientY;
});

// -------------------- Control Points --------------------
const P0 = { x: 100, y: canvas.height / 2 };
const P3 = { x: canvas.width - 100, y: canvas.height / 2 };

const P1 = { x: 300, y: canvas.height / 2, vx: 0, vy: 0 };
const P2 = { x: canvas.width - 300, y: canvas.height / 2, vx: 0, vy: 0 };

// -------------------- Physics --------------------
const stiffness = 0.02;
const damping = 0.85;

function updateControlPoint(p, targetX, targetY) {
  const ax = -stiffness * (p.x - targetX);
  const ay = -stiffness * (p.y - targetY);

  p.vx = (p.vx + ax) * damping;
  p.vy = (p.vy + ay) * damping;

  p.x += p.vx;
  p.y += p.vy;
}

// -------------------- Bézier Math --------------------
function bezierPoint(t, p0, p1, p2, p3) {
  const u = 1 - t;
  return {
    x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
    y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y
  };
}

function bezierTangent(t, p0, p1, p2, p3) {
  const u = 1 - t;
  return {
    x:
      3*u*u*(p1.x - p0.x) +
      6*u*t*(p2.x - p1.x) +
      3*t*t*(p3.x - p2.x),
    y:
      3*u*u*(p1.y - p0.y) +
      6*u*t*(p2.y - p1.y) +
      3*t*t*(p3.y - p2.y)
  };
}

function normalize(v) {
  const len = Math.hypot(v.x, v.y);
  return {
    x: v.x / len,
    y: v.y / len
  };
}

// -------------------- Rendering Helpers --------------------
function drawPoint(p, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
  ctx.fill();
}

// -------------------- Main Loop --------------------
function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Physics (rope-like behavior)
  updateControlPoint(P1, rawMouse.x, rawMouse.y);
  updateControlPoint(P2, rawMouse.x + 150, rawMouse.y);

  // Draw Bézier curve
  ctx.beginPath();
  for (let t = 0; t <= 1; t += 0.01) {
    const p = bezierPoint(t, P0, P1, P2, P3);
    if (t === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw tangents
  for (let t = 0; t <= 1; t += 0.1) {
    const p = bezierPoint(t, P0, P1, P2, P3);
    const tan = normalize(bezierTangent(t, P0, P1, P2, P3));

    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + tan.x * 30, p.y + tan.y * 30);
    ctx.strokeStyle = "lime";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw control points
  drawPoint(P0, "yellow");
  drawPoint(P1, "red");
  drawPoint(P2, "blue");
  drawPoint(P3, "yellow");

  requestAnimationFrame(draw);
}

draw();
