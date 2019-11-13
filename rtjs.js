let RTJS = {};

RTJS.maxPlanes = 5;
RTJS.maxCircles = 10;
RTJS.maxTriangles = 50;
RTJS.maxSpheres = 30;
RTJS.maxLights = 20;

RTJS.Renderer = class {

    constructor () {

        // Set Up WebGL Canvas
        this.domElement = document.createElement('canvas');
        this.gl = this.domElement.getContext('webgl');

        // Create Shaders
        this.vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(this.vertexShader, RTJS.vertexSource);
        this.gl.shaderSource(this.fragmentShader, RTJS.fragmentSource);

        // Compile Shaders
        this.gl.compileShader(this.vertexShader);
        this.gl.compileShader(this.fragmentShader);
        console.log(this.gl.getShaderInfoLog(this.vertexShader));
        console.log(this.gl.getShaderInfoLog(this.fragmentShader));

        // Create Program
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);
        this.gl.linkProgram(this.program);
        console.log(this.gl.getProgramInfoLog(this.program));
        
        // Define Drawing Area
        let buffer = this.gl.createBuffer();
        this.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1]);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW);
        this.gl.useProgram(this.program);
        this.gl.enableVertexAttribArray(this.program.position);
        this.gl.vertexAttribPointer(this.program.position, 2, this.gl.FLOAT, false, 2*4, 0);

        // Clear Canvas
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        // Link Shader Objects
        this.program.camera = {};
        this.program.planes = [];
        this.program.circles = [];
        this.program.triangles = [];
        this.program.spheres = [];
        this.program.lights = [];

        // Link Shader Dimensions
        this.program.viewport = this.gl.getUniformLocation(this.program, 'viewport');

        // Link Camera
        this.program.camera.position = this.gl.getUniformLocation(this.program, 'camera.position');
        this.program.camera.rotation = this.gl.getUniformLocation(this.program, 'camera.rotation');
        this.program.camera.backgroundColor = this.gl.getUniformLocation(this.program, 'camera.backgroundColor');
        this.program.camera.fov = this.gl.getUniformLocation(this.program, 'camera.fov');
        this.program.camera.near = this.gl.getUniformLocation(this.program, 'camera.near');
        this.program.camera.far = this.gl.getUniformLocation(this.program, 'camera.far');
        this.program.camera.type = this.gl.getUniformLocation(this.program, 'camera.type');

        // Link Planes
        for (let p = 0; p < RTJS.maxPlanes; p ++) {

            this.program.planes[p] = {};
            this.program.planes[p].material = {};
            this.program.planes[p].geometry = {};

            this.program.planes[p].geometry.position = this.gl.getUniformLocation(this.program, `planes[${p}].position`);
            this.program.planes[p].geometry.normal = this.gl.getUniformLocation(this.program, `planes[${p}].normal`);

            this.program.planes[p].material.color = this.gl.getUniformLocation(this.program, `planes[${p}].material.color`);
            this.program.planes[p].material.ambient = this.gl.getUniformLocation(this.program, `planes[${p}].material.ambient`);
            this.program.planes[p].material.diffuse = this.gl.getUniformLocation(this.program, `planes[${p}].material.diffuse`);
            this.program.planes[p].material.specular = this.gl.getUniformLocation(this.program, `planes[${p}].material.specular`);
            this.program.planes[p].material.reflective = this.gl.getUniformLocation(this.program, `planes[${p}].material.reflective`);

        }

        // Link Circles
        for (let c = 0; c < RTJS.maxCircles; c ++) {

            this.program.circles[c] = {};
            this.program.circles[c].material = {};
            this.program.circles[c].geometry = {};

            this.program.circles[c].geometry.position = this.gl.getUniformLocation(this.program, `circles[${c}].position`);
            this.program.circles[c].geometry.normal = this.gl.getUniformLocation(this.program, `circles[${c}].normal`);
            this.program.circles[c].geometry.radius = this.gl.getUniformLocation(this.program, `circles[${c}].radius`);

            this.program.circles[c].material.color = this.gl.getUniformLocation(this.program, `circles[${c}].material.color`);
            this.program.circles[c].material.ambient = this.gl.getUniformLocation(this.program, `circles[${c}].material.ambient`);
            this.program.circles[c].material.diffuse = this.gl.getUniformLocation(this.program, `circles[${c}].material.diffuse`);
            this.program.circles[c].material.specular = this.gl.getUniformLocation(this.program, `circles[${c}].material.specular`);
            this.program.circles[c].material.reflective = this.gl.getUniformLocation(this.program, `circles[${c}].material.reflective`);

        }

        // Link Triangles
        for (let t = 0; t < RTJS.maxTriangles; t ++) {

            this.program.triangles[t] = {};
            this.program.triangles[t].material = {};
            this.program.triangles[t].geometry = {};

            this.program.triangles[t].geometry.vertex1 = this.gl.getUniformLocation(this.program, `triangles[${t}].vertex1`);
            this.program.triangles[t].geometry.vertex2 = this.gl.getUniformLocation(this.program, `triangles[${t}].vertex2`);
            this.program.triangles[t].geometry.vertex3 = this.gl.getUniformLocation(this.program, `triangles[${t}].vertex3`);

            this.program.triangles[t].material.color = this.gl.getUniformLocation(this.program, `triangles[${t}].material.color`);
            this.program.triangles[t].material.ambient = this.gl.getUniformLocation(this.program, `triangles[${t}].material.ambient`);
            this.program.triangles[t].material.diffuse = this.gl.getUniformLocation(this.program, `triangles[${t}].material.diffuse`);
            this.program.triangles[t].material.specular = this.gl.getUniformLocation(this.program, `triangles[${t}].material.specular`);
            this.program.triangles[t].material.reflective = this.gl.getUniformLocation(this.program, `triangles[${t}].material.reflective`);

        }

        // Link Spheres
        for (let s = 0; s < RTJS.maxSpheres; s ++) {

            this.program.spheres[s] = {};
            this.program.spheres[s].material = {};
            this.program.spheres[s].geometry = {};

            this.program.spheres[s].geometry.position = this.gl.getUniformLocation(this.program, `spheres[${s}].position`);
            this.program.spheres[s].geometry.radius = this.gl.getUniformLocation(this.program, `spheres[${s}].radius`);

            this.program.spheres[s].material.color = this.gl.getUniformLocation(this.program, `spheres[${s}].material.color`);
            this.program.spheres[s].material.ambient = this.gl.getUniformLocation(this.program, `spheres[${s}].material.ambient`);
            this.program.spheres[s].material.diffuse = this.gl.getUniformLocation(this.program, `spheres[${s}].material.diffuse`);
            this.program.spheres[s].material.specular = this.gl.getUniformLocation(this.program, `spheres[${s}].material.specular`);
            this.program.spheres[s].material.reflective = this.gl.getUniformLocation(this.program, `spheres[${s}].material.reflective`);

        }

        // Link Lights
        for (let l = 0; l < RTJS.maxLights; l ++) {

            this.program.lights[l] = {};

            this.program.lights[l].position = this.gl.getUniformLocation(this.program, `lights[${l}].position`);
            this.program.lights[l].color = this.gl.getUniformLocation(this.program, `lights[${l}].color`);
            this.program.lights[l].intensity = this.gl.getUniformLocation(this.program, `lights[${l}].intensity`);

        }

        // Link Shader Counters
        this.program.planeCount = this.gl.getUniformLocation(this.program, 'planeCount');
        this.program.circleCount = this.gl.getUniformLocation(this.program, 'circleCount');
        this.program.triangleCount = this.gl.getUniformLocation(this.program, 'triangleCount');
        this.program.sphereCount = this.gl.getUniformLocation(this.program, 'sphereCount');
        this.program.lightCount = this.gl.getUniformLocation(this.program, 'lightCount');

        // Set Renderer Size
        this.setSize(400, 400, 1);

    }

    setSize (width, height, resolution = 1) {

        // Resize Resolution
        this.resolution = resolution;
        this.width = this.domElement.width = width * resolution;
        this.height = this.domElement.height = height * resolution;

        // Resize Canvas
        this.domElement.style.width = width;
        this.domElement.style.height = height;

        // Resize Shader
        this.gl.uniform2fv(this.program.viewport, [this.width, this.height]);

        // Resize WebGL
        this.gl.viewport(0, 0, this.width, this.height);

    }

    render (scene, camera) {

        // Send Camera To Shader
        this.gl.uniform3fv(this.program.camera.position, [camera.position.x, camera.position.y, camera.position.z]);
        this.gl.uniform3fv(this.program.camera.rotation, [camera.rotation.x, camera.rotation.y, camera.rotation.z]);
        this.gl.uniform3fv(this.program.camera.backgroundColor, [camera.backgroundColor.r/255, camera.backgroundColor.g/255, camera.backgroundColor.b/255]);
        this.gl.uniform1f(this.program.camera.fov, camera.fov);
        this.gl.uniform1f(this.program.camera.near, camera.near);
        this.gl.uniform1f(this.program.camera.far, camera.far);
        this.gl.uniform1i(this.program.camera.type, camera.type);

        // Setup Object Counters
        let planeCount = 0;
        let circleCount = 0;
        let triangleCount = 0;
        let sphereCount = 0;
        let lightCount = 0;
        let m, mesh;

        // Send Object Counts To Shader
        for (m in scene.meshes) {

            mesh = scene.meshes[m];
            
            // Define Plane In Fragment
            if (mesh.geometry.type === 'PLANE') {

                this.gl.uniform3fv(this.program.planes[planeCount].geometry.position, [mesh.geometry.position.x, mesh.geometry.position.y, mesh.geometry.position.z]);
                this.gl.uniform3fv(this.program.planes[planeCount].geometry.normal, [mesh.geometry.normal.x, mesh.geometry.normal.y, mesh.geometry.normal.z]);
                this.gl.uniform3fv(this.program.planes[planeCount].material.color, [mesh.material.color.r/255, mesh.material.color.g/255, mesh.material.color.b/255]);
                this.gl.uniform1f(this.program.planes[planeCount].material.ambient, mesh.material.ambient);
                this.gl.uniform1f(this.program.planes[planeCount].material.diffuse, mesh.material.diffuse);
                this.gl.uniform1f(this.program.planes[planeCount].material.specular, mesh.material.specular);
                this.gl.uniform1f(this.program.planes[planeCount].material.reflective, mesh.material.reflective);
                planeCount ++;

            }

            // Define Circle In Fragment
            if (mesh.geometry.type === 'CIRCLE') {

                this.gl.uniform3fv(this.program.circles[circleCount].geometry.position, [mesh.geometry.position.x, mesh.geometry.position.y, mesh.geometry.position.z]);
                this.gl.uniform3fv(this.program.circles[circleCount].geometry.normal, [mesh.geometry.normal.x, mesh.geometry.normal.y, mesh.geometry.normal.z]);
                this.gl.uniform1f(this.program.circles[circleCount].geometry.radius, mesh.geometry.radius);
                this.gl.uniform3fv(this.program.circles[circleCount].material.color, [mesh.material.color.r/255, mesh.material.color.g/255, mesh.material.color.b/255]);
                this.gl.uniform1f(this.program.circles[circleCount].material.ambient, mesh.material.ambient);
                this.gl.uniform1f(this.program.circles[circleCount].material.diffuse, mesh.material.diffuse);
                this.gl.uniform1f(this.program.circles[circleCount].material.specular, mesh.material.specular);
                this.gl.uniform1f(this.program.circles[circleCount].material.reflective, mesh.material.reflective);
                circleCount ++;

            }

            // Define Triangle In Fragment
            if (mesh.geometry.type === 'TRIANGLE') {

                this.gl.uniform3fv(this.program.triangles[triangleCount].geometry.vertex1, mesh.geometry.vertices[0]);
                this.gl.uniform3fv(this.program.triangles[triangleCount].geometry.vertex2, mesh.geometry.vertices[1]);
                this.gl.uniform3fv(this.program.triangles[triangleCount].geometry.vertex3, mesh.geometry.vertices[2]);
                this.gl.uniform3fv(this.program.triangles[triangleCount].material.color, [mesh.material.color.r/255, mesh.material.color.g/255, mesh.material.color.b/255]);
                this.gl.uniform1f(this.program.triangles[triangleCount].material.ambient, mesh.material.ambient);
                this.gl.uniform1f(this.program.triangles[triangleCount].material.diffuse, mesh.material.diffuse);
                this.gl.uniform1f(this.program.triangles[triangleCount].material.specular, mesh.material.specular);
                this.gl.uniform1f(this.program.triangles[triangleCount].material.reflective, mesh.material.reflective);
                triangleCount ++;

            }

            // Define Sphere In Fragment
            if (mesh.geometry.type === 'SPHERE') {

                this.gl.uniform3fv(this.program.spheres[sphereCount].geometry.position, [mesh.geometry.position.x, mesh.geometry.position.y, mesh.geometry.position.z]);
                this.gl.uniform1f(this.program.spheres[sphereCount].geometry.radius, mesh.geometry.radius);
                this.gl.uniform3fv(this.program.spheres[sphereCount].material.color, [mesh.material.color.r/255, mesh.material.color.g/255, mesh.material.color.b/255]);
                this.gl.uniform1f(this.program.spheres[sphereCount].material.ambient, mesh.material.ambient);
                this.gl.uniform1f(this.program.spheres[sphereCount].material.diffuse, mesh.material.diffuse);
                this.gl.uniform1f(this.program.spheres[sphereCount].material.specular, mesh.material.specular);
                this.gl.uniform1f(this.program.spheres[sphereCount].material.reflective, mesh.material.reflective);
                sphereCount ++;

            }

            // Define Light In Fragment
            if (mesh.geometry.type === 'LIGHT') {

                this.gl.uniform3fv(this.program.lights[lightCount].position, [mesh.geometry.position.x, mesh.geometry.position.y, mesh.geometry.position.z]);
                this.gl.uniform3fv(this.program.lights[lightCount].color, [mesh.geometry.color.r, mesh.geometry.color.g, mesh.geometry.color.b]);
                this.gl.uniform1f(this.program.lights[lightCount].intensity, mesh.geometry.intensity);
                lightCount ++;

            }

        }

        // Send Geometry Counts To Fragment
        this.gl.uniform1i(this.program.planeCount, planeCount);
        this.gl.uniform1i(this.program.circleCount, circleCount);
        this.gl.uniform1i(this.program.triangleCount, triangleCount);
        this.gl.uniform1i(this.program.sphereCount, sphereCount);
        this.gl.uniform1i(this.program.lightCount, lightCount);

        // Draw Shader
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertices.length / 2);

    }

};
RTJS.Scene = class {

    constructor () { this.meshes = {} }
    add (mesh) { this.meshes[mesh.id] = mesh }
    remove (mesh) { delete this.meshes[mesh.id] }

};
RTJS.Material = class {

    constructor (options = {}) {

        this.color = options.color || {r:255, g:255, b:255};
        this.ambient = options.ambient || 0.05;
        this.diffuse = options.diffuse || 1;
        this.specular = options.specular || 0.5;
        this.reflective = options.reflective || 0;

    }

}
RTJS.Camera = class {

    constructor (options = {}) {

        this.position = options.position || {x:0, y:0, z:0};
        this.rotation = options.rotation || {x:0, y:0, z:1};
        this.backgroundColor = options.backgroundColor || {r:0, g:0, b:0};
        this.fov = options.fov || 2;
        this.near = options.near || 0.05;
        this.far = options.far || 10000;
        this.type = 1;

    }

}
RTJS.PlaneGeometry = class {

    constructor (options = {}) {

        this.type = 'PLANE';
        this.position = options.position || {x:0, y:-1, z:0};
        this.normal = options.normal || {x:0, y:1, z:0};

    }

}
RTJS.CircleGeometry = class {

    constructor (options = {}) {

        this.type = 'CIRCLE';
        this.position = options.position || {x:0, y:0, z:0};
        this.normal = options.normal || {x:0, y:1, z:0};
        this.radius = options.radius || 1;

    }
    
}
RTJS.TriangleGeometry = class {

    constructor (options = {}) {

        this.type = 'TRIANGLE';
        this.vertices = options.vertices || [[0, 0, -5], [-5, 0, 5], [5, 0, 5]];

    }

}
RTJS.SphereGeometry = class {

    constructor (options = {}) {

        this.type = 'SPHERE';
        this.position = options.position || {x:0, y:0, z:0};
        this.radius = options.radius || 1;

    }

}
RTJS.Light = class {

    constructor (options = {}) {

        this.type = 'LIGHT';
        this.position = options.position || {x:0, y:0, z:0};
        this.color = options.color || {r:255, g:255, b:255};
        this.intensity = options.intensity || 0.025;

    }

}
RTJS.Mesh = class {

    constructor (geometry, material = new RTJS.Material()) {

        this.geometry = geometry;
        this.material = material;
        this.id = Math.random();

    }

}

RTJS.fragmentSource = `

// Constants
precision mediump float;
float EPSILON = 0.01;

struct Ray {

    vec3 origin;
    vec3 direction;

};

struct Material {

    vec3 color;
    float ambient;
    float diffuse;
    float specular;
    float reflective;

};

struct Camera {

    vec3 position;
    vec3 rotation;
    vec3 backgroundColor;
    float fov;
    float near;
    float far;
    int type;

};

struct Plane {

    vec3 position;
    vec3 normal;
    Material material;

};

struct Circle {

    vec3 position;
    vec3 normal;
    float radius;
    Material material;

};

struct Triangle {

    vec3 vertex1;
    vec3 vertex2;
    vec3 vertex3;
    Material material;

};

struct Sphere {

    vec3 position;
    float radius;
    Material material;

};

struct Light {

    vec3 position;
    vec3 color;
    float intensity;
    
};

vec3 rayPoint (Ray ray, float dist) {

    return vec3(ray.origin + ray.direction*dist);

}

float rayPlaneCollision (Ray ray, Plane plane) {

    float t = dot(plane.position - ray.origin, plane.normal) / dot(ray.direction, plane.normal);
    if (t < EPSILON) return -1.0;
    return t;

}

float rayCircleCollision (Ray ray, Circle circle) {

    float t = dot(circle.position - ray.origin, circle.normal) / dot(ray.direction, circle.normal);
    if (t < EPSILON) return -1.0;

    vec3 collisionPoint = rayPoint(ray, t);
    if (distance(collisionPoint, circle.position) > circle.radius) return -1.0;

    return t;

}

float rayTriangleCollision (Ray ray, Triangle triangle) {

    vec3 vertex0 = triangle.vertex1;
    vec3 vertex1 = triangle.vertex2;
    vec3 vertex2 = triangle.vertex3;
    
    vec3 edge1 = vertex1 - vertex0;
    vec3 edge2 = vertex2 - vertex0;
    vec3 h = cross(ray.direction, edge2);
    float a = dot(edge1, h);
    
    if(abs(a) < EPSILON) return -1.0;
    
    float f = 1.0/a;
    vec3 s = ray.origin - vertex0;
    float u = f * dot(s, h);
    
    vec3 q = cross(s, edge1);
    float v = f * dot(ray.direction, q);
    
    if((u < 0.0) || (u > 1.0) || (v < 0.0) || (u + v > 1.0)) return -1.0;
    
    float t = f * dot(edge2, q);
    if (t > EPSILON) return t;
    return -1.0;

}

float raySphereCollision (Ray ray, Sphere sphere) {

    vec3 directionToCenter = sphere.position - ray.origin;
    float angleFromCenter = dot(directionToCenter, ray.direction);
    float angleToCenter = dot(directionToCenter, directionToCenter);
    float discriminant = sqrt(pow(sphere.radius, 2.0) - angleToCenter + pow(angleFromCenter, 2.0));

    if (discriminant < -EPSILON) return -1.0;
    if (angleFromCenter - discriminant > EPSILON) return angleFromCenter - discriminant;
    if (angleFromCenter + discriminant > EPSILON) return angleFromCenter + discriminant;
    return -1.0;

}

vec3 planeNormal (Plane plane, vec3 direction) {

    vec3 normal = normalize(plane.normal);
    if (dot(normal, direction) <= 0.0) return normal * -1.0;
    return normal;

}

vec3 circleNormal (Circle circle, vec3 direction) {

    vec3 normal = normalize(circle.normal);
    if (dot(normal, direction) <= 0.0) return normal * -1.0;
    return normal;

}

vec3 triangleNormal (Triangle triangle, vec3 direction) {

    vec3 edge1 = triangle.vertex2 - triangle.vertex1;
    vec3 edge2 = triangle.vertex3 - triangle.vertex1;
    vec3 normal = cross(edge1, edge2);
    normal = normalize(normal);

    if (dot(normal, direction) <= 0.0) return normal * -1.0;
    return normal;

}

vec3 sphereNormal (Sphere sphere, vec3 point) {

    return vec3(normalize(point - sphere.position));

}

float scale (float n, float input_min, float input_max, float output_min, float output_max) {

    return (n - input_min) * (output_max - output_min) / (input_max - input_min) + output_min;

}

// Define Values From JS
uniform vec2 viewport;
uniform Camera camera;
uniform Plane planes[${RTJS.maxPlanes}];
uniform Circle circles[${RTJS.maxCircles}];
uniform Triangle triangles[${RTJS.maxTriangles}];
uniform Sphere spheres[${RTJS.maxSpheres}];
uniform Light lights[${RTJS.maxLights}];
uniform int planeCount;
uniform int circleCount;
uniform int triangleCount;
uniform int sphereCount;
uniform int lightCount;

bool clearScene (Ray ray, float dist) {

    float collision;

    // Ray Plane Collision
    for (int p = 0; p < ${RTJS.maxPlanes}; p ++) {

        if (p > planeCount) break;
        collision = rayPlaneCollision(ray, planes[p]);
        if (collision < dist && collision > 0.0) return false;

    }

    // Ray Circle Collision
    for (int c = 0; c < ${RTJS.maxCircles}; c ++) {

        if (c > circleCount) break;
        collision = rayCircleCollision(ray, circles[c]);
        if (collision < dist && collision > 0.0) return false;

    }

    // Ray Triangle Collision
    for (int t = 0; t < ${RTJS.maxTriangles}; t ++) {

        if (t > triangleCount) break;
        collision = rayTriangleCollision(ray, triangles[t]);
        if (collision < dist && collision > 0.0) return false;

    }

    // Ray Sphere Collision
    for (int s = 0; s < ${RTJS.maxSpheres}; s ++) {

        if (s > sphereCount) break;
        collision = raySphereCollision(ray, spheres[s]);
        if (collision < dist && collision > 0.0) return false;

    }
    return true;

}

vec3 getMaterial (Material material, Ray ray, float collisionDistance, vec3 surfaceNormal) {

    // Function Variables
    vec3 color = material.color * material.ambient;
    vec3 collisionPoint = rayPoint(ray, collisionDistance);
    vec3 reflectRay;
    vec3 diffuse;
    Light light;
    float lightDistance;
    float lightDecay;
    Ray shadowRay;

    // Check Every Light
    for (int l = 0; l < ${RTJS.maxLights}; l ++) {
        if (l > lightCount) break;

        // Check If Ray Is In Shadow
        light = lights[l];
        lightDistance = distance(collisionPoint, light.position);
        shadowRay = Ray(collisionPoint, normalize(light.position - collisionPoint));
        if (!clearScene(shadowRay, lightDistance)) continue;

        // Calculate Properties
        lightDecay = 1.0/pow(lightDistance, 2.0) * light.intensity;
        reflectRay = reflect(ray.direction, surfaceNormal); //Ray(collisionPoint, shadowRay.direction - surfaceNormal * 2.0 * dot(shadowRay.direction, surfaceNormal));
        diffuse = cross(surfaceNormal, shadowRay.direction);

        // Apply Properties
        color += vec3((light.color-material.color) * lightDecay * (1.0-max(0.0, dot(diffuse, diffuse))) * material.diffuse);
        color += vec3((light.color-material.color) * lightDecay * max(0.0, pow(abs(dot(ray.direction, reflectRay)), 32.0)) * material.specular);

    }

    // Return Color
    return color * (1.0-material.reflective);

}

vec3 trace (Ray ray) {

    // Function Variables
    vec3 finalColor = vec3(0, 0, 0);
    float reflectedDecay = 1.0;

    // Recursion Loop
    for (int b = 0; b < 5; b ++) {

        // Plane Collision Check
        float planeCollision = camera.far;
        Plane closestPlane;
        for (int p = 0; p < ${RTJS.maxPlanes}; p ++) {
            if (p > planeCount) break;

            float collision = rayPlaneCollision(ray, planes[p]);
            if (collision < planeCollision && collision > camera.near) {

                planeCollision = collision;
                closestPlane = planes[p];

            }

        }

        // Circle Collision Check
        float circleCollision = camera.far;
        Circle closestCircle;
        for (int c = 0; c < ${RTJS.maxCircles}; c ++) {
            if (c > circleCount) break;

            float collision = rayCircleCollision(ray, circles[c]);
            if (collision < circleCollision && collision > camera.near) {

                circleCollision = collision;
                closestCircle = circles[c];

            }

        }

        // Triangle Collision Check
        float triangleCollision = camera.far;
        Triangle closestTriangle;
        for (int t = 0; t < ${RTJS.maxTriangles}; t ++) {
            if (t > triangleCount) break;
            
            float collision = rayTriangleCollision(ray, triangles[t]);
            if (collision < triangleCollision && collision > camera.near) {

                triangleCollision = collision;
                closestTriangle = triangles[t];

            }

        }

        // Sphere Collision Check
        float sphereCollision = camera.far;
        Sphere closestSphere;
        for (int s = 0; s < ${RTJS.maxSpheres}; s ++) {
            if (s > sphereCount) break;

            float collision = raySphereCollision(ray, spheres[s]);
            if (collision < sphereCollision && collision > camera.near) {

                sphereCollision = collision;
                closestSphere = spheres[s];

            }

        }

        // Check If Ray Hit Anything
        if (planeCollision == camera.far && circleCollision == camera.far && triangleCollision == camera.far && sphereCollision == camera.far) {
            finalColor += camera.backgroundColor;
            continue;
        }

        // Material Variables
        vec3 surfaceNormal;
        float collisionDistance;
        Material material;
        vec3 color;

        // Get Color From Closest Object
        if (planeCollision <= circleCollision && planeCollision <= triangleCollision && planeCollision <= sphereCollision) {

            collisionDistance = planeCollision;
            surfaceNormal = planeNormal(closestPlane, ray.direction);
            material = closestPlane.material;

        }
        if (circleCollision < planeCollision && circleCollision < triangleCollision && circleCollision < sphereCollision) {

            collisionDistance = circleCollision;
            surfaceNormal = circleNormal(closestCircle, ray.direction);
            material = closestCircle.material;

        }
        if (triangleCollision < planeCollision && triangleCollision < circleCollision && triangleCollision < sphereCollision) {

            collisionDistance = triangleCollision;
            surfaceNormal = triangleNormal(closestTriangle, ray.direction);
            material = closestTriangle.material;

        }
        if (sphereCollision < planeCollision && sphereCollision < triangleCollision && sphereCollision < circleCollision) {

            collisionDistance = sphereCollision;
            surfaceNormal = sphereNormal(closestSphere, rayPoint(ray, sphereCollision));
            material = closestSphere.material;

        }

        // Add Color Contributions
        color = getMaterial(material, ray, collisionDistance, surfaceNormal);
        finalColor += color.xyz * reflectedDecay;
        if (material.reflective <= 0.0 || reflectedDecay < 0.05) break;

        // Calculate Reflectivity
        reflectedDecay *= material.reflective;
        ray.origin = rayPoint(ray, collisionDistance);
        ray.direction = reflect(ray.direction, surfaceNormal);

    }

    // Return Color
    return finalColor;

}

void main() {

    Ray ray;

    if (camera.type == 1) {

        // Create Y FOV From Viewport
        float ratio = viewport.x / viewport.y;
        float yFov = camera.fov / ratio;

        // Generate View Plane Rays
        Ray frontRay = Ray(camera.position, camera.rotation);
        Ray rightRay = Ray(camera.position, cross(-frontRay.direction, vec3(0, 1, 0)));
        Ray upRay = Ray(camera.position, cross(-rightRay.direction, frontRay.direction));

        // Calculate Point On View Plane
        vec3 point = rayPoint(frontRay, 1.0);
        rightRay.origin = point;
        point = rayPoint(rightRay, scale(gl_FragCoord.x, 0.0, viewport.x, -camera.fov/2.0, camera.fov/2.0));
        upRay.origin = point;
        point = rayPoint(upRay, scale(gl_FragCoord.y, 0.0, viewport.y, -yFov/2.0, yFov/2.0));

        // Create Ray Through Point
        ray = Ray(camera.position, normalize(point - camera.position));

    }

    // Return Ray Color
    gl_FragColor = vec4(trace(ray), 1);

}

`;

RTJS.vertexSource = `

// Constants
precision mediump float;
attribute vec2 position;

void main() {

    // Return Vertex Position
    gl_Position = vec4(position, 0.0, 1.0);

}

`;