export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Codekop',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content:'width=device-width, initial-scale=1' },
			{ hid:'description',name:'description', content:'' },
			{ hid:'keyword', name:'keyword', content:'' },
			{ hid:'author', name:'author', content:''},
			
			{ hid:'og:type', name:'og:type', content:''},
			{ hid:'og:image', name:'og:image', content:''},
			{ hid:'og:title', name:'og:title', content:''},
			{ hid:'og:description', name:'og:description', content:''},
			{ hid:'og:url', name:'og:url', content:''},
			{ hid:'og:site_name', name:'og:site_name', content:''},

			{ hid:'twitter:image', name:'twitter:image', content:''},
			{ hid:'twitter:title', name:'twitter:title', content:''},
			{ hid:'twitter:description', name:'twitter:description', content:''},
		],
		link: [
			{ hid:'icon', rel: 'icon', type: 'image/x-icon', href : '/favicon.png?v=3' },
			{ hid:'canonical', rel: 'canonical', href: '/' },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css?family=Quicksand:400,500,600,700'
			}
		],
	},

  	// Global CSS: https://go.nuxtjs.dev/config-css
  	css: [
		//'@/assets/css/bootstrap.min.css',
		'@/assets/css/main.css',
		'@/assets/css/font-awesome.min.css',
		'@/assets/css/prism-dark.css',
		'@/assets/css/responsive.css'
  	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/vue-prism.js',
		'~/plugins/vue-disqus.js',
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/bootstrap
		'bootstrap-vue/nuxt',
	],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		transpile: ['vue-prism','vue-disqus']
	},
	script: [
		{
			src: "@/assets/js/prism.js",
			type: "text/javascript"
		},
	],
	loading: '~/components/loading.vue',
	router: {
		scrollBehavior () { 
			document.getElementById('app').scrollIntoView();
		},
	},
	hooks: {
		'generate:page': page => {
			page.html = page.html.replace(/ data-n-head=".*?"/gi, '').replace(/ data-hid=".*?"/gi, '')
		},
	},
}
