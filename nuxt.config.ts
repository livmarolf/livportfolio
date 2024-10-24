// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: ["@nuxtjs/google-fonts", "@nuxt/image", "nuxt-icons", "v-wave/nuxt"],
	googleFonts: {
		families: {
			Sora: true,
		},
	},
	vWave: {
		color: "#000",
		initialOpacity: 0.5,
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "~/assets/styles/global.scss";',
				},
			},
		},
	},
});
