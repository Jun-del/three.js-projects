import * as THREE from "three";

import Experience from "../experience";

export default class Environment {
  public experience: Experience;
  public scene: THREE.Scene;
  public sunLight: THREE.DirectionalLight;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSunlight();
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight(0xffffff, 5);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(5, 5, 10);
    this.scene.add(this.sunLight);
  }

  resize() {}

  update() {}
}
