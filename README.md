# About
RTJS is a library that brings ray tracing to the browser. RTJS is a fast and easy to use library that interacts with WebGL for cpu friendly results.

# Linking
Link this library in you html file before any other scripts `<script src='/library/path/rtjs.js'></script>`

All classes, variables, and function for this library will be located in the `RTJS` object.

# Limits
There is a limit to the number of planes, circles, triangles, and spheres that can be handled by the library. You can find these limits under

`RTJS.maxPlanes`

`RTJS.maxCircles`

`RTJS.maxTriangles`

`RTJS.maxSpheres`

`RTJS.mexLights`

The above variables are set by default to work on most computers. You may change these before creating a renderer, but you may run into errors if the numbers are too high.
