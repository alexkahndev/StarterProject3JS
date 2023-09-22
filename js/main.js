//Imports

import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Global Variables

let renderer, scene, gui, camera, orbitalControls;
let mouse = new THREE.Vector2();

const raycaster = new THREE.Raycaster();
const clock = new THREE.Clock();
const stats = new Stats();

document.body.appendChild(stats.dom);

const api = {
  
};

// Initialize

function init() {
  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // scene
  scene = new THREE.Scene();

  // skybox
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  const cubeTexture = cubeTextureLoader.load([
      './resources/skybox/sky-right.jpg',
      './resources/skybox/sky-left.jpg',
      './resources/skybox/sky-top.jpg',
      './resources/skybox/sky-bottom.jpg',
      './resources/skybox/sky-front.jpg',
      './resources/skybox/sky-back.jpg'
    ]);
    scene.background = cubeTexture;

  // camera
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  );
  camera.position.set(0, 0, 75);
  camera.rotation.order = "YXZ";

  // orbital controls
  orbitalControls = new OrbitControls(camera, renderer.domElement);
  orbitalControls.enablePan = false;

  // light
  const light = new THREE.PointLight(0xffffff, 0.9, 0, 100000);
  light.position.set(0, 50, 120);
  light.castShadow = true;
  light.shadow.mapSize.width = 512; // default
  light.shadow.mapSize.height = 512; // default
  light.shadow.camera.near = 0.5; // default
  light.shadow.camera.far = 5000; // default

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.castShadow = true;
  directionalLight.position.set(-5, 20, 4);
  directionalLight.target.position.set(9, 0, -9);
  directionalLight.shadow.camera.left *= 9;
  directionalLight.shadow.camera.right *= 9;
  directionalLight.shadow.camera.top *= 9;
  directionalLight.shadow.camera.bottom *= 9;

  scene.add(light);
  scene.add(directionalLight);

  // objects
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // gui
  createGUI();

  // event listeners
  window.addEventListener("resize", onWindowResize);
  window.addEventListener("mousedown", mouseDown, false);
  window.addEventListener("mousemove", mouseMove, false);
  window.addEventListener("keydown", onDocumentKeyDown, false);
  window.addEventListener("keyup", onDocumentKeyUp, false);
}

// GUI

function createGUI() {
  gui = new GUI();
}

// Mouse and Window Events

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function mouseMove(event) {
  event.preventDefault();
}

function mouseDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
}

// Key Press Functions

function onDocumentKeyDown(event) {
  if (event.keyCode == 87) {
    // Keycode for 'W'
  }
  if (event.keyCode == 83) {
    // Keycode for 'S'
  }
  if (event.keyCode == 65) {
    // Keycode for 'A'
  }
  if (event.keyCode == 68) {
    // Keycode for 'D'
  }
  if (event.keyCode == 32) {
    // Keycode for Spacebar
  }
  if (event.keyCode == 16) {
    // Keycode for Shift
  }
  if (event.keyCode == 187) {
    // Keycode for '+'
  }
  if (event.keyCode == 189) {
    // Keycode for '-'
  }
}

function onDocumentKeyUp(event) {}

// Animation Functions

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
}

// Main Functions (starts the render loop)

init();
animate();
