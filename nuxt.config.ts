// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: ["@nuxtjs/google-fonts", "@nuxt/image", "nuxt-icons"],
	googleFonts: {
		families: {
			Sora: true,
		},
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
