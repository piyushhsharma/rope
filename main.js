const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Fixed endpoints
const P0 = { x: 100, y: canvas.height / 2 };
const P3 = { x: canvas.width - 100, y: canvas.height / 2 };

// Movable control points
let P1 = { x: 300, y: canvas.height / 2 };
let P2 = { x: canvas.width - 300, y: canvas.height / 2 };

// Mouse input
const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Bézier point calculation
function bezierPoint(t, p0, p1, p2, p3) {
  const u = 1 - t;
  return {
    x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
    y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y
  };
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Directly follow mouse (temporary, no physics)
  P1.x = mouse.x;
  P1.y = mouse.y;
  P2.x = mouse.x;
  P2.y = mouse.y;

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