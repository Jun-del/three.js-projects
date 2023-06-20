import { EventEmitter } from "events";
import GSAP from "gsap";

import Experience from "./experience";

export default class Preloader extends EventEmitter {
	public experience: Experience;
	public scene: Experience["scene"];
	public sizes: Experience["sizes"];
	public resources: Experience["resources"];
	public camera: Experience["camera"];
	public world: Experience["world"];
	public room: Experience["world"]["room"]["roomScene"];
	public roomChildren!: Experience["world"]["room"]["roomChildren"];
	public timeline!: GSAPTimeline;
	public secondTimeline!: GSAPTimeline;
	public device: Experience["sizes"]["device"];
	public scrollOnceEvent!: (event: WheelEvent) => void;

	constructor() {
		super();

		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.sizes = this.experience.sizes;
		this.resources = this.experience.resources;
		this.camera = this.experience.camera;
		this.world = this.experience.world;
		this.device = this.sizes.device;

		this.sizes.on("switchdevice", (device: string) => {
			this.device = device;
		});

		this.world.on("worldready", () => {
			this.setAssets();
			this.playIntro();
		});
	}

	setAssets() {
		this.room = this.experience.world.room.roomScene;
		this.roomChildren = this.experience.world.room.roomChildren;
	}

	firstIntro() {
		return new Promise((resolve) => {
			this.timeline = GSAP.timeline();
			if (this.device === "desktop") {
				this.timeline
					.to(this.roomChildren.cube.scale, {
						x: 1.4,
						y: 1.4,
						z: 1.4,
						ease: "back.out(2.5)",
						duration: 0.7,
					})
					.to(this.room.position, {
						x: -1,
						ease: "power1.out",
						duration: 0.7,
						onComplete: resolve,
					});
			} else {
				this.timeline
					.to(this.roomChildren.cube.scale, {
						x: 1.4,
						y: 1.4,
						z: 1.4,
						ease: "back.out(2.5)",
						duration: 0.7,
					})
					.to(this.room.position, {
						z: -1,
						ease: "power1.out",
						duration: 0.7,
						onComplete: resolve,
					});
			}
		});
	}

	secondIntro() {
		return new Promise((resolve) => {
			this.secondTimeline = GSAP.timeline();

			if (this.device === "desktop") {
				this.secondTimeline
					.to(
						this.room.position,
						{
							x: 0,
							y: 0,
							z: 0,
							ease: "power1.out",
						},
						"same"
					)
					.to(this.roomChildren.cube.rotation, {
						y: 2 * Math.PI + Math.PI / 4,
					})
					.to(
						this.roomChildren.cube.scale,
						{
							x: 10,
							y: 10,
							z: 10,
						},
						"same"
					)
					.to(
						this.camera.orthographicCamera.position,
						{
							y: 6.5,
						},
						"same"
					)
					.to(this.roomChildren.cube.position, {
						x: 0.083522,
						y: 9.64582,
						z: 1.3243,
					})
					.set(this.roomChildren.body.scale, {
						x: 1,
						y: 1,
						z: 1,
					})
					.to(this.roomChildren.cube.scale, {
						x: 0,
						y: 0,
						z: 0,
					});
			} else {
				this.secondTimeline.to(this.room.position, {
					x: 0,
					y: 0,
					z: 0,
					ease: "power1.out",
					duration: 0.7,
				});
			}
		});
	}

	onScroll(event: WheelEvent) {
		if (event.deltaY > 0) {
			window.removeEventListener("wheel", this.scrollOnceEvent);

			this.playSecondIntro();
		}
	}

	async playIntro() {
		await this.firstIntro();
		this.scrollOnceEvent = this.onScroll.bind(this);
		window.addEventListener("wheel", this.scrollOnceEvent);
	}

	async playSecondIntro() {
		await this.secondIntro();
	}
}
