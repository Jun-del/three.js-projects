import { EventEmitter } from "events";

export default class Sizes extends EventEmitter {
	public frustum: number;
	public width: number;
	public height: number;
	public aspectRatio: number;
	public pixelRatio: number;
	public device: string;

	constructor() {
		super();

		this.frustum = 5;

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.aspectRatio = this.width / this.height;
		this.pixelRatio = Math.min(window.devicePixelRatio, 2);

		this.width < 968 ? (this.device = "mobile") : (this.device = "desktop");

		window.addEventListener("resize", () => {
			this.width = window.innerWidth;
			this.height = window.innerHeight;

			this.aspectRatio = this.width / this.height;
			this.pixelRatio = Math.min(window.devicePixelRatio, 2);

			this.emit("resize");

			if (this.width < 968 && this.device !== "mobile") {
				this.device = "mobile";
				this.emit("switchdevice", this.device);
			} else if (this.width >= 968 && this.device !== "desktop") {
				this.device = "desktop";
				this.emit("switchdevice", this.device);
			}
		});
	}
}
