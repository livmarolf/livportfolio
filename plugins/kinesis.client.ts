const kinesisSubscriber: Set<HTMLElement> = new Set();

const LIGHT_SIZE = 128;

window.addEventListener("pointermove", (e) => {
	const { x, y } = e;

	const els = [...kinesisSubscriber];
	const rects = [];

	for (const el of els) {
		rects.push(el.getBoundingClientRect());
	}

	for (let i = 0; i < els.length; i++) {
		const el = els[i];
		const rect = rects[i];

		if (rect.top > window.innerHeight) continue;
		if (rect.bottom < 0) continue;

		const relativeX = x - rect.left;
		const relativeY = y - rect.top;

		if (relativeX < -LIGHT_SIZE) continue;
		if (relativeY < -LIGHT_SIZE) continue;
		if (relativeX > rect.width + LIGHT_SIZE) continue;
		if (relativeY > rect.height + LIGHT_SIZE) continue;

		el.style.setProperty("--x", `${relativeX}px`);
		el.style.setProperty("--y", `${relativeY}px`);
	}
});

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("kinesis", {
		mounted(el) {
			el.dataset.kinesis = Math.random().toString(36).substring(2);
			kinesisSubscriber.add(el);
		},
		unmounted(el) {
			kinesisSubscriber.delete(el);
		},
		getSSRProps() {
			return {};
		},
	});
});
