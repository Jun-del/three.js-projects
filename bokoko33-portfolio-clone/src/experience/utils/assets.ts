import { Asset } from "../../types";

type Assets = Asset[];

const assets: Assets = [
  {
    name: "room",
    type: "glb",
    path: "models/room.glb",
  },
  // Video by <a href="https://pixabay.com/users/loubens77-3874277/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=7529">Loubens77</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=7529">Pixabay</a>
  {
    name: "monitorScreen",
    type: "videoTexture",
    path: "textures/monitorScreen.mp4",
  },
  // Video by <a href="https://pixabay.com/users/piro4d-2707530/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=4788">PIRO</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=4788">Pixabay</a>
  {
    name: "laptopScreen",
    type: "videoTexture",
    path: "textures/laptopScreen.mp4",
  },
];

export default assets;
