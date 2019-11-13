var renderer = new RTJS.Renderer();
var scene = new RTJS.Scene();
var camera = new RTJS.Camera({position:{x:0, y:20, z:-75}});
document.body.appendChild(renderer.domElement);

var circles = [];
var triangles = [];
var spheres = [];
var lights = [];

alert('WASD, Space, and Shift for movement \n + and - to change resolution \n WARNING: Higher resolutions may crash depending on your pc');

for (let c = 0; c < RTJS.maxCircles; c ++) {

    let circleGeometry = new RTJS.CircleGeometry({
        position:{x:Math.random()*40-20, y:Math.random()*40, z:Math.random()*40-20},
        normal:{x:Math.random(), y:Math.random(), z:Math.random()}
    });
    let circleMaterial = new RTJS.Material({
        color:{r:Math.random()*255, g:Math.random()*255, b:Math.random()*255}, 
        ambient:Math.random(), 
        diffuse:Math.random(), 
        specular:Math.random(),
        reflective:Math.random()
    });
    let circleMesh = new RTJS.Mesh(circleGeometry, circleMaterial);
    circles[c] = circleMesh;
    scene.add(circleMesh);

}
for (let t = 0; t < RTJS.maxTriangles; t ++) {

    let position = {x:Math.random()*40-20, y:Math.random()*40, z:Math.random()*40-20};
    let triangleGeometry = new RTJS.TriangleGeometry({vertices:[
        [position.x + Math.random()*2 - 1, position.y + Math.random()*2 - 1, position.z + Math.random()*2 - 1],
        [position.x + Math.random()*2 - 1, position.y + Math.random()*2 - 1, position.z + Math.random()*2 - 1],
        [position.x + Math.random()*2 - 1, position.y + Math.random()*2 - 1, position.z + Math.random()*2 - 1]
    ]});
    let triangleMaterial = new RTJS.Material({
        color:{r:Math.random()*255, g:Math.random()*255, b:Math.random()*255}, 
        ambient:Math.random(), 
        diffuse:Math.random(), 
        specular:Math.random(),
        reflective:Math.random()
    });
    let triangleMesh = new RTJS.Mesh(triangleGeometry, triangleMaterial);
    triangles[t] = triangleMesh;
    scene.add(triangleMesh);

}
for (let s = 0; s < RTJS.maxSpheres; s ++) {

    let sphereGeometry = new RTJS.SphereGeometry({position:{x:Math.random()*40-20, y:Math.random()*40, z:Math.random()*40-20}});
    let sphereMaterial = new RTJS.Material({
        color:{r:Math.random()*255, g:Math.random()*255, b:Math.random()*255}, 
        ambient:Math.random(), 
        diffuse:Math.random(), 
        specular:Math.random(),
        reflective:Math.random()
    });
    let sphereMesh = new RTJS.Mesh(sphereGeometry, sphereMaterial);
    spheres[s] = sphereMesh;
    scene.add(sphereMesh);

}
for (let l = 0; l < RTJS.maxLights; l ++) {

    let lightGeometry = new RTJS.Light({

        position:{x:Math.random()*40-20, y:Math.random()*40, z:Math.random()*40-20},
        color:{r:Math.random()*255, g:Math.random()*255, b:Math.random()*255}

    });
    let lightMesh = new RTJS.Mesh(lightGeometry, {});
    lights[l] = lightMesh;
    scene.add(lights[l]);

}

var planeMaterial = new RTJS.Material();
var redplaneMaterial = new RTJS.Material({color:{r:255, g:0, b:0}});
var greenplaneMaterial = new RTJS.Material({color:{r:0, g:255, b:0}});

var planeGeometry1 = new RTJS.PlaneGeometry({position:{x:0, y:-1, z:0}});
var planeMesh1 = new RTJS.Mesh(planeGeometry1, planeMaterial);
var planeGeometry2 = new RTJS.PlaneGeometry({position:{x:0, y:50, z:0}});
var planeMesh2 = new RTJS.Mesh(planeGeometry2, planeMaterial);
var planeGeometry3 = new RTJS.PlaneGeometry({position:{x:-25, y:0, z:0}, normal:{x:1, y:0, z:0}});
var planeMesh3 = new RTJS.Mesh(planeGeometry3, redplaneMaterial);
var planeGeometry4 = new RTJS.PlaneGeometry({position:{x:25, y:0, z:0}, normal:{x:1, y:0, z:0}});
var planeMesh4 = new RTJS.Mesh(planeGeometry4, greenplaneMaterial);
var planeGeometry5 = new RTJS.PlaneGeometry({position:{x:0, y:0, z:25}, normal:{x:0, y:0, z:1}});
var planeMesh5 = new RTJS.Mesh(planeGeometry5, planeMaterial);

scene.add(planeMesh1);
scene.add(planeMesh2);
scene.add(planeMesh3);
scene.add(planeMesh4);
scene.add(planeMesh5);

renderer.setSize(window.innerWidth, window.innerHeight, 0.1);

var keys = [];
function draw() {

    if (keys[87]) camera.position.z += 0.1;
    if (keys[83]) camera.position.z -= 0.1;
    if (keys[65]) camera.position.x -= 0.1;
    if (keys[68]) camera.position.x += 0.1;
    if (keys[32]) camera.position.y += 0.1;
    if (keys[13]) camera.position.y -= 0.1;

    renderer.render(scene, camera);
    requestAnimationFrame(draw);

}
draw();

window.onkeydown = function (e) {

    keys[e.keyCode] = true;

    if (e.keyCode === 187) renderer.setSize(window.innerWidth, window.innerHeight, Math.min(1, renderer.resolution+0.1));
    if (e.keyCode === 189) renderer.setSize(window.innerWidth, window.innerHeight, Math.max(0.1, renderer.resolution-0.1));


};
window.onkeyup = function (e) {

    keys[e.keyCode] = false;

};
window.onresize = function() {

    renderer.setSize(window.innerWidth, window.innerHeight, 0.1);
    
}