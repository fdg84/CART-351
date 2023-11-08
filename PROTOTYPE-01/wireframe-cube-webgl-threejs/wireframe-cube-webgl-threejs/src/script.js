//fields
var width;
var height;
var scene;
var camera;
var renderer;
var cube;
var xRot, yRot, zRot, triangles; // sliders 

function init() {
  xRot = yRot = zRot = 0.001;
  triangles = 20;
  //Set width 
  width = window.innerWidth;
  //set Height
  height = window.innerHeight;
  //Create Scene
  scene = new THREE.Scene();
  //Create Camera
  camera = new THREE.PerspectiveCamera(60, width / height, 1, 3000);
  camera.position.z = 1000;
  //Create Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  //Add Renderer to webpage
  document.body.appendChild(renderer.domElement);
};

function createCube() {
  //Create Cube by passing to it the geometry w,h,d, number of polygons making up the face 
  cube = new THREE.Mesh(new THREE.BoxGeometry(700, 700, 700, triangles,triangles,triangles), new THREE.MeshBasicMaterial({
    color: 0x0099ff, //The color chosen for the mesh 
    wireframe: true //Shade in or wireframe?
  }));
  scene.add(cube); //Add to scene
};

function updateCube()
{
  scene.remove(cube);
  oldRotationX = cube.rotation.x;
  oldRotationY = cube.rotation.y;
  oldRotationZ = cube.rotation.z;
  createCube();
  cube.rotation.x = oldRotationX;
  cube.rotation.y = oldRotationY;
  cube.rotation.z = oldRotationZ;
}

function update() {
  requestAnimationFrame(update);
  cube.rotation.x += xRot;
  cube.rotation.y += yRot;
  cube.rotation.z += zRot;
  renderer.render(scene, camera);
}

$('input[name=xRot]').on('input', function() {
  xRot = parseFloat(this.value);
});

$('input[name=yRot]').on('input', function() {
  yRot = parseFloat(this.value);
});

$('input[name=zRot]').on('input', function() {
  zRot = parseFloat(this.value);
});

$('input[name=triangles]').on('input', function() {
  triangles = parseInt(this.value);
  updateCube();
});

$('input[name=zCam]').on('input', function() {
  camera.position.z = 2500-parseInt(this.value);
});

$(function() {
  init();
  createCube();
  update();
});