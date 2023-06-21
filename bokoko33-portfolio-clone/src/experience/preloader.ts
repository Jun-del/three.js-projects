import { EventEmitter } from "events";
import GSAP from "gsap";
import ConvertDivToSpan from "./utils/divtospan";

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
	public touchStart!: (event: TouchEvent) => void;
	public touchMove!: (event: TouchEvent) => void;
	public initialY!: number | null;
	public scrollOnceEvent!: (event: WheelEvent) => void;
	public moveFlag!: boolean;
	public scaleFlag!: boolean;

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
		ConvertDivToSpan(document.querySelector(".intro-text")!);
		ConvertDivToSpan(document.querySelector(".hero-main-title")!);
		ConvertDivToSpan(document.querySelector(".hero-main-description")!);
		ConvertDivToSpan(document.querySelector(".hero-second-subheading")!);
		ConvertDivToSpan(document.querySelector(".second-sub")!);
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

			// if (this.device === "desktop") {
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
				.to(
					this.roomChildren.cube.rotation,
					{
						y: 2 * Math.PI + Math.PI / 4,
					},
					"same"
				)
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
				})
				// Grouped animations
				.to(this.roomChildren.furnitures.scale, {
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				})
				.to(this.roomChildren.clock.scale, {
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				})
				.to(this.roomChildren.shelves.scale, {
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				})
				.to(this.roomChildren.desk.scale, {
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				})
				.to(this.roomChildren.tableitems.scale, {
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				})
				.to(this.roomChildren.monitor.scale, {
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				})
				.to(
					this.roomChildren.floor_items.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					"chair"
				)
				.set(this.roomChildren.minifloor.scale, {
					x: 1,
					y: 1,
					z: 1,
				})
				.to(
					this.roomChildren.chair.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.5,
					},
					"chair"
				)
				.to(
					this.roomChildren.chair.rotation,
					{
						y: 4 * Math.PI + Math.PI * 4,
						ease: "power2.out",
						duration: 1,
						// onComplete: resolve,
					},
					"chair"
				);
			// }
			// else {
			// 	this.secondTimeline.to(this.room.position, {
			// 		x: 0,
			// 		y: 0,
			// 		z: 0,
			// 		ease: "power1.out",
			// 		duration: 0.7,
			// 	});
			// }
		});
	}

	onScroll(event: WheelEvent) {
		if (event.deltaY > 0) {
			this.removeEventListeners();

			this.playSecondIntro();
		}
	}

	onTouch(event: TouchEvent) {
		this.initialY = event.touches[0].clientY;
	}

	onTouchMove(event: TouchEvent) {
		let currentY = event.touches[0].clientY;
		let difference = this.initialY! - currentY;

		if (difference > 0) {
			this.removeEventListeners();
			this.playSecondIntro();
		}

		this.initialY = null;
	}

	removeEventListeners(): void {
		window.removeEventListener("wheel", this.scrollOnceEvent);
		window.removeEventListener("touchstart", this.touchStart);
		window.removeEventListener("touchmove", this.touchMove);
	}

	async playIntro() {
		await this.firstIntro();
		this.moveFlag = true;
		this.scrollOnceEvent = this.onScroll.bind(this);
		this.touchStart = this.onTouch.bind(this);
		this.touchMove = this.onTouchMove.bind(this);
		window.addEventListener("wheel", this.scrollOnceEvent);
		window.addEventListener("touchstart", this.touchStart);
		window.addEventListener("touchmove", this.touchMove);
	}

	async playSecondIntro() {
		this.moveFlag = false;
		this.scaleFlag = true;
		await this.secondIntro();
		this.scaleFlag = false;
		this.emit("enablecontrols");
	}

	move() {
		if (this.device === "desktop") {
			this.room.position.set(-1, 0, 0);
		} else {
			this.room.position.set(0, 0, -1);
		}
	}

	scale() {
		if (this.device === "desktop") {
			this.room.scale.set(0.11, 0.11, 0.11);
		} else {
			this.room.scale.set(0.07, 0.07, 0.07);
		}
	}

	update() {
		if (this.moveFlag) {
			this.move();
		}

		if (this.scaleFlag) {
			this.scale();
		}
	}
}
