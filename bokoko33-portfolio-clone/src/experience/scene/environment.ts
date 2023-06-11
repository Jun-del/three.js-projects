import * as THREE from "three";

import Experience from "../experience";
import * as dat from "lil-gui";

export default class Environment {
  public experience: Experience;
  public scene: Experience["scene"];
  public sunLight!: THREE.DirectionalLight;
  public ambientLight!: THREE.AmbientLight;
  public resources: Experience["resources"];

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSunlight();
  }

  setSunlight() {
    // this.sunLight = new THREE.DirectionalLight(0xffffff, 5);
    this.sunLight = new THREE.DirectionalLight(0xfdfbd3, 5);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;

    this.sunLight.position.set(-1.5, 7, 3);

    // this.sunLight.position.set(-5.78, 5.28, -7.01);
    // this.sunLight.rotation.set(0, -2.34, 0);

    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(this.ambientLight);

    // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(helper);

    // const directionalLightHelper = new THREE.DirectionalLightHelper(
    //   this.sunLight,
    //   5
    // );
    // this.scene.add(directionalLightHelper);

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

    // Rotation
    lightFolder
      .add(this.sunLight.rotation, "x", -10, 10, 0.01)
      .name("sunlightRotationX");
    lightFolder
      .add(this.sunLight.rotation, "y", -10, 10, 0.01)
      .name("sunlightRotationY");
    lightFolder
      .add(this.sunLight.rotation, "z", -10, 10, 0.01)
      .name("sunlightRotationZ");

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

    lightFolder.open(false);
    ambientFolder.open(false);
  }
  // lightFolder.add(this.ambientLight, "intensity", 0, 1, 0.01);

  resize() {}

  update() {}
}
