import { TextRenderer } from "./text/text-render";

export const Colors = {
	ON: "#fff",
	OFF: "#111111",
	CURSOR: "lime",
} as const;

export type Actor = {
	duration: number | ((width: number, height: number) => number);
	start: number;
	clip?: boolean;
	minResolution?: {
		horizontal: number;
		vertical: number;
	};
	initializeStore?: (this: Display) => Record<string, unknown>;
	render: (
		this: Display,
		t: number,
		// biome-ignore lint/suspicious/noExplicitAny: I don't want to type this
		prevObjInfo: any,
		// biome-ignore lint/suspicious/noExplicitAny: I don't want to type this
		store: Record<string, any>,
	) => unknown;
};

export type Scene = Actor[];

export const MAX_PIXEL_SIZE = 24;
export const MIN_VERTICAL_RESOLUTION = 1;

export class Display {
	private el: HTMLElement;

	private running = false;
	private scenes: Scene[] = [];
	private currentSceneIndex = 0;
	private pixelSize = 0;
	private get currentScene() {
		return this.scenes[this.currentSceneIndex];
	}
	private sceneStart = 0;
	private get elapsed() {
		return performance.now() - this.sceneStart;
	}
	private previousFrame: string[] = [];
	private writeBuffer: string[] = [];
	private animationFrameId: number | null = null;
	private sceneStore = new Map<Actor, Record<string, unknown>>();
	private finalActor: Actor | null = null;
	private loopOffset: number;

	text: TextRenderer = new TextRenderer(this);

	width = 0;
	height = 0;

	get center() {
		return [this.width / 2, this.height / 2].map(Math.floor) as [
			number,
			number,
		];
	}

	get size() {
		return this.writeBuffer.length;
	}

	constructor(
		el: HTMLElement,
		scenes: Scene[],
		options: { loopOffset?: number } = { loopOffset: 0 },
	) {
		this.el = el;
		this.scenes = scenes;

		this.render = this.render.bind(this);
		this.loopOffset = options.loopOffset ?? 0;

		this.buildDOM();

		const observer = new ResizeObserver(() => {
			if (!this.running) return;

			this.stop();
			this.buildDOM();
			this.render();
		});

		observer.observe(document.body);
	}

	private buildDOM() {
		const { height } = this.el.getBoundingClientRect();

		this.el.style.height = `${height}px`;
		this.el.innerHTML = "";

		const rect = this.el.getBoundingClientRect();

		this.el.style.height = "";

		const minRes = this.getMinResolution(this.scenes);

		this.width = this.getHorizontalResolution(rect.width, minRes.horizontal);
		this.height = Math.max(minRes.vertical, MIN_VERTICAL_RESOLUTION);
		this.pixelSize = this.getPixelSize(rect.width, this.width);

		this.writeBuffer = new Array(this.width * this.height).fill(Colors.OFF);
		this.previousFrame = new Array(this.width * this.height).fill(Colors.OFF);

		this.el.style.setProperty("--size", `${this.pixelSize}px`);

		for (let i = 0; i < this.writeBuffer.length; i++) {
			const x = i % this.width;
			const y = Math.floor(i / this.width);

			const pixel = document.createElement("div");

			pixel.dataset.loc = `${x},${y}`;
			pixel.style.setProperty("color", Colors.OFF);
			pixel.classList.add("pixel");

			this.el.appendChild(pixel);
		}
	}

	getPixelGap = () => {
		return Number.parseInt(
			window.getComputedStyle(this.el).getPropertyValue("--pixel-gap"),
			10,
		);
	};

	horizontalResolutionWithMaxPixelSize = (elWidth: number) => {
		const res = Math.floor(elWidth / (MAX_PIXEL_SIZE + this.getPixelGap()));

		return res % 2 === 0 ? res + 1 : res;
	};

	getHorizontalResolution = (elWidth: number, minRes: number) => {
		let horizontalResolution =
			this.horizontalResolutionWithMaxPixelSize(elWidth);

		while (horizontalResolution < minRes) {
			horizontalResolution += 2;
		}

		return horizontalResolution;
	};

	getPixelSize = (elWidth: number, horizontalResolution: number) => {
		const horizontalGaps = (horizontalResolution - 1) * this.getPixelGap();
		return (elWidth - horizontalGaps) / horizontalResolution;
	};

	getMinResolution = (scenes: Scene[]) => {
		const minRes = {
			horizontal: Number.NEGATIVE_INFINITY,
			vertical: Number.NEGATIVE_INFINITY,
		};

		for (const scene of scenes) {
			for (const { minResolution } of scene) {
				minRes.horizontal = Math.max(
					minRes.horizontal,
					minResolution?.horizontal ?? 1,
				);
				minRes.vertical = Math.max(
					minRes.vertical,
					minResolution?.vertical ?? 1,
				);
			}
		}

		if (minRes.horizontal % 2 === 0)
			throw new Error("Horizontal resolution must be odd");
		if (minRes.vertical % 2 === 0)
			throw new Error("Vertical resolution must be odd");

		if (minRes.horizontal === Number.NEGATIVE_INFINITY) minRes.horizontal = 1;
		if (minRes.vertical === Number.NEGATIVE_INFINITY) minRes.vertical = 1;

		return minRes;
	};

	private prepareFinalActor(sceneDuration: number) {
		if (this.loopOffset >= 0 || this.finalActor) return;

		this.finalActor = {
			...this.scenes[0][0],
			start: sceneDuration + this.loopOffset,
		};

		this.sceneStore.set(
			this.finalActor,
			this.finalActor.initializeStore?.call(this) ?? {},
		);
	}

	private render() {
		if (!this.currentScene) return;
		this.running = true;

		const computeDuration = (d: Actor["duration"]) => {
			return typeof d === "number" ? d : d(this.width, this.height);
		};

		this.writeBuffer = new Array(this.width * this.height).fill(Colors.OFF);

		const sceneDuration = Math.max(
			...this.currentScene.map(
				({ start, duration }) => start + computeDuration(duration),
			),
		);

		if (this.elapsed >= sceneDuration) {
			return this.nextScene();
		}

		this.prepareFinalActor(sceneDuration);

		let prevRenderInfo: unknown = null;

		const actors =
			this.currentSceneIndex === this.scenes.length - 1 && this.finalActor
				? [...this.currentScene, this.finalActor]
				: this.currentScene;

		for (const actor of actors) {
			const { start, duration, render, clip } = actor;

			const t = (this.elapsed - start) / computeDuration(duration);
			if (t < 0 || (t > 1 && clip)) continue;

			prevRenderInfo = render.bind(this)(
				t,
				prevRenderInfo,
				// biome-ignore lint/style/noNonNullAssertion: ts can't infer the type
				this.sceneStore.get(actor)!,
			);
		}
		this.flushBuffer();

		this.animationFrameId = requestAnimationFrame(this.render);
	}

	private nextScene() {
		if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

		const finalActorStore =
			this.finalActor && this.sceneStore.get(this.finalActor);
		this.finalActor = null;

		this.sceneStore.clear();

		this.animationFrameId = requestAnimationFrame(this.render);
		this.currentSceneIndex = (this.currentSceneIndex + 1) % this.scenes.length;
		this.sceneStart =
			this.currentSceneIndex === 0
				? performance.now() + this.loopOffset
				: performance.now();

		for (const actor of this.currentScene) {
			this.sceneStore.set(actor, actor.initializeStore?.call(this) ?? {});
		}

		if (finalActorStore) {
			this.sceneStore.set(this.currentScene[0], finalActorStore);
		}
	}

	private flushBuffer() {
		for (let i = 0; i < this.writeBuffer.length; i++) {
			if (this.previousFrame[i] === this.writeBuffer[i]) continue;

			const x = i % this.width;
			const y = Math.floor(i / this.width);

			const pixel = this.el.querySelector(
				`[data-loc="${x},${y}"]`,
			) as HTMLDivElement;
			if (!pixel) throw new Error(`No pixel at location ${x},${y}`);

			pixel.style.setProperty("color", this.writeBuffer[i]);
			pixel.classList.toggle("on", this.writeBuffer[i] !== Colors.OFF);
		}

		this.previousFrame = this.writeBuffer;
	}

	play() {
		if (this.running) {
			if (this.logging) console.warn("Display is already running");
			return;
		}

		for (const actor of this.currentScene) {
			this.sceneStore.set(actor, actor.initializeStore?.call(this) ?? {});
		}

		this.sceneStart = performance.now();
		this.render();
	}

	private stop() {
		this.running = false;
		if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
	}

	isOnScreen(x: number, y: number) {
		return x >= 0 && y >= 0 && x < this.width && y < this.height;
	}

	get(i: number): string;
	get(x: number, y: number): string;
	get(x: number, y?: number): string {
		if (typeof y === "undefined") {
			if (x >= this.size) {
				this.logging && console.warn(`Index ${x} is out of bounds`);
				return Colors.OFF;
			}
			return this.writeBuffer[x];
		}

		if (!this.isOnScreen(x, y)) {
			this.logging && console.warn(`Pixel ${x},${y} is out of bounds`);
			return Colors.OFF;
		}

		return this.writeBuffer[x + y * this.width];
	}

	set(i: number, color: string): void;
	set(x: number, y: number, color: string): void;
	set(x: number, y: number | string, color?: string): void {
		if (typeof y === "string") {
			if (x >= this.size) {
				this.logging && console.warn(`Index ${x} is out of bounds`);
				return;
			}
			this.writeBuffer[x] = y;
			return;
		}

		if (!this.isOnScreen(x, y)) {
			this.logging && console.warn(`Pixel ${x},${y} is out of bounds`);
			return;
		}

		this.writeBuffer[x + y * this.width] = color as string;
	}

	pointFromIndex = (idx: number, width: number) => [
		idx % width,
		Math.floor(idx / this.width),
	];

	lerp = (a: number, b: number, t: number) => a + (b - a) * t;

	lerpRGB = (
		start: [number, number, number],
		end: [number, number, number],
		t: number,
	) => {
		const r = this.lerp(start[0], end[0], t);
		const g = this.lerp(start[1], end[1], t);
		const b = this.lerp(start[2], end[2], t);

		return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
	};

	// DevTools
	logging = false;

	playbackControls() {
		document.addEventListener("keydown", (e) => {
			if (e.key === " ") {
				e.preventDefault();
				if (this.running) {
					// @ts-ignore
					this._haltTime = performance.now();
					this.stop();
					console.log({
						currentSceneIndex: this.currentSceneIndex,
						width: this.width,
						height: this.height,
						size: this.size,
					});
				} else {
					// @ts-ignore
					this.sceneStart += performance.now() - this._haltTime;
					this.render();
				}
			}

			if (e.key === "ArrowRight") {
				this.nextScene();
			}

			if (e.key === "ArrowLeft") {
				this.currentSceneIndex = Math.max(this.currentSceneIndex - 1, 0);
				this.sceneStart = performance.now();
			}
		});
	}

	edit() {
		this.stop();
		this.el.addEventListener("click", (e) => {
			const target = e.target as HTMLElement;

			if (!target.dataset.loc) return;

			const [x, y] = target.dataset.loc.split(",").map(Number);

			if (e.altKey) {
				const colorPicker = document.createElement("input");
				colorPicker.type = "color";
				colorPicker.onchange = () => {
					//@ts-ignore
					this.previousColor = colorPicker.value;
					this.set(x, y, colorPicker.value);

					const tmpBuffer = this.writeBuffer.slice();

					this.flushBuffer();

					this.writeBuffer = tmpBuffer;
				};
				colorPicker.click();
				return;
			}

			if (this.get(x, y) !== Colors.OFF) this.set(x, y, Colors.OFF);
			// @ts-ignore
			else this.set(x, y, this.previousColor ?? Colors.ON);

			const tmpBuffer = this.writeBuffer.slice();

			this.flushBuffer();

			this.writeBuffer = tmpBuffer;
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				console.log(this.export(e.shiftKey, e.ctrlKey));
				navigator.clipboard.writeText(this.export());
			}
		});
	}

	export(color = false, full = false) {
		let output: [number, number, string?][] = [];

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				if (this.get(x, y) !== Colors.OFF || full) {
					if (color) output.push([x, y, this.get(x, y)]);
					else output.push([x, y]);
				}
			}
		}

		const minX = Math.min(...output.map(([x]) => x));
		const minY = Math.min(...output.map(([, y]) => y));

		output = output.map(([x, y, color]) => [x - minX, y - minY, color]);

		return JSON.stringify(output);
	}
}
