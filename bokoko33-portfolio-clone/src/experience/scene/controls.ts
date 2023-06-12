import GSAP from "gsap";
import { ScrollTrigger } from "gsap/all";

import Experience from "../experience";

export default class Controls {
  public experience: Experience;
  public scene: Experience["scene"];
  public sizes: Experience["sizes"];
  public resources: Experience["resources"];
  public time: Experience["time"];
  public camera: Experience["camera"];
  public room: Experience["world"]["room"]["roomScene"];
  public timeline: GSAPTimeline;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.roomScene;
    this.timeline = GSAP.timeline();

    // Add markers property to ScrollTrigger defaults
    ScrollTrigger.defaults({
      markers: true,
    });

    GSAP.registerPlugin(ScrollTrigger);

    this.setPath();
  }

  setPath() {
    // this.timeline = new GSAP.timeline();
    this.timeline.to(this.room.position, {
      x: () => {
        return this.sizes.width * 0.0012;
      },
      scrollTrigger: {
        trigger: ".first-move",
        // marker: true,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
  }

  resize() {}

  update() {}
}
