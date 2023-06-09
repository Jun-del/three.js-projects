import * as THREE from "three";

import Experience from "../experience";

export default class Controls {
  public experience: Experience;
  public scene: Experience["scene"];
  public resources: Experience["resources"];
  public time: Experience["time"];
  public camera: Experience["camera"];
  public curve!: THREE.CatmullRomCurve3;
  public dummyCurve!: THREE.Vector3;
  public progress: number;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;

    this.progress = 0;
    this.dummyCurve = new THREE.Vector3(0, 0, 0);

    this.setPath();
    this.onWheel();
  }

  setPath() {
    //Create a closed wavey loop
    this.curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-10, 0, 10),
        new THREE.Vector3(-5, 5, 5),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(5, -5, 5),
        new THREE.Vector3(10, 0, 10),
      ],
      true
    );

    const points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Create the final object to add to the scene
    const curveObject = new THREE.Line(geometry, material);
    this.scene.add(curveObject);
  }

  onWheel() {
    window.addEventListener("wheel", (event) => {
      if (event.deltaY > 0) {
        this.progress += 0.1;
      } else {
        this.progress -= 0.1;
        if (this.progress < 0) {
          this.progress = 1;
        }
      }
    });
  }

  resize() {}

  update() {
    this.curve.getPointAt(this.progress % 1, this.dummyCurve);
    // this.progress += 0.001;
    // this.progress -= 0.01;
    if (this.progress < 0) {
      this.progress = 1;
    }
    this.camera.orthographicCamera.position.copy(this.dummyCurve);
  }
}
