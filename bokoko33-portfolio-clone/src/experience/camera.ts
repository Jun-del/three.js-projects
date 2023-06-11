import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import Experience from "./experience";

export default class Camera {
	public experience: Experience;
	public sizes: Experience["sizes"];
	public scene: Experience["scene"];
	public canvas: Experience["canvas"];
	public perspectiveCamera!: THREE.PerspectiveCamera;
	public orthographicCamera!: THREE.OrthographicCamera;
	public controls!: OrbitControls;
	public orthographicCameraHelper!: THREE.CameraHelper;

	constructor() {
		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;

		this.createPerspectiveCamera();
		this.createOrthographicCamera();

		this.setOrbitControls();
	}

	private createPerspectiveCamera() {
		this.perspectiveCamera = new THREE.PerspectiveCamera(
			35,
			this.sizes.aspectRatio,
			0.1,
			1000
		);
		// this.perspectiveCamera.position.z = 5;
		this.perspectiveCamera.position.set(29, 14, 12);

		this.scene.add(this.perspectiveCamera);
	}

	private createOrthographicCamera() {
		this.orthographicCamera = new THREE.OrthographicCamera(
			(-this.sizes.aspectRatio * this.sizes.frustum) / 2,
			(this.sizes.aspectRatio * this.sizes.frustum) / 2,
			this.sizes.frustum / 2,
			-this.sizes.frustum / 2,
			-50,
			50
		);

		this.orthographicCamera.position.set(0, 3.5, 5);
		this.orthographicCamera.rotation.x = -Math.PI / 6;

		this.scene.add(this.orthographicCamera);

		// * Orthographic Camera Helper
		// this.orthographicCameraHelper = new THREE.CameraHelper(
		//   this.orthographicCamera
		// );
		// this.scene.add(this.orthographicCameraHelper);

		// * Grid Helper
		// const size = 20;
		// const divisions = 20;
		// const gridHelper = new THREE.GridHelper(size, divisions);
		// this.scene.add(gridHelper);

		// const axesHelper = new THREE.AxesHelper(10);
		// this.scene.add(axesHelper);
	}

	setOrbitControls() {
		this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
		this.controls.enableDamping = true;
		this.controls.enableZoom = false;
	}

	// Update camera on resize
	resize() {
		this.perspectiveCamera.aspect = this.sizes.aspectRatio;
		this.perspectiveCamera.updateProjectionMatrix();

		this.orthographicCamera.left =
			(-this.sizes.aspectRatio * this.sizes.frustum) / 2;
		this.orthographicCamera.right =
			(this.sizes.aspectRatio * this.sizes.frustum) / 2;
		this.orthographicCamera.top = this.sizes.frustum / 2;
		this.orthographicCamera.bottom = -this.sizes.frustum / 2;
		this.orthographicCamera.updateProjectionMatrix();
	}

	update() {
		this.controls.update();

		// * Orthographic Camera Helper Update
		// this.orthographicCameraHelper.matrixWorldNeedsUpdate = true;
		// this.orthographicCameraHelper.update();
		// this.orthographicCameraHelper.position.copy(
		//   this.orthographicCamera.position
		// );
		// this.orthographicCameraHelper.rotation.copy(
		//   this.orthographicCamera.rotation
		// );
	}
}
