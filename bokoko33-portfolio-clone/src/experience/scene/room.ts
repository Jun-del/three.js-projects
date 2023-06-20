import * as THREE from "three";
import GSAP from "gsap";

import Experience from "../experience";
import { AssetItem, Themes } from "../../types";

export default class Room {
	public experience: Experience;
	public scene: Experience["scene"];
	public resources: Experience["resources"];
	public room: AssetItem;
	public roomScene: any;
	public lerp: {
		current: number;
		target: number;
		ease: number;
	};
	public rotation!: number;
	public pointLight!: THREE.PointLight;
	public sphereSize!: number;
	public pointLightHelper!: THREE.PointLightHelper;
	public roomChildren!: {
		[key: string]: THREE.Object3D;
	};

	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.room = this.resources.items.room;
		this.roomScene = this.room.scene;
		this.roomChildren = {};

		this.lerp = {
			current: 0,
			target: 0,
			ease: 0.1,
		};

		this.setModel();
		this.onMouseMove();
	}

	setModel() {
		this.roomScene.children.forEach((child: THREE.Object3D<THREE.Event>) => {
			child.castShadow = true;
			child.receiveShadow = true;

			if (child instanceof THREE.Group) {
				child.children.forEach((groupChild) => {
					groupChild.castShadow = true;
					groupChild.receiveShadow = true;
				});
			}

			if (child.name === "TableItems") {
				const meshChild = child.children[2] as THREE.Mesh;
				meshChild.material = new THREE.MeshPhysicalMaterial({
					color: 0xc2cee6,
					roughness: 0,
					ior: 3,
					transmission: 1,
					opacity: 1,
				});
			}

			if (child.name === "Monitor") {
				(child.children[1] as THREE.Mesh).material =
					new THREE.MeshBasicMaterial({
						map: this.resources.items.monitorScreen as THREE.Texture,
					});
			}

			if (child.name === "TableItems") {
				(child.children[16] as THREE.Mesh).material =
					new THREE.MeshBasicMaterial({
						map: this.resources.items.laptopScreen as THREE.Texture,
					});
			}

			if (child.name === "MiniFloor") {
				child.position.x = -1.87767;
				child.position.z = 8.33244;
			}

			// if (
			// 	child.name === "MailBox" ||
			// 	child.name === "Lamp" ||
			// 	child.name === "FloorFirst" ||
			// 	child.name === "FloorSecond" ||
			// 	child.name === "FloorThird"
			// ) {
			// 	child.scale.set(0, 0, 0);
			// }

			child.scale.set(0, 0, 0);

			if (child.name === "Cube") {
				// child.scale.set(1, 1, 1);
				child.position.set(0, -1, 0);
				child.rotation.y = Math.PI / 4;
			}

			this.roomChildren[child.name.toLowerCase()] = child;
		});

		this.pointLight = new THREE.PointLight(0xffffff, 0, 0.5);
		this.pointLight.position.set(0.2, 10, -12.5);
		this.roomScene.add(this.pointLight);

		this.roomChildren["pointlight"] = this.pointLight;

		this.scene.add(this.roomScene);
		this.roomScene.scale.set(0.1, 0.1, 0.1);
	}

	setModelLight(theme: Themes) {
		if (theme === "dark") {
			this.pointLight.intensity = 0.05;
		} else {
			this.pointLight.intensity = 0;
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
