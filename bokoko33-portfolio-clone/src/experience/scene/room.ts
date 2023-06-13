import * as THREE from "three";
import GSAP from "gsap";

import Experience from "../experience";
import { AssetItem, Themes } from "../../types";

export default class Room {
	public experience: Experience;
	public scene: Experience["scene"];
	public resources: Experience["resources"];
	public room: AssetItem;
	public roomScene: THREE.Object3D;
	public lerp: {
		current: number;
		target: number;
		ease: number;
	};
	public rotation!: number;
	public pointLight!: THREE.PointLight;
	public sphereSize!: number;
	public pointLightHelper!: THREE.PointLightHelper;

	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.room = this.resources.items.room;
		this.roomScene = this.room.scene as THREE.Object3D;

		this.lerp = {
			current: 0,
			target: 0,
			ease: 0.1,
		};

		this.setModel();
		this.onMouseMove();
	}

	setModel() {
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
					map: this.resources.items.monitorScreen as THREE.Texture,
				});
			}

			if (child.name === "LaptopScreen") {
				(child as THREE.Mesh).material = new THREE.MeshBasicMaterial({
					map: this.resources.items.laptopScreen as THREE.Texture,
				});
			}
		});

		this.scene.add(this.roomScene);
		this.roomScene.scale.set(0.1, 0.1, 0.1);
	}

	setModelLight(theme: Themes) {
		if (theme === "dark") {
			this.pointLight = new THREE.PointLight(0xffffff, 0.05, 0.5);
			this.pointLight.position.set(0.2, 10, -12);
			this.roomScene.add(this.pointLight);
		} else {
			this.roomScene.remove(this.pointLight);
		}
	}

	onMouseMove() {
		window.addEventListener("mousemove", (event) => {
			this.rotation =
				((event.clientX - window.innerWidth / 2) * 2) / window.innerWidth;

			this.lerp.target = this.rotation * 0.08;
		});
	}

	resize() {}

	update() {
		this.lerp.current = GSAP.utils.interpolate(
			this.lerp.current,
			this.lerp.target,
			this.lerp.ease
		);

		this.roomScene.rotation.y = this.lerp.current;
	}
}
