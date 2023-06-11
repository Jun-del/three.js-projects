import * as THREE from "three";

import Experience from "../experience";

export default class Controls {
  public experience: Experience;
  public scene: Experience["scene"];
  public resources: Experience["resources"];
  public time: Experience["time"];
  public camera: Experience["camera"];
  public curve!: THREE.CatmullRomCurve3;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
  }

  resize() {}

  update() {}
}
