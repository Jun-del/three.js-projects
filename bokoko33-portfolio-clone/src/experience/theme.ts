import { EventEmitter } from "events";

export default class Theme extends EventEmitter {
  public theme: "light" | "dark";
  public toggleButton: HTMLElement;
  public toggleCircle!: HTMLElement;

  constructor() {
    super();

    this.theme = "light";

    this.toggleButton = document.querySelector(".toggle-button")!;
    this.toggleCircle = document.querySelector(".toggle-circle")!;

    this.setEventListeners();
  }

  setEventListeners() {
    this.toggleButton.addEventListener("click", () => {
      this.toggleCircle.classList.toggle("slide");
      this.theme = this.theme === "light" ? "dark" : "light";

      this.emit("switch", this.theme);
    });
  }
}
