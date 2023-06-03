import * as THREE from "three";

import Experience from "./experience";

export default class Renderer {
  public experience: Experience;
  public sizes: Sizes;
  public scene: THREE.Scene;
  public canvas: HTMLCanvasElement;
  public renderer: THREE.WebGLRenderer;

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
    // /**
    //  * Animate
    //  */
    // function animate() {
    //   requestAnimationFrame(animate);
    //   renderer.render(scene, camera);
    // }
    // animate();

    this.renderer.render(this.scene, this.camera.perspectiveCamera);
  }
}
