import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Sizes from "./utils/sizes";

import Experience from "./experience";

export default class Camera {
  public experience: Experience;
  public sizes: Sizes;
  public scene: THREE.Scene;
  public canvas: HTMLCanvasElement;
  public frustum!: number;
  public perspectiveCamera!: THREE.PerspectiveCamera;
  public OrthographicCamera!: THREE.OrthographicCamera;
  public controls: OrbitControls;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();

    this.setOrbitControls();
  }

  private createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspectRatio,
      0.1,
      1000
    );
    this.perspectiveCamera.position.z = 5;

    this.scene.add(this.perspectiveCamera);
  }

  private createOrthographicCamera() {
    this.frustum = 5;
    this.OrthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspectRatio * this.frustum) / 2,
      (this.sizes.aspectRatio * this.frustum) / 2,
      this.frustum / 2,
      -this.frustum / 2 - 100,
      100
    );

    this.scene.add(this.OrthographicCamera);

    // * Grid Helper
    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
  }

  // Update camera on resize
  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspectRatio;
    this.perspectiveCamera.updateProjectionMatrix();

    this.OrthographicCamera.left = (-this.sizes.aspectRatio * this.frustum) / 2;
    this.OrthographicCamera.right = (this.sizes.aspectRatio * this.frustum) / 2;
    this.OrthographicCamera.top = this.frustum / 2;
    this.OrthographicCamera.bottom = -this.frustum / 2 - 100;
    this.OrthographicCamera.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
