const kinesisSubscriber: Set<HTMLElement> = new Set();
const trackedElements = new Set<HTMLElement>();

const LIGHT_SIZE = 128;
const OFF_SCREEN = "-99999px";

const trackPointer = window.matchMedia(
	"(hover: hover) and (pointer: fine)",
).matches;

const outOfBounds = (rect: DOMRect, relativeX: number, relativeY: number) => {
	if (rect.top > window.innerHeight) return true;
	if (rect.bottom < 0) return true;

	if (relativeX < -LIGHT_SIZE) return true;
	if (relativeY < -LIGHT_SIZE) return true;
	if (relativeX > rect.width + LIGHT_SIZE) return true;
	if (relativeY > rect.height + LIGHT_SIZE) return true;

	return false;
};

if (trackPointer) {
	document.addEventListener("mouseleave", () => {
		for (const el of kinesisSubscriber) {
			el.style.setProperty("--x", OFF_SCREEN);
			el.style.setProperty("--y", OFF_SCREEN);
			trackedElements.delete(el);
		}
	});

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

			const relativeX = x - rect.left;
			const relativeY = y - rect.top;

			if (trackedElements.has(el) && outOfBounds(rect, relativeX, relativeY)) {
				el.style.setProperty("--x", OFF_SCREEN);
				el.style.setProperty("--y", OFF_SCREEN);
				trackedElements.delete(el);

				continue;
			}

			trackedElements.add(el);

			el.style.setProperty("--x", `${relativeX}px`);
			el.style.setProperty("--y", `${relativeY}px`);
		}
	});
}

if (!trackPointer) {
	document.addEventListener("pointerup", () => {
		setTimeout(() => {
			for (const el of kinesisSubscriber) {
				el.style.setProperty("--x", OFF_SCREEN);
				el.style.setProperty("--y", OFF_SCREEN);
				trackedElements.delete(el);
			}
		}, 250);
	});

	document.addEventListener("pointercancel", () => {
		setTimeout(() => {
			for (const el of kinesisSubscriber) {
				el.style.setProperty("--x", OFF_SCREEN);
				el.style.setProperty("--y", OFF_SCREEN);
				trackedElements.delete(el);
			}
		}, 250);
	});

	window.addEventListener("pointerdown", (e) => {
		const { x, y } = e;

		const els = [...kinesisSubscriber];
		const rects = [];

		for (const el of els) {
			rects.push(el.getBoundingClientRect());
		}

		for (let i = 0; i < els.length; i++) {
			const el = els[i];
			const rect = rects[i];

			const relativeX = x - rect.left;
			const relativeY = y - rect.top;

			if (trackedElements.has(el) && outOfBounds(rect, relativeX, relativeY)) {
				el.style.setProperty("--x", OFF_SCREEN);
				el.style.setProperty("--y", OFF_SCREEN);
				trackedElements.delete(el);

				continue;
			}

			trackedElements.add(el);

			el.style.setProperty("--x", `${relativeX}px`);
			el.style.setProperty("--y", `${relativeY}px`);
		}
	});
}

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("kinesis", {
		mounted(el) {
			el.dataset.kinesis = Math.random().toString(36).substring(2);
			kinesisSubscriber.add(el);
		},
		unmounted(el) {
			kinesisSubscriber.delete(el);
			trackedElements.delete(el);
		},
		getSSRProps() {
			return {};
		},
	});
});
