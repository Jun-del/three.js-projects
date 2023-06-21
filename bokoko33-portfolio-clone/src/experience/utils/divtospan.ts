export default function (element: HTMLElement) {
	element.style.overflow = "hidden";
	element.innerHTML = element.innerText
		.split("")
		.map((character) => {
			if (character === " ") {
				return `<span>&nbsp;</span>`;
			}
			return `<span class="animatedis">${character}</span>`;
		})
		.join("");

	return element;
}
