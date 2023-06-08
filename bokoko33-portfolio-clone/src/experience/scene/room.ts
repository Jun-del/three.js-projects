import * as THREE from "three";

import Experience from "../experience";
import Resources from "../utils/resources";
import { AssetItem } from "../../types";

export default class Room {
  public experience: Experience;
  public scene: THREE.Scene;
  public resources: Resources;
  public room: AssetItem;
  public roomScene: THREE.Object3D;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.roomScene = this.room.scene as THREE.Object3D;

    this.setModel();
  }

  setModel() {
    // this.roomScene.children.forEach((child: THREE.Object3D) => {
    //   child.castShadow = true;
    //   child.receiveShadow = true;

    //   if (child instanceof THREE.Group) {
    //     child.children.forEach((groupChild: THREE.Object3D) => {
    //       groupChild.castShadow = true;
    //       groupChild.receiveShadow = true;
    //     });
    //   }
    // });

    this.roomScene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.name === "ShelfBox-Small" || child.name === "ShelfBox-Big") {
          (child as THREE.Mesh).material = new THREE.MeshPhysicalMaterial();
          child.material.roughness = 0;
          child.material.color.set(0xc2cee6);
          child.material.ior = 3;
          child.material.transmission = 1;
          child.material.opacity = 1;
        }
      }

      if (child.name === "MonitorScreen") {
        (child as THREE.Mesh).material = new THREE.MeshBasicMaterial({
          map: this.resources.items.monitorScreen,
        });
      }

      if (child.name === "LaptopScreen") {
        (child as THREE.Mesh).material = new THREE.MeshBasicMaterial({
          map: this.resources.items.laptopScreen,
        });
      }
    });

    this.scene.add(this.roomScene);
    this.roomScene.scale.set(0.1, 0.1, 0.1);
  }

  resize() {}

  update() {}
}
