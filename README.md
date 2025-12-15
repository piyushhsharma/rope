Interactive Physics-Based Bézier Curve

 This project uses a spring-damping physics model to create an interactive display of a cubic Bézier curve that responds smoothly to mouse movement, acting like a flexible rope.

 Important Features:

 Four control points are used in the manual cubic Bézier implementation (P0, P3 fixed; P1, P2 dynamic).

 Tangent visualization: To illustrate direction along the curve, derivatives of the curve are calculated and plotted.

 Physics-based motion: Elastic, natural movement is produced by middle control points that smoothly follow the mouse using spring and damping.

 Real-time interaction: HTML Canvas is used to produce updates at 60 frames per second; mouse input drives motion.

 Rendering: The Canvas API is used to draw curves, control points, and tangents.

 Organization:

 index.html: Setting up a canvas

 •zier math, physics, rendering, and input are all included in main.js.

 Use: Launch a contemporary browser and navigate to index.html.

 Goal: Shows knowledge of derivatives, αzier curves, fundamental physics, and interactive graphics without the need for external libraries.