<template>
  	<div id="navbar">
		<nav class="navbar navbar-expand-lg navbar-custom">
			<a class="navbar-brand" href="/">
				<img :src="baseweb.path_logo + '' + infoweb.hdr_gambar" class="brand" />
			</a>
			<b-navbar-toggle target="nav-collapse"><i class="fa fa-bars text-white"></i></b-navbar-toggle>
			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="mr-auto">
					<li class="nav-item active">
						<nuxt-link class="nav-link" to="/"> <b>Home</b></nuxt-link>
					</li>
					<span v-for="kategories in kategori" :key="kategories.id_kategori">
						<span v-if="kategories.ket_kat == 'Menu Utama'">
						<li class="nav-item">
							<div v-if="kategories.url_kategori != ''">
							<a class="nav-link" :href="kategories.url_kategori">
								<b>{{ kategories.nm_kategori }}</b>
							</a>
							</div>
							<div v-else>
							<nuxt-link
								class="nav-link"
								:to="'/kategori/' + kategories.slug_kat"
							>
								<b>{{ kategories.nm_kategori }}</b>
							</nuxt-link>
							</div>
						</li>
						</span>
						<span v-else>
						<b-nav-item-dropdown class="nav-item dropdown" style="font-weight:700;" 
						:text="kategories.nm_kategori">
							<nav-sub :input-kode="kategories.id_kategori" />
						</b-nav-item-dropdown>
						</span>
					</span>
					<li class="nav-item active">
						<a class="nav-link" href="/kontak">
						<b>Kontak</b>
						</a>
					</li>
				</b-navbar-nav>
				<form
				class="form-inline my-2 my-lg-0  ml-auto"
				method="GET"
				action="/cari"
				>
					<input
						class="form-control mr-sm-2"
						type="search"
						placeholder="Cari Tutorial Disini :"
						name="keyword"
						aria-label="Search"
					/>
					<button class="btn btn-success my-2 my-sm-0" type="submit">
						<b><i class="fa fa-search"></i> Cari</b>
					</button>
				</form>
			</b-collapse>
		</nav>
	</div>
</template>
<script>
import axios from "axios";
import { URL_API } from "../../constants";
import NavSub from "./NavSub";
export default {
	name: "Navigation",
	components: {
		NavSub
	},
	props: ["infoweb", "baseweb"],
	data() {
		return {
		kategori: []
		};
	},
	created() {
		this.getKategori();
	},
	methods: {
		getKategori() {
		axios
			.get(URL_API + "getkat")
			.then(response => {
				this.kategori = response.data.kategori;
				// console.log(response)
			})
			.catch(err => {
				console.log(err);
			});
		}
	},
	mounted(){
		window.fbAsyncInit = function() {
		FB.init({
			appId      : '386688428787299',
			xfbml      : true,
			version    : 'v3.2'
		});
			FB.AppEvents.logPageView();
		};

		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "https://connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}
};
</script>
