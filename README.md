# About
This was my first attempt at building a ray tracer. This project was done on a school provided chromebook my sophmore year of high school. I will not be making updates or improvements to this project because of the nostalgia that it holds (starting over with my current knowledge would result in a better product anyway).

# Linking
Link this library in your html file before any other scripts `<script src='/rtjs.js'></script>`

All classes, variables, and function for this library will be accessed through `RTJS`

# Limits
There is a limit to the number of planes, circles, triangles, and spheres that can be handled by the library. You can find these limits under

`RTJS.maxPlanes`

`RTJS.maxCircles`

`RTJS.maxTriangles`

`RTJS.maxSpheres`

`RTJS.mexLights`

The above variables are set by default to work on most computers. These values may be changed before creating a renderer, but you may run into errors if the numbers are too high.

# Renderer 
The `RTJS.Renderer` class sets up a WebGL context that `RTJS` will draw to.

## setup
To set up the renderer you will need to define `var renderer = new RTJS.Renderer();` Once done you will then need to add the `domElement` to the document with `document.body.appendChild(renderer.domElement);`

## sizing
Setting the size of the renderer is really simple. Just call `renderer.setSize(width, height, resolution);` The size of the renderer on the page will equal to the `width` and `height`, and the pixel density inside of the renderer can be changed. Real time applications might need a `resolution` of `0.5`, meaning that the renderer only has to deal with half the pixels.

## rendering
To render a scene, just call `renderer.render(scene, camera)`

# Scene
The `RTJS.Scene` class is where all of the meshes for the scene will be stored.

## setup
The setup is really simple, all that needs to be done is `var scene = new RTJS.Scene();`

## adding meshes to scene
The scene is where all of your object meshes will be stored, and `RTJS` makes adding new objects to the scene easy. All that needs to be done is `scene.add(mesh);`

# Camera
To see into the scene, a `RTJS.Camera` class is needed.

## setup
Camera setup is easy as well, all that is needed is `var camera = new RTJS.Camera({options});`

## options
There are a few options when setting up the camera.
  * `position` - The position of the camera, `{x:0, y:0, z:0}`
  * `rotation` - The unit vector rotation of the camera, `{x:0, y:0, z:1}`
  * `backgroundColor` - RGB background color, `{r:0, g:0, b:0}`
  * `fov` - Horizontal FOV slope, `2`
  * `near`- How close an object has to be to get ignored, `0.05`
  * `far` - How far away an object has to be to get ignored, `10000`
  
# Mesh
A `RTJS.Mesh` class contains a `RTJS.Geometry` and `RTJS.Material` class.

## setup
It is pretty hard to mess up when creating a mesh, all than needs to happen is `var mesh = new RTJS.Mesh(geometry, material);`. If you do not provide the class with a material, it will set one for you.

# Material
The `RTJS.Material` class specifies the graphics properties of the mesh.

## setup
To create a material, just write `var material = new RTJS.Material({options});`

## options
There are a few options for creating a material.
  * `color` - The color of the surface, `{r:0, g:0, b:0}`
  * `ambient` - The default brightness of the object, `0.05`
  * `diffuse` - How diffusive the surface is, `1`
  * `specular` - How shiny the surface is, `1`
  * `reflective` - How reflective the surface is, `0`
  
# Geometries
`RTJS` supports `4` different geometries.
  * `RTJS.PlaneGeometry({options)`
  * `RTJS.CircleGeometry({options)`
  * `RTJS.TriangleGeometry({options)`
  * `RTJS.SphereGeometry({options)`
  
## plane geometry options
Every geometry has different options that define them, the plane geometry has
  * `position` -  The position of the infinite plane, `{x:0, y:-1, z:0}`
  * `normal` - The unit vector normal rotation of the plane, `{x:0, y:1, z:0}`
  
## circle geometry options
Every geometry has different options that define them, the circle geometry has
  * `position` -  The position of the circle's center plane, `{x:0, y:-1, z:0}`
  * `normal` - The unit vector normal rotation of the plane, `{x:0, y:1, z:0}`
  * `radius` - The radius of the circle, `1`
  
## triangle geometry options
The triangle only has the `vertices` option. The `vertices` option is a 2d array. The first dimension has `3` elements (one for each vertex). The second dimension also has `3` elemnts (one for `x`, `y`, and `z`).

## sphere geometry options
Every geometry has different options that define them, the circle geometry has
  * `position` -  The position of the spere, `{x:0, y:-1, z:0}`
  * `radius` - The radius of the sphere, `1`
  
# Lighting
Lighting the scene requires the `RTJS.Light` class. Only point lights are supported and lights are considered a geometry. To create a light, just write `var light = new RTJS.Light({options})`

## options
The light class has three options
  * `position` - The position of the light, `{x:0, y:0, z:0}`
  * `color` - The color of the light, `{r:255, g:255, b:255}`
  * `intensity` - The intensity of the light, `0.025`
  
 Note: lights still need to be added to a mesh before adding them to the scene, any material with the light will be ignored.
