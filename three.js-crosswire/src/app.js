import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { SSRPass } from "three/examples/jsm/postprocessing/SSRPass.js";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
// import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Models
 */
let Object3D = new THREE.Object3D();

// Loaders
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const textureLoader = new THREE.TextureLoader();

// Material
let shaderMaterial = new THREE.ShaderMaterial({
  extensions: {
    derivatives: "#extension GL_OES_standard_derivatives : enable",
  },
  side: THREE.DoubleSide,
  uniforms: {
    time: { value: 0 },
    uMatcap: { value: textureLoader.load("/textures/sec3.png") },
    uScan: { value: textureLoader.load("/textures/scan.png") },
    resolution: { value: new THREE.Vector4() },
  },
  vertexShader: vertex,
  fragmentShader: fragment,
});

/**
 * Objects
 */
addObject();
async function addObject() {
  const squareModel = await gltfLoader.loadAsync("/models/ob1.glb");
  // const sectorModel = await gltfLoader.loadAsync("/models/ob2.glb");
  // const arcModel = await gltfLoader.loadAsync("/models/ob3.glb");

  const squareGeometry = squareModel.scene.children[0].geometry;
  // const sectorGeometry = sectorModel.scene.children[0].geometry;
  // const arcGeometry = arcModel.scene.children[0].geometry;

  const ROW = 25;
  const COL = 25;
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

      Object3D.position.set(i - ROW / 2, -10 + Math.random(), j - COL / 2);
      // Object3D.position.set(i - ROW / 2, -10, j - COL / 2);
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
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  composer.setSize(sizes.width, sizes.height);

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 1, 100);
// camera.position.set(0, 1, 5);
camera.position.set(8, 12, 16);

// Orthographic Camera
const frustumSize = 4;
// const camera = new THREE.OrthographicCamera(
//   (frustumSize * sizes.aspectRatio) / -2,
//   (frustumSize * sizes.aspectRatio) / 2,
//   frustumSize / 2,
//   frustumSize / -2,
//   -1000,
//   1000
// );
camera.position.set(8, 12, 16);
// camera.position.set(0, 10, 0);
// camera.lookAt(0, 0, 0);
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
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.setClearColor(0xeeeeee, 1);
renderer.useLegacyLights = false;
renderer.outputEncoding = THREE.sRGBEncoding;

/**
 * SSR
 */
const composer = new EffectComposer(renderer);
const ssrPass = new SSRPass({
  renderer,
  scene,
  camera,
  width: sizes.width,
  height: sizes.height,
  groundReflector: null,
  selects: null,
});

composer.addPass(ssrPass);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update material uniforms
  shaderMaterial.uniforms.time.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  // renderer.render(scene, camera);

  composer.render();

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// Debug
// const cameraFolder = gui.addFolder("Camera");
// cameraFolder.add(camera.position, "x").min(-30).max(30).step(1);
// cameraFolder.add(camera.position, "y").min(-30).max(30).step(1);
// cameraFolder.add(camera.position, "z").min(-30).max(30).step(1);
// cameraFolder.open();
// const settings = {
//   progress: 0,
// };
// gui.add(settings, "progress").min(0).max(1).step(0.01);
