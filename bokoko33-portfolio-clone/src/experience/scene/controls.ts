import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/all";

import Experience from "../experience";
import { Themes } from "../../types";

export default class Controls {
	public experience: Experience;
	public scene: Experience["scene"];
	public sizes: Experience["sizes"];
	public resources: Experience["resources"];
	public time: Experience["time"];
	public camera: Experience["camera"];
	public room: Experience["world"]["room"]["roomScene"];
	public timeline: GSAPTimeline;
	public firstMoveTimeline!: GSAPTimeline;
	public secondMoveTimeline!: GSAPTimeline;
	public thirdMoveTimeline!: GSAPTimeline;
	public secondPartTimeline!: GSAPTimeline;
	public pointLight!: THREE.PointLight;
	public first!: GSAPTween;
	public second!: GSAPTween;
	public third!: GSAPTween;
	public fourth!: GSAPTween;
	public fifth!: GSAPTween;
	public sixth!: GSAPTween;

	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.sizes = this.experience.sizes;
		this.resources = this.experience.resources;
		this.time = this.experience.time;
		this.camera = this.experience.camera;
		this.room = this.experience.world.room.roomScene;

		this.room.children.forEach((child) => {
			if (child.type === "PointLight") {
				this.pointLight = child as THREE.PointLight;
			}
		});
		this.timeline = GSAP.timeline();

		// Add markers property to ScrollTrigger defaults
		// ScrollTrigger.defaults({
		//   markers: true,
		// });

		GSAP.registerPlugin(ScrollTrigger);

		this.setScrollTrigger();
	}

	setScrollTrigger() {
		ScrollTrigger.matchMedia({
			// large: Desktop and up
			"(min-width: 969px)": () => {
				// * First Section
				this.room.scale.set(0.1, 0.1, 0.1);

				this.firstMoveTimeline = GSAP.timeline({
					scrollTrigger: {
						trigger: ".first-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				});
				this.firstMoveTimeline.to(this.room.position, {
					x: () => {
						return this.sizes.width * 0.0014;
					},
				});

				// * Second Section
				this.secondMoveTimeline = GSAP.timeline({
					scrollTrigger: {
						trigger: ".second-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				});
				this.secondMoveTimeline
					.to(
						this.room.position,
						{
							x: () => {
								return -3.5;
							},
							z: () => {
								// return this.sizes.height * 0.0032;
								return this.sizes.height * 0.005;
							},
						},
						"same"
					)
					.to(
						this.room.scale,
						{
							x: 0.4,
							y: 0.4,
							z: 0.4,
						},
						"same"
					);

				// * Third Section (Camera)
				this.thirdMoveTimeline = GSAP.timeline({
					scrollTrigger: {
						trigger: ".third-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				});
				this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
					x: -8,
					y: -1.5,
				});
			},

			// medium: Mobile
			"(max-width: 968px)": () => {
				// Resets
				this.room.scale.set(0.07, 0.07, 0.07);
				this.room.position.set(0, 0, 0);

				// * First Section
				this.firstMoveTimeline = GSAP.timeline({
					scrollTrigger: {
						trigger: ".first-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				}).to(this.room.scale, {
					x: 0.1,
					y: 0.1,
					z: 0.1,
				});

				// * Second Section
				this.secondMoveTimeline = GSAP.timeline({
					scrollTrigger: {
						trigger: ".second-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				})
					.to(
						this.room.scale,
						{
							x: 0.25,
							y: 0.25,
							z: 0.25,
						},
						"same"
					)
					.to(
						this.room.position,
						{
							x: -0.5,
							z: 4,
						},
						"same"
					);

				// * Third Section
				this.thirdMoveTimeline = GSAP.timeline({
					scrollTrigger: {
						trigger: ".third-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				}).to(this.room.position, {
					x: 1.3,
					z: -4.5,
				});
			},

			all: () => {
				// * Platform animations
				this.secondPartTimeline = GSAP.timeline({
					scrollTrigger: {
						trigger: ".third-move",
						start: "top top",
					},
				});

				this.room.children.forEach((child) => {
					if (child.name === "MiniFloor") {
						console.log(child.position);

						// !! Original x: -5.846341133117676, y: -0.5232429504394531, z: 11.979839324951172

						this.first = GSAP.to(child.position, {
							x: -5.846341133117676,
							z: 11.979839324951172,
							duration: 0.3,
						});
					}

					if (child.name === "MailBox") {
						this.second = GSAP.to(child.scale, {
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2)",
							duration: 0.3,
						});
					}

					if (child.name === "Lamp") {
						this.third = GSAP.to(child.scale, {
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2)",
							duration: 0.3,
						});
					}

					if (child.name === "FloorFirst") {
						this.fourth = GSAP.to(child.scale, {
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2)",
							duration: 0.3,
						});
					}

					if (child.name === "FloorSecond") {
						this.fifth = GSAP.to(child.scale, {
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2)",
							duration: 0.3,
						});
					}

					if (child.name === "FloorThird") {
						this.sixth = GSAP.to(child.scale, {
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2)",
							duration: 0.3,
						});
					}
				});
				this.secondPartTimeline.add(this.first);
				this.secondPartTimeline.add(this.second);
				this.secondPartTimeline.add(this.third, "-=0.05");
				this.secondPartTimeline.add(this.fourth, "-=0.2");
				this.secondPartTimeline.add(this.fifth, "-=0.2");
				this.secondPartTimeline.add(this.sixth, "-=0.2");
			},
		});
	}

	setRoomLight(theme: Themes) {
		ScrollTrigger.matchMedia({
			"(max-width: 969px)": () => {
				// if (theme === "dark") {
				// this.firstMoveTimeline.to(
				// 	this.pointLight,
				// 	{
				// 		distance: 1,
				// 	},
				// 	"same"
				// );
				// }
			},
			"(max-width: 968px)": () => {
				// if (theme === "dark") {
				// this.secondMoveTimeline.to(
				// 	this.pointLight,
				// 	{
				// 		distance: 1,
				// 	},
				// 	"same"
				// );
				// }
			},
			all: function () {},
		});
	}

	resize() {}

	update() {}
}
