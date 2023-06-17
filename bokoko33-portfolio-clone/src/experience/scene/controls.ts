import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/all";
import ASScroll from "@ashthornton/asscroll";

import Experience from "../experience";
// import { Themes } from "../../types";

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
	public sections!: NodeListOf<Element>;
	public progressWrapper!: Element;
	public progressBar!: Element;
	public asscroll!: ASScroll;
	public circleFirst!: THREE.Mesh;
	public circleSecond!: THREE.Mesh;
	public circleThird!: THREE.Mesh;

	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.sizes = this.experience.sizes;
		this.resources = this.experience.resources;
		this.time = this.experience.time;
		this.camera = this.experience.camera;
		this.room = this.experience.world.room.roomScene;
		this.room.children.forEach((child: THREE.PointLight) => {
			if (child.type === "PointLight") {
				this.pointLight = child as THREE.PointLight;
			}
		});
		this.timeline = GSAP.timeline();
		this.circleFirst = this.experience.world.floor.circleFirst;
		this.circleSecond = this.experience.world.floor.circleSecond;
		this.circleThird = this.experience.world.floor.circleThird;

		// Add markers property to ScrollTrigger defaults
		// ScrollTrigger.defaults({
		//   markers: true,
		// });

		GSAP.registerPlugin(ScrollTrigger);

		this.setSmoothScroll();
		this.setScrollTrigger();
	}

	setupASScroll() {
		// https://github.com/ashthornton/asscroll
		const asscroll = new ASScroll({
			ease: 0.3,
			disableRaf: true,
		});

		GSAP.ticker.add(asscroll.update);

		ScrollTrigger.defaults({
			scroller: asscroll.containerElement,
		});

		ScrollTrigger.scrollerProxy(asscroll.containerElement, {
			scrollTop(value) {
				if (arguments.length) {
					asscroll.currentPos = value!;
					return;
				}
				return asscroll.currentPos;
			},
			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				};
			},
			fixedMarkers: true,
		});

		asscroll.on("update", ScrollTrigger.update);
		ScrollTrigger.addEventListener("refresh", asscroll.resize);

		requestAnimationFrame(() => {
			asscroll.enable({
				newScrollElements: document.querySelectorAll(
					".gsap-marker-start, .gsap-marker-end, [asscroll]"
				),
			});
		});
		return asscroll;
	}

	setSmoothScroll() {
		this.asscroll = this.setupASScroll();
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
				this.sections = document.querySelectorAll(".section");
				this.sections.forEach((section) => {
					this.progressWrapper = section.querySelector(".progress-wrapper")!;
					this.progressBar = section.querySelector(".progress-bar")!;

					if (section.classList.contains("right")) {
						GSAP.to(section, {
							borderTopLeftRadius: 10,
							scrollTrigger: {
								trigger: section,
								start: "top bottom",
								end: "top top",
								scrub: 0.6,
							},
						});
						GSAP.to(section, {
							borderBottomLeftRadius: 700,
							scrollTrigger: {
								trigger: section,
								start: "bottom bottom",
								end: "bottom top",
								scrub: 0.6,
							},
						});
					} else {
						GSAP.to(section, {
							borderTopRightRadius: 10,
							scrollTrigger: {
								trigger: section,
								start: "top bottom",
								end: "top top",
								scrub: 0.6,
							},
						});
						GSAP.to(section, {
							borderBottomRightRadius: 700,
							scrollTrigger: {
								trigger: section,
								start: "bottom bottom",
								end: "bottom top",
								scrub: 0.6,
							},
						});
					}

					// Animate progress bar
					GSAP.from(this.progressBar, {
						scaleY: 0,
						scrollTrigger: {
							trigger: section,
							start: "top top",
							end: "bottom bottom",
							scrub: 0.4,
							pin: this.progressWrapper,
							pinSpacing: false,
						},
					});
				});

				// * Circles and model scale animations
				this.firstMoveTimeline = GSAP.timeline({
					scrollTrigger: {
						trigger: ".first-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
					},
				}).to(this.circleFirst.scale, {
					x: 3,
					y: 3,
					z: 3,
				});

				this.secondMoveTimeline = GSAP.timeline({
					scrollTrigger: {
						trigger: ".second-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
					},
				})
					.to(
						this.circleSecond.scale,
						{
							x: 3,
							y: 3,
							z: 3,
						},
						"same"
					)
					.to(
						this.room.position,
						{
							y: 0.7,
						},
						"same"
					);

				this.thirdMoveTimeline = GSAP.timeline({
					scrollTrigger: {
						trigger: ".third-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
					},
				}).to(this.circleThird.scale, {
					x: 3,
					y: 3,
					z: 3,
				});

				// * Platform animations
				this.secondPartTimeline = GSAP.timeline({
					scrollTrigger: {
						trigger: ".third-move",
						start: "top top",
					},
				});

				this.room.children.forEach(
					(child: {
						name: string;
						position: gsap.TweenTarget;
						scale: gsap.TweenTarget;
					}) => {
						if (child.name === "MiniFloor") {
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
					}
				);
				this.secondPartTimeline.add(this.first);
				this.secondPartTimeline.add(this.second);
				this.secondPartTimeline.add(this.third, "-=0.05");
				this.secondPartTimeline.add(this.fourth, "-=0.2");
				this.secondPartTimeline.add(this.fifth, "-=0.2");
				this.secondPartTimeline.add(this.sixth, "-=0.2");
			},
		});
	}

	// setRoomLight(theme: Themes) {
	// 	ScrollTrigger.matchMedia({
	// 		"(max-width: 969px)": () => {
	// 			// if (theme === "dark") {
	// 			// this.firstMoveTimeline.to(
	// 			// 	this.pointLight,
	// 			// 	{
	// 			// 		distance: 1,
	// 			// 	},
	// 			// 	"same"
	// 			// );
	// 			// }
	// 		},
	// 		"(max-width: 968px)": () => {
	// 			// if (theme === "dark") {
	// 			// this.secondMoveTimeline.to(
	// 			// 	this.pointLight,
	// 			// 	{
	// 			// 		distance: 1,
	// 			// 	},
	// 			// 	"same"
	// 			// );
	// 			// }
	// 		},
	// 		all: function () {},
	// 	});
	// }

	resize() {}

	update() {}
}
