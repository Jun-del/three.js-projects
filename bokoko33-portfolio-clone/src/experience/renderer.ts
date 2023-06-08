import * as THREE from "three";

import Experience from "./experience";
import Sizes from "./utils/sizes";
import Camera from "./camera";

export default class Renderer {
  public experience: Experience;
  public sizes: Sizes;
  public scene: THREE.Scene;
  public canvas: HTMLCanvasElement;
  public renderer!: THREE.WebGLRenderer;
  public camera: Camera;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;

    this.setRenderer();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.renderer.useLegacyLights = false;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    // TODO: ToneMappingExposure value
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.renderer.render(this.scene, this.camera.perspectiveCamera);
  }
}
