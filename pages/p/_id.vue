<template>
	<div class="home">
		<div class="background-profil">
			<div class="container pt-5 pb-5 text-white">
				<h3 class="text-center">
					<b v-html="page.judul">{{ page.judul }}</b>
				</h3>
				<div class="clearfix mb-4"></div>
				<p class="text-center">
					<i class="fa fa-calendar"></i> {{ paginate.tgl_insert }}
				</p>
			</div>
		</div>
		<div class="clearfix mt-5"></div>
		<div class="container mb-5">
			<div class="row">
				<div class="col-sm-8 mx-auto">
					<span v-if="page.gambar == '0'">
						<img
						class="img-fluid"
						style="border-radius:15px;width:100%;"
						:src="paginate.path_default"
						alt=""
						/>
					</span>
					<span v-else>
						<img
						class="img-fluid"
						style="border-radius:15px;width:100%;"
						:src="paginate.path_img + '' + page.u_login + '/' + page.gambar"
						alt=""
						/>
					</span>
					<div class="clearfix"></div>
					<br />
					<p v-html="page.isi" style="font-size:12pt;">{{ page.isi }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { URL_API, BASE_URL } from "../../constants";
// @ is an alias to /src
export default {
	name: "read",
		components: {
	},
	data() {
		return {
			page: [],
			paginate: [],
			base_url: BASE_URL
		};
	},
	created() {
		this.getBerita();
	},
	methods: {
		getBerita() {
			axios
				.get(URL_API + "getpageid/" + this.$route.params.id)
				.then(response => {
				this.paginate = response.data.paginate;
				this.page = response.data.content;
				if (this.page == null) {
					window.location = "/not_found";
				}
				// console.log(response)
				})
				.catch(err => {
					console.log(err);
					window.location = "/not_found";
				});
			}
	},
	mounted() {
		Prism.highlightAll();
	},
	async asyncData({ route }) {
		return await axios
		.get(URL_API + "getmeta/page/" + route.params.id)
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
