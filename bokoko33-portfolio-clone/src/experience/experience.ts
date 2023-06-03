import * as THREE from "three";

import Assets from "./utils/assets";
import Sizes from "./utils/sizes";
import Time from "./utils/time";
import Resources from "./utils/resources";

import Camera from "./camera";
import Renderer from "./renderer";
import World from "./scene/world";

export default class Experience {
  // private static _instance: Experience;
  public static _instance: Experience;

  // TODO: optional
  public sizes: Sizes;
  public scene: THREE.Scene;
  public camera: Camera;
  public renderer: Renderer;
  public time: Time;
  public world: World;
  public resources: Resources;

  constructor(public canvas: HTMLCanvasElement) {
    if (Experience._instance) {
      return Experience._instance;
    }

    Experience._instance = this;

    // Utils
    this.sizes = new Sizes();
    this.time = new Time();

    // Scene
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(Assets);
    this.world = new World();

    this.time.on("update", () => {
      this.update();
    });

    this.sizes.on("resize", () => {
      this.resize();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }
}

// /**
//  * Fullscreen
//  */
// window.addEventListener("dblclick", () => {
//   const fullscreenElement = document.fullscreenElement;

//   if (!fullscreenElement) {
//     if (canvas.requestFullscreen) {
//       canvas.requestFullscreen();
//     }
//   } else {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     }
//   }
// });
