import * as THREE from "three";

import Experience from "../experience";

export default class Floor {
	public experience: Experience;
	public scene: Experience["scene"];
	public floorGeometry!: THREE.PlaneGeometry;
	public floorMaterial!: THREE.MeshStandardMaterial;
	public floor!: THREE.Mesh;
	public circleFirst!: THREE.Mesh;
	public circleSecond!: THREE.Mesh;
	public circleThird!: THREE.Mesh;

	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;

		this.setFloor();
		this.setCircles();
	}

	setFloor() {
		this.floorGeometry = new THREE.PlaneGeometry(100, 100);
		this.floorMaterial = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			side: THREE.BackSide,
		});
		this.floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial);
		this.floor.rotation.x = Math.PI * 0.5;
		this.floor.position.y = -0.5;

		// TODO: Shadow not on floor

		this.floor.receiveShadow = true;

		this.scene.add(this.floor);
	}

	setCircles() {
		const geometry = new THREE.CircleGeometry(5, 64);

		const materialFirst = new THREE.MeshStandardMaterial({ color: 0xb5a3e3 });
		const materialSecond = new THREE.MeshStandardMaterial({ color: 0x8395cd });
		const materialThird = new THREE.MeshStandardMaterial({ color: 0x7ad0ac });

		this.circleFirst = new THREE.Mesh(geometry, materialFirst);
		this.circleSecond = new THREE.Mesh(geometry, materialSecond);
		this.circleThird = new THREE.Mesh(geometry, materialThird);

		this.circleFirst.position.y = -0.29;
		this.circleSecond.position.x = 2;
		this.circleSecond.position.y = -0.28;
		this.circleThird.position.y = -0.27;

		this.circleFirst.scale.set(0, 0, 0);
		this.circleSecond.scale.set(0, 0, 0);
		this.circleThird.scale.set(0, 0, 0);

		this.circleFirst.rotation.x =
			this.circleSecond.rotation.x =
			this.circleThird.rotation.x =
				-Math.PI * 0.5;

		this.circleFirst.receiveShadow = true;
		this.circleSecond.receiveShadow = true;
		this.circleThird.receiveShadow = true;

		// this.scene.add(this.circleFirst, this.circleSecond, this.circleThird);
		this.scene.add(this.circleFirst);
		this.scene.add(this.circleSecond);
		this.scene.add(this.circleThird);
	}

	resize() {}

	update() {}
}
