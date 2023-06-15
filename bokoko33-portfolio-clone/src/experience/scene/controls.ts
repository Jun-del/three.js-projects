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
  public pointLight!: THREE.PointLight;

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
                return 1;
              },
              z: () => {
                return this.sizes.height * 0.0032;
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
      },

      // medium: Mobile
      "(max-width: 968px)": () => {},

      all: function () {},
    });

    // this.timeline.to(this.room.position, {
    //   x: () => {
    //     return this.sizes.width * 0.0012;
    //   },
    //   scrollTrigger: {
    //     trigger: ".first-move",
    //     // marker: true,
    //     start: "top top",
    //     end: "bottom bottom",
    //     scrub: 0.6,
    //     invalidateOnRefresh: true,
    //   },
    // });
  }

  setRoomLight(theme: Themes) {
    ScrollTrigger.matchMedia({
      "(min-width: 969px)": () => {
        if (theme === "dark") {
          this.secondMoveTimeline.to(
            this.pointLight,
            {
              intensity: 0.05 * 4,
              distance: 0.5 * 4,
            },
            "same"
          );
        }
      },

      "(max-width: 968px)": () => {},

      all: function () {},
    });
  }

  resize() {}

  update() {}
}
