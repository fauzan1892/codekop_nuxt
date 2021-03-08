<template>
	<div class="home">
		<div class="container">
			<Intro />
			<div class="row  scroll-animations">
				<div class="col-sm-4"><hr /></div>
				<div class="col-sm-4">
					<center>
						<h3><b>ARTIKEL TERBARU</b></h3>
					</center>
				</div>
				<div class="col-sm-4"><hr /></div>
			</div>
			<div class="clearfix"></div>
			<br />
			<Artikel :url_berita="url_berita" />
		</div>
	</div>
</template>

<script>
import Intro from "../components/Home/Intro";
import Artikel from "../components/Home/Artikel";
import axios from "axios";
import { URL_API } from "../constants";
// @ is an alias to /src
export default {
	name: "home",
	components: {
		Intro,
		Artikel,
	},
	data() {
		return {
			url_berita: "getberita?",
		};
	},
	async asyncData() {
		return await axios
		.get(URL_API + 'getmeta')
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
