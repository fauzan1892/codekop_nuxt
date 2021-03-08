<template>
  	<div class="home">
		<div class="background-profil" >
			<br />
			<br />
			<div class="container">
				<div class="row">
					<div class="col-sm-2 mx-auto">
						<img
						:src="base.gambar"
						alt="profil"
						class="rounded-circle"
						width="140"
						height="140"
						/>
					</div>
					<div class="col-sm-10" style="color:#fff;">
						<div class="clearfix" style="padding-top:0.5pc;"></div>
						<h3>{{ profil.nm_member }}</h3>
						<p>{{ profil.Deskripsi }}</p>
						<span v-for="i in sosmed" :key="i.id_sosmed">
						<a
							:href="i.link_sosmed"
							target="_blank"
							class="btn btn-success mr-2 btn-md text-white"
							:title="'profil ' + i.nm_sosmed + ''"
						>
							<i :class="'fa fa-' + i.nm_sosmed + ''"></i>
						</a>
						</span>
					</div>
				</div>
			</div>
			<br />
			<br />
		</div>
		<div class="container">
			<center>
				<h3>
				<b>{{ profil.nm_profil }}</b>
				</h3>
			</center>
			<div class="clearfix"></div>
			<br />
			<Artikel :url_berita="url_berita" />
		</div>
  	</div>
</template>

<script>
import axios from "axios";
import { URL_API } from "../../constants";
import Artikel from "../../components/Home/Artikel";
// @ is an alias to /src
export default {
	name: "profil",
	components: {
		Artikel,
	},
	data() {
		return {
			url_berita: "profil/" + this.$route.params.id + "?",
			profil: [],
			base: [],
			sosmed: []
		};
	},
	created() {
		this.getKategori();
	},
	methods: {
		getKategori(page) {
		axios
			.get(URL_API + "getprofil/" + this.$route.params.id)
			.then(response => {
			this.profil = response.data.profil;
			this.base = response.data.base;
			this.sosmed = response.data.sosmed;
				if (this.profil == null) {
					window.location = "/not_found";
				}
				//console.log(this.$route.params.pathMatch);
			})
			.catch(err => {
			console.log(err);
				window.location = "/not_found";
			});
		}
	},
	async asyncData({ route }) {
		return await axios
		.get(URL_API + "getmeta/profil/" + route.params.id)
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
