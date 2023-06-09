import { EventEmitter } from "events";

export default class Sizes extends EventEmitter {
  public width: number;
  public height: number;
  public aspectRatio: number;
  public pixelRatio: number;
  public frustum: number;

  constructor() {
    super();

    this.frustum = 5;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.aspectRatio = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.aspectRatio = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      this.emit("resize");
    });
  }
}
