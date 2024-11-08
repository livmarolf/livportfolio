import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: [
		"@nuxtjs/google-fonts",
		"@nuxt/image",
		"v-wave/nuxt",
		"@vueuse/nuxt",
	],
	vWave: {
		color: "var(--accent, currentColor)",
		initialOpacity: 0,
	},
	googleFonts: {
		families: {
			Sora: true,
		},
	},
	vite: {
		plugins: [svgLoader()],
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "~/assets/styles/global.scss";',
					api: "modern-compiler", // or "modern"
				},
			},
		},
	},
});
