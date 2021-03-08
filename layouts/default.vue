<template>
	<div id="app">
		<Navigation :infoweb="info" :baseweb="base" :key="$route.fullPath" />
		<div class="clearfix"></div>
		<div style="margin-top:2.7pc;"></div>
		<transition name="fade" mode="out-in">
			<router-view :key="$route.fullPath" />
		</transition>
		<Footer :infoweb="info" />
	</div>
</template>
<script>
import axios from "axios";
import { URL_API } from "../constants";
import Navigation from "../components/Menu/Navigation";
import Footer from "../components/Home/Footer";

export default {
	scrollToTop: true,
	components: {
		Navigation,
		Footer
	},
	data() {
		return {
		info: [],
		base: []
		};
	},
	created() {
		this.getInfo();
	},
	methods: {
		getInfo() {
		axios
			.get(URL_API + "info")
			.then(response => {
			this.info = response.data.content;
			this.base = response.data.base;
			// console.log(response)
			})
			.catch(err => {
			console.log(err);
			});
		}
	}
};
</script>
<style scoped>
	#app {
		font-family: 'Quicksand', sans-serif;
	}
	.img-responsive {
		width: 100%;
	}
</style>
