const kinesisSubscriber: Map<string, (x: number, y: number) => void> =
	new Map();

const subscribe = (id: string, cb: (x: number, y: number) => void) => {
	kinesisSubscriber.set(id, cb);
};

const unsubscribe = (id: string) => {
	kinesisSubscriber.delete(id);
};

window.addEventListener("pointermove", (e) => {
	const { x, y } = e;

	for (const cb of kinesisSubscriber.values()) {
		cb(x, y);
	}
});

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("kinesis", {
		mounted(el) {
			el.dataset.kinesis = Math.random().toString(36).substring(2);
			subscribe(el.dataset.kinesis, (x, y) => {
				const rect = el.getBoundingClientRect();

				el.style.setProperty("--x", `${x - rect.left}px`);
				el.style.setProperty("--y", `${y - rect.top}px`);
			});
		},
		unmounted(el) {
			unsubscribe(el.dataset.kinesis);
		},
		getSSRProps() {
			return {};
		},
	});
});
