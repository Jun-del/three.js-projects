import { EventEmitter } from "events";

export default class Time extends EventEmitter {
  // The time at which the timer was started
  public startTime: number;

  // The current time of the timer
  public currentTime: number;

  // The elapsed time since the timer was started
  public elapsedTime: number;

  // The time between frames (60 FPS)
  public deltaTime: number;

  constructor() {
    super();

    // Set the start time to the current time
    this.startTime = Date.now();

    // Set the current time to the start time
    this.currentTime = this.startTime;

    // Set the elapsed time to 0
    this.elapsedTime = 0;

    // Set the delta time to 1000 / 60 (60 FPS)
    this.deltaTime = 1000 / 60;

    // Start the update loop
    this.update();
  }

  // The update loop
  update() {
    // Get the current time
    const currentTime = Date.now();

    // Calculate the delta time (time between frames)
    this.deltaTime = currentTime - this.currentTime;

    // Set the current time to the new time
    this.currentTime = currentTime;

    // Calculate the elapsed time since the timer was started
    this.elapsedTime = this.currentTime - this.startTime;

    this.emit("update");

    // Request the next frame
    window.requestAnimationFrame(() => this.update());
  }
}
