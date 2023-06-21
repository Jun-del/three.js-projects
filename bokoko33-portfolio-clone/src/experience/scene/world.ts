import { EventEmitter } from "events";

import Experience from "../experience";
import Room from "./room";
import Environment from "./environment";
import Controls from "./controls";
import Floor from "./floor";

import { Themes } from "../../types";

export default class World extends EventEmitter {
	public experience: Experience;
	public sizes: Experience["sizes"];
	public scene: Experience["scene"];
	public canvas: Experience["canvas"];
	public camera: Experience["camera"];
	public resources: Experience["resources"];
	public theme: Experience["theme"];
	public environment!: Environment;
	public room!: Room;
	public controls!: Controls;
	public floor!: Floor;

	constructor() {
		super();

		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;
		this.camera = this.experience.camera;
		this.resources = this.experience.resources;
		this.theme = this.experience.theme;

		this.resources.on("ready", () => {
			this.environment = new Environment();
			this.floor = new Floor();
			this.room = new Room();

			this.emit("worldready");

			this.controls = new Controls();
		});

		this.theme.on("switch", (theme: Themes) => {
			this.switchTheme(theme);
		});
	}

	switchTheme(theme: Themes) {
		if (this.environment) {
			this.environment.switchTheme(theme);
		}

		// TODO: Lights after preloader
		if (this.room) {
			this.room.setModelLight(theme);
		}

		// TODO: Check this room light
		// if (this.controls) {
		// 	this.controls.setRoomLight(theme);
		// }
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
