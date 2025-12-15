/* =====================================================
   Interactive Cubic Bézier Curve with Spring Physics
   Fully corrected version (no black screen)
   ===================================================== */

/* ===============================
   Canvas setup
   =============================== */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

if (!canvas || !ctx) {
  alert("Canvas not found. Check index.html.");
}

// Force canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


/* ===============================
   Control points
   =============================== */

// Fixed end points
let P0 = { x: 100, y: canvas.height / 2 };
let P3 = { x: canvas.width - 100, y: canvas.height / 2 };

// Spring-driven control points
let P1 = { x: 300, y: canvas.height / 2, vx: 0, vy: 0 };
let P2 = { x: canvas.width - 300, y: canvas.height / 2, vx: 0, vy: 0 };


/* ===============================
   Mouse input
   =============================== */

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});


/* ===============================
   Spring physics
   =============================== */

const stiffness = 0.08;
const damping = 0.85;

function applySpring(point, tx, ty) {
  const ax = -stiffness * (point.x - tx) - damping * point.vx;
  const ay = -stiffness * (point.y - ty) - damping * point.vy;

  point.vx += ax;
  point.vy += ay;

  point.x += point.vx;
  point.y += point.vy;
}


/* ===============================
   Update step
   =============================== */

function update() {
  applySpring(P1, mouse.x, mouse.y);
  applySpring(P2, mouse.x, mouse.y);
}


/* ===============================
   Bézier math
   =============================== */

function bezierPoint(t, p0, p1, p2, p3) {
  const u = 1 - t;
  return {
    x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
    y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y
  };
}

function bezierTangent(t) {
  const u = 1 - t;
  return {
    x: 3*u*u*(P1.x - P0.x) + 6*u*t*(P2.x - P1.x) + 3*t*t*(P3.x - P2.x),
    y: 3*u*u*(P1.y - P0.y) + 6*u*t*(P2.y - P1.y) + 3*t*t*(P3.y - P2.y)
  };
}


/* ===============================
   Drawing helpers
   =============================== */

function drawBezier() {
  ctx.beginPath();

  for (let t = 0; t <= 1; t += 0.01) {
    const p = bezierPoint(t, P0, P1, P2, P3);
    if (t === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawTangents() {
  for (let t = 0; t <= 1; t += 0.1) {
    const p = bezierPoint(t, P0, P1, P2, P3);
    const tan = bezierTangent(t);

    const len = Math.hypot(tan.x, tan.y) || 1;
    tan.x /= len;
    tan.y /= len;

    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + tan.x * 25, p.y + tan.y * 25);
    ctx.strokeStyle = "red";
    ctx.stroke();
  }
}

function drawPoint(p, color) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}


/* ===============================
   Render
   =============================== */

function render() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawBezier();
  drawTangents();

  drawPoint(P0, "blue");
  drawPoint(P1, "green");
  drawPoint(P2, "green");
  drawPoint(P3, "blue");
}


/* ===============================
   Animation loop
   =============================== */

function animate() {
  update();
  render();
  requestAnimationFrame(animate);
}

animate();
