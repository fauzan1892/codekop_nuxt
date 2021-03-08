<template>
	<div class="home">
		<div class="background-profil">
			<div class="container pt-5 pb-5 text-white">
				<center>
					<h2>
						<b><i class="fa fa-search"></i> {{ this.$route.query.keyword }}</b>
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
	name: "cari",
	components: {
		Artikel,
	},
	data() {
		return {
			url_berita: "cari?keyword=" + this.$route.query.keyword + "&"
		};
	},
	created() {
		// tidak ada aksi
	},
	methods: {
		// tidak ada aksi
	},
	async asyncData({ route }) {
		return await axios
		.get(URL_API + "getmeta/cari/" + route.query.keyword)
		.then((res) => {
			return { info: res.data }
		})
	},
	head() {
		return {
			title: this.info.title_web,
			htmlAttrs: {
				lang: 'en'
			},
			meta: [
				{ hid:'description',name:'description', content: this.info.meta_description },
				{ hid:'keyword', name:'keyword', content:this.info.meta_keyword },
				{ hid:'author', name:'author', content:this.info.meta_author},
				
				{ hid:'og:type', name:'og:type', content:this.info.type_content},
				{ hid:'og:image', name:'og:image', content:this.info.banner},
				{ hid:'og:title', name:'og:title', content:this.info.title_web},
				{ hid:'og:description', name:'og:description', content:this.info.meta_description},
				{ hid:'og:url', name:'og:url', content:this.info.url_situs},
				{ hid:'og:site_name', name:'og:site_name', content:this.info.title_web},

				{ hid:'twitter:image', name:'twitter:image', content:this.info.banner},
				{ hid:'twitter:title', name:'twitter:title', content:this.info.title_web},
				{ hid:'twitter:description', name:'twitter:description', content:this.info.meta_description},
			],
			link: [
				{ hid:'icon', rel: 'icon', type: 'image/x-icon', href: this.info.path_icon },
				{ hid:'canonical', rel: 'canonical', href: this.info.url_situs },
			],
		}
	},
};
</script>
