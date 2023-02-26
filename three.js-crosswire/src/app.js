import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Camera debug
// const cameraFolder = gui.addFolder("Camera");
// cameraFolder.add(camera.position, "x").min(-100).max(100).step(1);
// cameraFolder.add(camera.position, "y").min(-100).max(100).step(1);
// cameraFolder.add(camera.position, "z").min(-100).max(100).step(1);
// cameraFolder.open();
const settings = {
  progress: 0,
};
gui.add(settings, "progress").min(0).max(1).step(0.01);

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */

/**
 * Models
 */
let Object3D = new THREE.Object3D();

// Loaders
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Objects
 */
// Objects
// const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

// const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
// plane.rotation.x = -Math.PI * 0.5;
// plane.position.y = -0.65;

// scene.add(cube, plane);

let shaderMaterial;

addObject();
async function addObject() {
  shaderMaterial = new THREE.ShaderMaterial({
    extensions: {
      derivatives: "#extension GL_OES_standard_derivatives : enable",
    },
    side: THREE.DoubleSide,
    uniforms: {
      time: { value: 0 },
      uMatcap: { value: new THREE.TextureLoader().load("/textures/sec3.png") },
      uScan: { value: new THREE.TextureLoader().load("/textures/scan.png") },
      resolution: { value: new THREE.Vector4() },
    },
    vertexShader: vertex,
    fragmentShader: fragment,
  });

  const squareModel = await gltfLoader.loadAsync("/models/ob1.glb");
  const sectorModel = await gltfLoader.loadAsync("/models/ob2.glb");
  const arcModel = await gltfLoader.loadAsync("/models/ob3.glb");

  const squareGeometry = squareModel.scene.children[0].geometry;
  const sectorGeometry = sectorModel.scene.children[0].geometry;
  const arcGeometry = arcModel.scene.children[0].geometry;

  // Material
  const mat = new THREE.MeshMatcapMaterial({
    matcap: new THREE.TextureLoader().load("/textures/sec2.png"),
  });

  const ROW = 50;
  const COL = 50;
  const GRID = ROW * COL;

  let random = new Float32Array(GRID);

  const instancedSquare = new THREE.InstancedMesh(squareGeometry, shaderMaterial, GRID);
  scene.add(instancedSquare);

  let index = 0;
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      // let x = (i / ROW) * 2 - 1;
      // let y = (j / COL) * 2 - 1;

      random[index] = Math.random();

      // Object3D.position.set(i - ROW / 2, -10 + Math.random(), j - COL / 2);
      Object3D.position.set(i - ROW / 2, -10, j - COL / 2);
      Object3D.updateMatrix();
      instancedSquare.setMatrixAt(index++, Object3D.matrix);
      // instancedSquare.setMatrixAt(i * ROW + j, Object3D.matrix);
    }
  }

  instancedSquare.instanceMatrix.needsUpdate = true;
  instancedSquare.geometry.setAttribute("aRandom", new THREE.InstancedBufferAttribute(random, 1));
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  aspectRatio: window.innerWidth / window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  // camera.aspect = sizes.width / sizes.height;
  // camera.updateProjectionMatrix();

  // Update orthographic camera
  orthoCamera.aspect = sizes.width / sizes.height;
  orthoCamera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

let time = 0;

/**
 * Camera
 */
// Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// camera.position.set(0, 1, 5);
// scene.add(camera);

// Orthographic Camera
const frustumSize = 4;
const orthoCamera = new THREE.OrthographicCamera(
  (frustumSize * sizes.aspectRatio) / -2,
  (frustumSize * sizes.aspectRatio) / 2,
  frustumSize / 2,
  frustumSize / -2,
  -1000,
  1000
);
orthoCamera.position.set(8, 12, 16);
// orthoCamera.position.set(0, 10, 0);
// orthoCamera.lookAt(0, 0, 0);
scene.add(orthoCamera);

// Controls
// const controls = new OrbitControls(camera, canvas);
const controls = new OrbitControls(orthoCamera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0xeeeeee, 1);
renderer.useLegacyLights = false;
renderer.outputEncoding = THREE.sRGBEncoding;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  //   cube.rotation.y = 0.1 * elapsedTime;
  //   cube.rotation.x = 0.15 * elapsedTime;

  // Update material uniforms
  shaderMaterial.uniforms.time.value = elapsedTime * 0.7;

  // Update controls
  controls.update();

  // Render
  // renderer.render(scene, camera);
  renderer.render(scene, orthoCamera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
