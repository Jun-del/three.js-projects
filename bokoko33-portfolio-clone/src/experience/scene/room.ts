import * as THREE from "three";

import Experience from "../experience";

export default class Room {
  public experience: Experience;
  public scene: THREE.Scene;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.roomScene = this.room.scene;

    this.setModel();
  }

  setModel() {
    this.scene.add(this.roomScene);
    this.roomScene.scale.set(0.1, 0.1, 0.1);
    this.roomScene.rotation.y = Math.PI;
  }

  resize() {}

  update() {}
}
