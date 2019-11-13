var renderer = new RTJS.Renderer();
var scene = new RTJS.Scene();
var camera = new RTJS.Camera({position:{x:0, y:2, z:0}});
renderer.setSize(window.innerWidth, window.innerHeight, 0.4);
document.body.appendChild(renderer.domElement);

alert('WASD, Space, and Shift for movement');

var lights = [];
var spheres = [];

var ground = new RTJS.Mesh(
    new RTJS.PlaneGeometry(),
    new RTJS.Material()
);

lights.push(new RTJS.Mesh(
    new RTJS.Light({position:{x:0, y:2, z:0}, intensity:0.01})
));
lights.push(new RTJS.Mesh(
    new RTJS.Light({position:{x:0, y:5, z:10}, color:{r:0, g:255, b:0}})
));
lights.push(new RTJS.Mesh(
    new RTJS.Light({position:{x:-3, y:5, z:10}, color:{r:255, g:0, b:0}})
));
lights.push(new RTJS.Mesh(
    new RTJS.Light({position:{x:3, y:5, z:10}, color:{r:0, g:0, b:255}})
));

spheres.push(new RTJS.Mesh(
    new RTJS.SphereGeometry({position:{x:0, y:1, z:10}}),
    new RTJS.Material()
));
spheres.push(new RTJS.Mesh(
    new RTJS.SphereGeometry({position:{x:-3, y:0.5, z:10}}),
    new RTJS.Material({reflective:1})
));
spheres.push(new RTJS.Mesh(
    new RTJS.SphereGeometry({position:{x:3, y:1.5, z:10}}),
    new RTJS.Material({specular:0.01})
));

scene.add(ground);
for (let l of lights) scene.add(l);
for (let s of spheres) {
    s.properties = {yv:0};
    scene.add(s);
}

var keys = [];
function draw() {

    if (keys[87]) camera.position.z += 0.1;
    if (keys[83]) camera.position.z -= 0.1;
    if (keys[65]) camera.position.x -= 0.1;
    if (keys[68]) camera.position.x += 0.1;
    if (keys[32]) camera.position.y += 0.1;
    if (keys[13]) camera.position.y -= 0.1;
    lights[0].geometry.position = camera.position;

    for (let s of spheres) {

        s.properties.yv -= 0.01;
        s.geometry.position.y += s.properties.yv;
        if (s.geometry.position.y < 0) {

            s.geometry.position.y = 0;
            s.properties.yv = Math.abs(s.properties.yv);

        }

    }

    renderer.render(scene, camera);
    requestAnimationFrame(draw);

}
draw();

window.onkeydown = function (e) { keys[e.keyCode] = true };
window.onkeyup = function (e) { keys[e.keyCode] = false };
window.onresize = function() {

    renderer.setSize(window.innerWidth, window.innerHeight, 0.4);
    
}