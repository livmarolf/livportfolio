import type { Display } from "../display";
import { type GlyphMatrix, SPACE_WIDTH, getGlyphMatrix } from "./glyphs";

type HorizontalAlignment = "left" | "center" | "right";
type VerticalAlignment = "top" | "center" | "bottom";

export class TextRenderer {
	KERNING = 1;
	LINE_SPACING = 1;

	private display: Display;

	constructor(display: Display) {
		this.display = display;
	}

	glyphWidth = (glyph: GlyphMatrix) =>
		!glyph.length ? SPACE_WIDTH : Math.max(...glyph.map(([x]) => x)) + 1;

	glyphHeight = (glyph: GlyphMatrix) =>
		Math.max(...glyph.map(([, y]) => y)) + 1;

	glyph(
		x: number,
		y: number,
		glyph: string | GlyphMatrix,
		color: string,
		alignment: [HorizontalAlignment, VerticalAlignment] = ["left", "top"],
	) {
		const matrix = typeof glyph === "string" ? getGlyphMatrix(glyph) : glyph;

		const width = this.glyphWidth(matrix);
		const height = this.glyphHeight(matrix);

		const horizontalAlignments = {
			left: 0,
			center: Math.floor(width / 2),
			right: width,
		};

		const verticalAlignments = {
			top: 0,
			center: Math.floor(height / 2),
			bottom: height,
		};

		for (const [xOffset, yOffset, bg = color] of matrix) {
			this.display.set(
				x + (xOffset - horizontalAlignments[alignment[0]]),
				y + (yOffset - verticalAlignments[alignment[1]]),
				bg,
			);
		}

		return [width, height] as const;
	}

	string(
		x: number,
		y: number,
		str: string | GlyphMatrix[],
		color: string,
		alignment: [HorizontalAlignment, VerticalAlignment] = ["left", "top"],
	) {
		const glyphs =
			typeof str === "string" ? str.split("").map(getGlyphMatrix) : str;

		const width =
			glyphs.reduce((a, b) => a + this.glyphWidth(b), 0) +
			(str.length - 1) * this.KERNING;
		const height = Math.max(...glyphs.map(this.glyphHeight));

		const horizontalAlignments = {
			left: 0,
			center: Math.floor(width / 2),
			right: width,
		};

		let cursor = x - horizontalAlignments[alignment[0]];

		for (const glyph of glyphs) {
			const [w] = this.glyph(cursor, y, glyph, color, ["left", alignment[1]]);

			cursor += w + this.KERNING;
		}

		return [width, height] as const;
	}

	box(
		x: number,
		y: number,
		lines: string[],
		color: string,
		alignment: [HorizontalAlignment, VerticalAlignment] = ["left", "top"],
	) {
		const strings = lines.map((line) => line.split("").map(getGlyphMatrix));

		const width = Math.max(
			...strings.map(
				(str) =>
					str.reduce((w, g) => w + this.glyphWidth(g), 0) +
					(str.length - 1) * this.KERNING,
			),
		);
		const height =
			strings.reduce((h, s) => h + Math.max(...s.map(this.glyphHeight)), 0) +
			(strings.length - 1) * this.LINE_SPACING;

		const verticalAlignments = {
			top: 0,
			center: Math.floor(height / 2),
			bottom: height,
		};

		let cursor = y - verticalAlignments[alignment[1]];

		for (const str of strings) {
			const [, h] = this.string(x, cursor, str, color, [alignment[0], "top"]);

			cursor += h + this.LINE_SPACING;
		}

		return [width, height] as const;
	}
}
