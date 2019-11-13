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

The above variables are set by default to work on most computers. These values may be changed before creating a renderer, but you may run into errors if the numbers are too high.

# Renderer 
The `RTJS.Renderer();` class sets up a WebGl context that `RTJS` will draw to.

## setup
To set up the renderer you will need to define `var renderer = new RTJS.Renderer();`. Once done you will then need to add the `domElement` to the document with `document.body.appendChild(renderer.domElement);`
