Interactive Bézier Curve with Physics
About the Project

This project is an interactive visualization of a cubic Bézier curve that behaves like a flexible rope.
The curve reacts in real time to mouse movement and smoothly follows the input using a basic spring and damping model.

The main purpose of this assignment is to understand how Bézier curves work mathematically and how simple physics can be used to create natural-looking motion.

All logic, including Bézier calculations and motion handling, is written manually without using any external libraries.

What This Project Demonstrates

Manual implementation of a cubic Bézier curve

Use of derivatives to compute tangent vectors

Simple physics-based motion (spring + damping)

Real-time rendering using HTML Canvas

Interactive input handling at 60 FPS

Bézier Curve Implementation

The curve is created using four control points:

P0 and P3 are fixed end points

P1 and P2 are middle control points that move dynamically

The curve is calculated using the standard cubic Bézier equation:

B(t) = (1 − t)³P0 + 3(1 − t)²tP1 + 3(1 − t)t²P2 + t³P3


Values of t are sampled from 0 to 1 in small steps, and the resulting points are connected to draw the curve.

Tangent Visualization

To show the direction of the curve at different points, tangent vectors are calculated using the derivative of the Bézier equation.

These tangents are normalized and drawn as small line segments along the curve.
This helps visually understand how the curve flows and changes direction.

Physics-Based Motion

The middle control points move using a simple spring-damping model.

Each frame:

The control point is pulled toward a target (mouse position)

Velocity is reduced using damping

Motion feels smooth and elastic rather than rigid

This approach makes the curve behave more like a rope instead of snapping instantly to the target.

Interaction

Mouse movement controls the target position

Both middle control points respond smoothly

Motion updates in real time using requestAnimationFrame

Rendering

The canvas displays:

The Bézier curve

Control points as small circles

Tangent lines along the curve

Everything is drawn using the HTML Canvas API.

Project Structure
project-folder/
├── index.html   (canvas setup only)
└── main.js      (math, physics, rendering, input)


All logic is intentionally kept inside a single JavaScript file for simplicity and easier evaluation.

How to Run

Open index.html in any modern browser

Move the mouse to see the curve react

You can also deploy the project using GitHub Pages.

Final Notes

This project focuses on clarity and understanding rather than visual complexity.
By implementing all math and motion logic from scratch, it shows a strong grasp of Bézier curves, derivatives, and basic physics used in interactive graphics.