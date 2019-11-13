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
The `RTJS.Renderer` class sets up a WebGl context that `RTJS` will draw to.

## setup
To set up the renderer you will need to define `var renderer = new RTJS.Renderer();`. Once done you will then need to add the `domElement` to the document with `document.body.appendChild(renderer.domElement);`

# Scene
The `RTJS.Scene` class is where all of the meshes for the scene will be stored.

## setup
The setup is really simple, all that needs to be done is `var scene = new RTJS.Scene()`.

## adding meshes to scene
The scene is where all of your object meshes will be stored, and `RTJS` makes adding new objects to the scene easy. All that needs to be done is `scene.add(mesh)`

# Camera
To see into the scene, a `RTJS.Camera` class is needed.

## setup
Camera setup is easy as well, all that is needed is `var camera = new RTJS.Camera({options})`

## options
There are a few options when setting up the camera.
  * `position` - The position of the camera, `{x:0, y:0, z:0}`
  * `rotation` - The unit vector rotation of the camera, `{x:0, y:0, z:1}`
  * `backgroundColor` - RGB background color, `{r:0, g:0, b:0}`
  * `fov` - Horizontal FOV slope, `2`
  * `near`- How close an object has to be to get ignored, `0.05`
  * `far` - How far away an object has to be to get ignored, `10000`
