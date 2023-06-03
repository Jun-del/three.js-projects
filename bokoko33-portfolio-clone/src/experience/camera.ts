import * as THREE from "three";

import Sizes from "./utils/sizes";

import Experience from "./experience";

export default class Camera {
  public experience: Experience;
  public sizes: Sizes;
  public scene: THREE.Scene;
  public canvas: HTMLCanvasElement;
  public frustum: number;
  public perspectiveCamera: THREE.PerspectiveCamera;
  public OrthographicCamera: THREE.OrthographicCamera;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
  }

  private createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspectRatio,
      0.1,
      1000
    );

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
  }

  // Update camera on resize
  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspectRatio;

    this.OrthographicCamera.left = (-this.sizes.aspectRatio * this.frustum) / 2;
    this.OrthographicCamera.right = (this.sizes.aspectRatio * this.frustum) / 2;
    this.OrthographicCamera.top = this.frustum / 2;
    this.OrthographicCamera.bottom = -this.frustum / 2 - 100;

    this.perspectiveCamera.updateProjectionMatrix();
    this.OrthographicCamera.updateProjectionMatrix();
  }

  update() {}
}
