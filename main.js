// =====================================================
// 1. CANVAS SETUP & ANIMATION LOOP
// =====================================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  render();
  requestAnimationFrame(animate);
}
animate();


// =====================================================
// 2. CONTROL POINT DEFINITIONS (DATA MODEL)
// =====================================================

let P0 = { x: 100, y: canvas.height / 2 };
let P3 = { x: canvas.width - 100, y: canvas.height / 2 };

let P1 = { x: 300, y: canvas.height / 2, vx: 0, vy: 0 };
let P2 = { x: canvas.width - 300, y: canvas.height / 2, vx: 0, vy: 0 };


// =====================================================
// 3. INPUT HANDLING (MOUSE AS MOTION SOURCE)
// =====================================================

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

canvas.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});


// =====================================================
// 4. SPRING–DAMPING PHYSICS
// =====================================================

const stiffness = 0.08;
const damping = 0.85;

function applySpring(point, targetX, targetY) {
  let ax = -stiffness * (point.x - targetX) - damping * point.vx;
  let ay = -stiffness * (point.y - targetY) - damping * point.vy;

  point.vx += ax;
  point.vy += ay;

  point.x += point.vx;
  point.y += point.vy;
}


// =====================================================
// 5. UPDATE LOGIC (SIMULATION STEP)
// =====================================================

function update() {
  applySpring(P1, mouse.x, mouse.y);
  applySpring(P2, mouse.x, mouse.y);
}


// =====================================================
// 6. CUBIC BÉZIER CURVE MATH (MANUAL IMPLEMENTATION)
// =====================================================

function bezierPoint(t, p0, p1, p2, p3) {
  let u = 1 - t;
  return {
    x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
    y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y
  };
}


// =====================================================
// 7. BÉZIER TANGENT (DERIVATIVE)
// =====================================================

function bezierTangent(t) {
  let u = 1 - t;
  return {
    x: 3*u*u*(P1.x - P0.x) + 6*u*t*(P2.x - P1.x) + 3*t*t*(P3.x - P2.x),
    y: 3*u*u*(P1.y - P0.y) + 6*u*t*(P2.y - P1.y) + 3*t*t*(P3.y - P2.y)
  };
}


// =====================================================
// 8. DRAWING FUNCTIONS
// =====================================================

function drawBezier() {
  ctx.beginPath();
  for (let t = 0; t <= 1; t += 0.01) {
    let p = bezierPoint(t, P0, P1, P2, P3);
    if (t === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawTangents() {
  for (let t = 0; t <= 1; t += 0.1) {
    let p = bezierPoint(t, P0, P1, P2, P3);
    let tan = bezierTangent(t);

    let len = Math.hypot(tan.x, tan.y);
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


// =====================================================
// 9. FINAL RENDER FUNCTION
// =====================================================

function render() {
  drawBezier();
  drawTangents();

  drawPoint(P0, "blue");
  drawPoint(P1, "green");
  drawPoint(P2, "green");
  drawPoint(P3, "blue");
}
