import * as THREE from "three";

import Experience from "../experience";
import Camera from "../camera";
import Room from "./room";
import Environment from "./environment";

import Resources from "../utils/resources";
import Sizes from "../utils/sizes";

export default class World {
  public experience: Experience;
  public sizes: Sizes;
  public resources: Resources;
  public scene: THREE.Scene;
  public canvas: HTMLCanvasElement;
  public camera: Camera;
  public environment!: Environment;
  public room!: Room;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.room = new Room();
    });
  }

  resize() {}

  update() {}
}
