import * as THREE from "three";
import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import Experience from "../experience";
import { Asset, AssetItem } from "../../types";

export default class Resources extends EventEmitter {
	public experience: Experience;
	public assets: Asset[];
	public items: { [key: string]: AssetItem } = {};
	public queue: number;
	public loaded: number;
	public loaders!: {
		[key: string]: GLTFLoader | DRACOLoader;
	};
	public video: { [key: string]: HTMLVideoElement } = {};
	public videoTexture: { [key: string]: THREE.VideoTexture } = {};

	constructor(assets: Asset[]) {
		super();

		this.experience = new Experience();
		this.assets = assets;
		this.items = {};
		this.queue = this.assets.length;
		this.loaded = 0;
		this.setLoader();
		this.startLoading();
	}

	setLoader(): void {
		this.loaders = {};
		this.loaders.GLTFLoader = new GLTFLoader();
		this.loaders.DRACOLoader = new DRACOLoader();

		this.loaders.DRACOLoader.setDecoderPath("draco/");
		this.loaders.GLTFLoader.setDRACOLoader(this.loaders.DRACOLoader);
	}

	startLoading(): void {
		for (const asset of this.assets) {
			if (asset.type === "glb" || asset.type === "gltf") {
				this.loaders.GLTFLoader.load(asset.path, (file: any) => {
					this.singleAssetLoaded(asset, file);
				});
			} else if (asset.type === "videoTexture") {
				this.video = {};
				this.videoTexture = {};

				this.video[asset.name] = document.createElement("video");
				this.video[asset.name].src = asset.path;
				this.video[asset.name].muted = true;
				this.video[asset.name].playsInline = true;
				this.video[asset.name].autoplay = true;
				this.video[asset.name].loop = true;
				this.video[asset.name].play();

				this.videoTexture[asset.name] = new THREE.VideoTexture(
					this.video[asset.name]
				);
				// TODO: Check flipY
				this.videoTexture[asset.name].flipY = true;
				this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
				this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
				this.videoTexture[asset.name].generateMipmaps = false;
				// TODO: Check srgb encoding

				this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
			}
		}
	}

	singleAssetLoaded(asset: Asset, file: AssetItem): void {
		this.items[asset.name] = file;
		this.loaded++;

		if (this.loaded === this.queue) {
			this.emit("ready");
		}
	}
}
