import * as THREE from "three";
import GSAP from "gsap";
import * as dat from "lil-gui";

import Experience from "../experience";
import { Themes } from "../../types";

export default class Environment {
	public experience: Experience;
	public scene: Experience["scene"];
	public sunLight!: THREE.DirectionalLight;
	public ambientLight!: THREE.AmbientLight;
	public resources: Experience["resources"];
	public GUI: dat.GUI;
	public obj: {
		colorObj: {
			r: number;
			g: number;
			b: number;
		};
		intensity: number;
	};

	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;

		// * GUI below title
		// this.GUI = new dat.GUI({
		// 	container: document.querySelector(".hero-main") as HTMLElement,
		// });

		this.obj = {
			colorObj: {
				r: 0,
				g: 0,
				b: 0,
			},
			intensity: 3,
		};

		this.setSunlight();
		// this.setGUI();
	}

	setSunlight() {
		// this.sunLight = new THREE.DirectionalLight(0xffffff, 5);
		this.sunLight = new THREE.DirectionalLight(0xfdfbd3, 3);
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

		/**
		 * Light Helper
		 */
		// const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
		// this.scene.add(helper);

		// const directionalLightHelper = new THREE.DirectionalLightHelper(
		//   this.sunLight,
		//   5
		// );
		// this.scene.add(directionalLightHelper);
	}

	switchTheme(theme: Themes) {
		if (theme === "dark") {
			GSAP.to(this.sunLight.color, {
				r: 0.16862745098039217,
				g: 0.21568627450980393,
				b: 0.45098039215686275,
			});

			GSAP.to(this.ambientLight.color, {
				r: 0.16862745098039217,
				g: 0.21568627450980393,
				b: 0.45098039215686275,
			});
			GSAP.to(this.sunLight, {
				intensity: 0.78,
			});
			GSAP.to(this.ambientLight, {
				intensity: 0.78,
			});
		} else {
			GSAP.to(this.sunLight.color, {
				r: 255 / 255,
				g: 255 / 255,
				b: 255 / 255,
			});

			GSAP.to(this.ambientLight.color, {
				r: 255 / 255,
				g: 255 / 255,
				b: 255 / 255,
			});
			GSAP.to(this.sunLight, {
				intensity: 3,
			});
			GSAP.to(this.ambientLight, {
				intensity: 0.8,
			});
		}
	}

	setGUI() {
		this.GUI.addColor(this.obj, "colorObj")
			.name("colorObj")
			.onChange(() => {
				this.sunLight.color.copy(this.obj.colorObj);
				this.ambientLight.color.copy(this.obj.colorObj);
				console.log(this.sunLight.color);
			});
		this.GUI.add(this.obj, "intensity", 0, 10, 0.01).onChange(() => {
			this.sunLight.intensity = this.obj.intensity;
			this.ambientLight.intensity = this.obj.intensity;
		});

		const lightFolder = this.GUI.addFolder("Sun Light");
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
		const ambientFolder = this.GUI.addFolder("Ambient Light");
		ambientFolder
			.add(this.ambientLight, "intensity", 0, 1, 0.01)
			.name("ambient-intensity");
		ambientFolder.addColor(this.ambientLight, "color").name("ambient-color");

		lightFolder.open(false);
		ambientFolder.open(false);
	}

	resize() {}

	update() {}
}
