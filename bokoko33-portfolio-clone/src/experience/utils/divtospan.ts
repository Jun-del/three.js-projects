export default function (element: HTMLElement) {
	element.style.overflow = "hidden";
	element.innerHTML = element.innerText
		.split("")
		.map(() => {
			return `<span class="animatedis></span>`;
		})
		.join("");

	return element;
}
