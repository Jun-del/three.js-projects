import * as THREE from "three";

import Sizes from "./utils/sizes";

import Camera from "./camera";
import Renderer from "./renderer";

export default class Experience {
  // private static _instance: Experience;
  public static _instance: Experience;

  // TODO: optional
  public sizes: Sizes;
  public scene: THREE.Scene;
  public camera: Camera;
  public renderer: Renderer;

  constructor(public canvas: HTMLCanvasElement) {
    if (Experience._instance) {
      return Experience._instance;
    }

    Experience._instance = this;

    // Utils
    this.sizes = new Sizes();

    // Scene
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
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
