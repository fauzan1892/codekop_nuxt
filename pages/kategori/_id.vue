<template>
	<div class="home">
		<div class="background-profil">
			<div class="container pt-5 pb-5 text-white">
				<center>
					<h2>
						<b>{{ kategori.nm_kategori }}</b>
					</h2>
				</center>
			</div>
		</div>
		<div class="clearfix mt-4"></div>
		<div class="container">
			<Artikel :url_berita="url_berita" />
		</div>
		<div class="clearfix mt-2"></div>
	</div>
</template>

<script>
import axios from "axios";
import { URL_API } from "../../constants";
import Artikel from "../../components/Home/Artikel";
// @ is an alias to /src
export default {
	name: "kategori",
	components: {
		Artikel,
	},
	data() {
		return {
			url_berita: "getkategori/" + this.$route.params.id + "?",
			kategori: []
		};
	},
	created() {
		this.getKategori();
	},
	methods: {
		getKategori() {
		axios
			.get(URL_API + "getkat_slug/" + this.$route.params.id)
			.then(response => {
			this.kategori = response.data.kategori;
				if (this.kategori == null) {
					window.location = "/not_found";
				}
				//console.log(this.$route.params.pathMatch);
			}).catch(err => {
			console.log(err);
				window.location = "/not_found";
			});
		}
	},
	async asyncData({ route }) {
		return await axios
		.get(URL_API + "getmeta/kategori/" + route.params.id)
		.then((res) => {
			return { infow: res.data }
		})
	},
	head() {
		return {
			title: this.infow.title_web,
			htmlAttrs: {
				lang: 'en'
			},
			meta: [
				{ hid:'description',name:'description', content: this.infow.meta_description },
				{ hid:'keyword', name:'keyword', content:this.infow.meta_keyword },
				{ hid:'author', name:'author', content:this.infow.meta_author},
				
				{ hid:'og:type', name:'og:type', content:this.infow.type_content},
				{ hid:'og:image', name:'og:image', content:this.infow.banner},
				{ hid:'og:title', name:'og:title', content:this.infow.title_web},
				{ hid:'og:description', name:'og:description', content:this.infow.meta_description},
				{ hid:'og:url', name:'og:url', content:this.infow.url_situs},
				{ hid:'og:site_name', name:'og:site_name', content:this.infow.title_web},

				{ hid:'twitter:image', name:'twitter:image', content:this.infow.banner},
				{ hid:'twitter:title', name:'twitter:title', content:this.infow.title_web},
				{ hid:'twitter:description', name:'twitter:description', content:this.infow.meta_description},
			],
			link: [
				{ hid:'icon', rel: 'icon', type: 'image/x-icon', href: this.infow.path_icon },
				{ hid:'canonical', rel: 'canonical', href: this.infow.url_situs },
			],
		}
	},
};
</script>
