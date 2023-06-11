import Experience from "../experience";
import Room from "./room";
import Environment from "./environment";
import Controls from "./controls";
import Floor from "./floor";

export default class World {
  public experience: Experience;
  public sizes: Experience["sizes"];
  public scene: Experience["scene"];
  public canvas: Experience["canvas"];
  public camera: Experience["camera"];
  public resources: Experience["resources"];
  public environment!: Environment;
  public room!: Room;
  public controls!: Controls;
  public floor!: Floor;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.room = new Room();
      this.floor = new Floor();
      this.controls = new Controls();
    });
  }

  resize() {}

  update() {
    if (this.room) {
      this.room.update();
    }

    if (this.controls) {
      this.controls.update();
    }
  }
}
