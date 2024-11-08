import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { JSDOM } from "jsdom";

const ICON_SOURCE = join(process.cwd(), "assets", "icons");

const icons = readdirSync(ICON_SOURCE).map((f) => f.split(".svg")[0]);

const toCamelCase = (s) =>
	s
		.split("-")
		.map((s) => {
			const [first, ...others] = s.split("");
			return `${first.toUpperCase()}${others.join("")}`;
		})
		.join("");

const iconImport = (icon) =>
	`import ${toCamelCase(icon)} from '~/assets/icons/${icon}.svg?component'`;

const iconMap = (icon) => `  '${icon}': ${toCamelCase(icon)}`;

const rules = [
	{
		search:
			/\/\/\s<%\sBEGIN_ICON_IMPORT\s%>(?:.|\n)*\/\/\s<%\sEND_ICON_IMPORT\s%>/,
		replace: `// <% BEGIN_ICON_IMPORT %>\n${icons
			.map(iconImport)
			.join("\n")}\n// <% END_ICON_IMPORT %>`,
	},
	{
		search: /\/\/\s<%\sBEGIN_ICON_MAP\s%>(?:.|\n)*\/\/\s<%\sEND_ICON_MAP\s%>/,
		replace: `// <% BEGIN_ICON_MAP %>\n${icons
			.map(iconMap)
			.join(",\n")}\n  // <% END_ICON_MAP %>`,
	},
];

const iconComponentPath = join(process.cwd(), "components", "Icon.vue");

let iconTsx = readFileSync(iconComponentPath).toString("utf-8");

for (const { search, replace } of rules) {
	iconTsx = iconTsx.replace(search, replace);
}

writeFileSync(iconComponentPath, iconTsx);

for (const iconFile of icons) {
	const iconPath = join(ICON_SOURCE, `${iconFile}.svg`);
	const icon = new JSDOM(
		readFileSync(iconPath).toString("utf-8"),
	).window.document.querySelector("svg");

	if (!icon) throw new Error(`No svg element found for ${iconFile}`);

	const width = icon.getAttribute("width");
	const height = icon.getAttribute("height");

	if (width && height) {
		const viewBox = icon.getAttribute("viewBox") ?? `0 0 ${width} ${height}`;
		icon.setAttribute("viewBox", viewBox);
		icon.removeAttribute("width");
		icon.removeAttribute("height");
	}

	for (const el of icon.querySelectorAll("*")) {
		if (
			["#000", "black", "currentColor"].includes(el.style.stroke) ||
			["#000", "black", "currentColor"].includes(el.getAttribute("stroke"))
		)
			el.style.stroke = "currentColor";
		else el.style.fill = "currentColor";

		el.removeAttribute("stroke");
		el.removeAttribute("fill");
	}

	writeFileSync(iconPath, icon.outerHTML);
}

console.log(`✔  Processed ${icons.length} icons`);
