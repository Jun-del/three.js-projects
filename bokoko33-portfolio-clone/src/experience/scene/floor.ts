import * as THREE from "three";

import Experience from "../experience";

export default class Floor {
  public experience: Experience;
  public scene: Experience["scene"];
  public floorGeometry!: THREE.PlaneGeometry;
  public floorMaterial!: THREE.MeshStandardMaterial;
  public floor!: THREE.Mesh;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
  }

  setFloor() {
    this.floorGeometry = new THREE.PlaneGeometry(100, 100);
    this.floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
    });
    this.floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial);
    this.floor.rotation.x = Math.PI * 0.5;
    this.floor.position.y = -0.5;

    // TODO: Shadow

    this.floor.receiveShadow = true;

    this.scene.add(this.floor);
  }

  resize() {}

  update() {}
}
