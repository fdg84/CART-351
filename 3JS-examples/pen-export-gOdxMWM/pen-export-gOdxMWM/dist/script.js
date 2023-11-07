// https://discourse.threejs.org/t/rotation-to-xyz-coordinates/48729/13
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

console.clear();

let randSpread = function(val){return Math.round((Math.random() - 0.5) * val);};
let rand = function(val){return Math.random() * val};

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x18222A);
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 100);
camera.position.set(0, 5, 10).setLength(15);
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", function(event){
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
})

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(3, 5, 8);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

let radius = 5;
let mainSphere = new THREE.Mesh(new THREE.SphereGeometry(5), new THREE.MeshBasicMaterial({color: "black", wireframe: true}));
scene.add(mainSphere);
let dir = new THREE.Vector3();
let sphere = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshLambertMaterial({color: "blue"}));
let pin = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.5).translate(0, -0.3, 0).rotateX(Math.PI * 0.5), new THREE.MeshLambertMaterial({color: "white"}));
[
  [0, 0],
  [0, 45],
  [45, 0],
  [45, 45]
].forEach(p => {
  let newSphere = sphere.clone()
  newSphere.position.setFromSphericalCoords(radius, THREE.MathUtils.degToRad(90 - p[0]), THREE.MathUtils.degToRad(p[1]));
  let newPin = pin.clone();
  newSphere.add(newPin);
  newSphere.updateMatrixWorld();
  newPin.lookAt(0, 0, 0);
  mainSphere.add(newSphere);
})


let clock = new THREE.Clock();

renderer.setAnimationLoop(function(){
  let t = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
})