import "./style.css";
import Experience from "./experience/experience";

const canvas = document.querySelector(
	".experience-canvas"
) as HTMLCanvasElement;

const experience = new Experience(canvas);
