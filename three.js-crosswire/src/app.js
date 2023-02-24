import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */

/**
 * Objects
 */
// Material
const material = new THREE.MeshNormalMaterial();

// Objects
// const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

// const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
// plane.rotation.x = -Math.PI * 0.5;
// plane.position.y = -0.65;

// scene.add(cube, plane);

/**
 * Models
 */

let Object3D = new THREE.Object3D();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

async function loadModel() {
  const squareModel = await gltfLoader.loadAsync("/models/ob1.glb");
  const sectorModel = await gltfLoader.loadAsync("/models/ob2.glb");
  const arcModel = await gltfLoader.loadAsync("/models/ob3.glb");

  const squareGeometry = squareModel.scene.children[0].geometry;
  const sectorGeometry = sectorModel.scene.children[0].geometry;
  const arcGeometry = arcModel.scene.children[0].geometry;

  const ROW = 10;
  const COL = 10;
  const count = ROW * COL;

  const instancedSquare = new THREE.InstancedMesh(squareGeometry, material, count);

  scene.add(instancedSquare);

  let index = 0;
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      let x = (i / ROW) * 2 - 1;
      let y = (j / COL) * 2 - 1;

      Object3D.position.set(i - ROW / 2, 0, j - COL / 2);
      Object3D.updateMatrix();
      instancedSquare.setMatrixAt(index++, Object3D.matrix);
      //   instancedSquare.setMatrixAt(i * ROW + j, Object3D.matrix);
    }
  }

  instancedSquare.instanceMatrix.needsUpdate = true;
}
loadModel();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 1, 5);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  //   cube.rotation.y = 0.1 * elapsedTime;
  //   cube.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
