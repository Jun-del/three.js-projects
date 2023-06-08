import * as THREE from "three";

import Experience from "../experience";
import Resources from "../utils/resources";
import * as dat from "lil-gui";

export default class Environment {
  public experience: Experience;
  public scene: THREE.Scene;
  public sunLight!: THREE.DirectionalLight;
  public ambientLight!: THREE.AmbientLight;
  public resources: Resources;

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

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(this.ambientLight);

    const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    this.scene.add(helper);

    /**
     * GUI
     */
    // Sunlight
    const gui = new dat.GUI();
    const lightFolder = gui.addFolder("Sun Light");
    lightFolder
      .add(this.sunLight.position, "x", -10, 10, 0.01)
      .name("sunlightX");
    lightFolder
      .add(this.sunLight.position, "y", -10, 10, 0.01)
      .name("sunlightY");
    lightFolder
      .add(this.sunLight.position, "z", -10, 10, 0.01)
      .name("sunlightZ");
    lightFolder
      .add(this.sunLight, "intensity", 0, 10, 0.01)
      .name("sunlight-intensity");
    lightFolder.addColor(this.sunLight, "color").name("sunlight-color");

    // Ambient
    const ambientFolder = gui.addFolder("Ambient Light");
    ambientFolder
      .add(this.ambientLight, "intensity", 0, 1, 0.01)
      .name("ambient-intensity");
    ambientFolder.addColor(this.ambientLight, "color").name("ambient-color");

    lightFolder.open();
    ambientFolder.open();
  }
  // lightFolder.add(this.ambientLight, "intensity", 0, 1, 0.01);

  resize() {}

  update() {}
}
