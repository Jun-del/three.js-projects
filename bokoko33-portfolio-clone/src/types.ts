export interface Asset {
  name: string;
  type: "glb" | "gltf" | "videoTexture";
  path: string;
}

export type AssetItem = THREE.Object3D | THREE.Texture;

export type Themes = "light" | "dark";
