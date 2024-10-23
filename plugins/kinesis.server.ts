export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("kinesis", {
		getSSRProps() {
			return {};
		},
	});
});
