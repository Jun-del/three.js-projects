import * as THREE from "three";

import Assets from "./utils/assets";
import Sizes from "./utils/sizes";
import Time from "./utils/time";
import Resources from "./utils/resources";

import Camera from "./camera";
import Renderer from "./renderer";
import Preloader from "./preloader";
import Theme from "./theme";

import World from "./scene/world";
import Controls from "./scene/controls";
export default class Experience {
	public static _instance: Experience;

	public sizes!: Sizes;
	public scene!: THREE.Scene;
	public camera!: Camera;
	public renderer!: Renderer;
	public time!: Time;
	public theme!: Theme;
	public world!: World;
	public resources!: Resources;
	public preloader!: Preloader;
	public controls!: Controls;

	constructor(public canvas?: HTMLCanvasElement) {
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
		this.theme = new Theme();
		this.world = new World();
		this.preloader = new Preloader();

		this.preloader.on("enablecontrols", () => {
			this.controls = new Controls();
		});

		this.sizes.on("resize", () => {
			this.resize();
		});

		this.time.on("update", () => {
			this.update();
		});
	}

	resize() {
		this.camera.resize();
		this.world.resize();
		this.renderer.resize();
	}

	update() {
		this.preloader.update();
		this.camera.update();
		this.world.update();
		this.renderer.update();
		if (this.controls) {
			this.controls.update();
		}
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
