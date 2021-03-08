<template>
	<div class="home">
		<div class="background-profil">
		<div class="container pt-5 pb-5 text-white">
			<h3 class="text-center">
				<b v-html="artikel.judul">{{ artikel.judul }}</b>
			</h3>
			<div class="clearfix mb-4"></div>
			<p class="text-center">
				<i class="fa fa-user-circle"></i> {{ artikel.nm_member }}
				<span class="pl-1 pr-2">|</span>
				<i class="fa fa-calendar"></i> {{ paginate.tgl_insert }}
				<span class="pl-1 pr-2">|</span>
				<i class="fa fa-eye"></i> {{ artikel.counter }}x
			</p>
			<div id="share-buttons">
				<span class="text-home mt-1"><b>SHARE POST : </b></span>
					<!-- Facebook -->
					<a :href="'http://www.facebook.com/sharer.php?u=' +
							base_url +
							'read/' +
							artikel.slug_berita +
							'.html'" target="_blank">
						<img
							src="https://simplesharebuttons.com/images/somacro/facebook.png"
							alt="Facebook"
						/>
					</a>
					<!-- LinkedIn -->
					<a :href="'http://www.linkedin.com/shareArticle?mini=true&amp;url=' +
							base_url +
							'read/' +
							artikel.slug_berita +
							'.html'" target="_blank">
						<img
							src="https://simplesharebuttons.com/images/somacro/linkedin.png"
							alt="LinkedIn"
						/>
					</a>
					<!-- Twitter -->
					<a :href="'https://twitter.com/share?url=' +
							base_url +
							'read/' +
							artikel.slug_berita +
							'.html'" target="_blank" >
						<img
							src="https://simplesharebuttons.com/images/somacro/twitter.png"
							alt="Twitter"
						/>
					</a>
					<!-- VK -->
					<a :href="'http://vkontakte.ru/share.php?url=' +
							base_url +
							'read/' +
							artikel.slug_berita +
							'.html'" target="_blank" >
						<img
							src="https://simplesharebuttons.com/images/somacro/vk.png"
							alt="VK"
						/>
					</a>
					<!-- Print -->
					<a href="javascript:;" onclick="window.print()">
						<img
							src="https://simplesharebuttons.com/images/somacro/print.png"
							alt="Print"
						/>
					</a>
        		</div>
      		</div>
    	</div>
    	<div class="clearfix mt-5"></div>
		<div class="container mb-5">
			<div class="row">
				<div class="col-sm-8 mx-auto">
				<span v-if="artikel.gambar == '0'">
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
					:src="
						paginate.path_img + '' + artikel.u_login + '/' + artikel.gambar
					"
					alt=""
					/>
				</span>
				<div class="clearfix"></div>
				<br />
				<span v-for="tg in (artikel.tag || '').split(',')" :key="tg">
					<span class="btn btn-success text-white btn-sm mt-1 mr-1">
						<b>{{ tg }}</b>
					</span>
				</span>
				<hr />
				<p v-html="artikel.isi" style="font-size:12pt;">{{ artikel.isi }}</p>
				<div class="clearfix"></div>
					<div class="komentar">
						<hr />
						<h5><b> Komentar</b></h5>
						<span v-if="info.AktifKomentar == 'Aktifkan'">
							<span v-if="artikel.PostKomentar == 'Y'">
								<disqus
								shortname="codekop"
								:identifier="artikel.slug_berita + '.html'"
								:url="base_url + 'read/'"
								></disqus>
							</span>
							<span v-else>
								<h5>Komentar Dimatikan</h5>
							</span>
						</span>
						<span v-else>
							<h5>Komentar Dimatikan</h5>
						</span>
						<hr />
					</div>
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
			artikel: [],
			paginate: [],
			info: [],
			disqus: [],
			base_url: BASE_URL
		};
	},
	created() {
		this.getBerita(), this.getInfo(), this.getDisqus();
	},
	methods: {
		getBerita() {
		axios.get(URL_API + "getberitaid/" + this.$route.params.id)
			.then(response => {
			this.paginate = response.data.paginate;
			this.artikel = response.data.content;
			if (this.artikel == null) {
				window.location = "/not_found";
			}
			// console.log(response)
			}).catch(err => {
				console.log(err);
				window.location = "/not_found";
			});
		},
		getInfo() {
		axios.get(URL_API + "info")
			.then(response => {
				this.info = response.data.content;
				this.base = response.data.base;
				// console.log(response)
			})
			.catch(err => {
				console.log(err);
			});
		},
		getDisqus() {
		axios
			.get(URL_API + "disqus")
			.then(response => {
			this.disqus = response.data.content;
			// console.log(response)
			}).catch(err => {
				console.log(err);
			});
		}
	},
	async asyncData({ route }) {
		return await axios
		.get(URL_API + "getmeta/read/" + route.params.id)
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
