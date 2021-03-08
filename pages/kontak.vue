<template>
	<div class="home">
		<div class="container">
			<center>
				<h3><b>- Kontak -</b></h3>
			</center>
			<div class="clearfix"></div>
			<br />
			<div class="row">
				<div class="col-sm-6">
					<div class="card mb-5" style="box-shadow: 0px 0px 15px #cdcdcd;">
						<div class="card-header bg-primary text-white">
						Facebook
						</div>
						<div class="card-body">
							<div class="table-responsive mx-auto">
								<div
									class="fb-page"
									style="min-width:100%;"
									data-href="https://www.facebook.com/codekop/"
									data-tabs="timeline"
									data-small-header="true"
									data-adapt-container-width="false"
									data-hide-cover="false"
									data-show-facepile="false">
									<blockquote
										cite="https://www.facebook.com/codekop/"
										class="fb-xfbml-parse-ignore"
									>
										<a href="https://www.facebook.com/codekop/">
										Codekop - Tempat Asik Belajar Koding</a
										>
									</blockquote>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="card mb-3" style="box-shadow: 0px 0px 15px #cdcdcd;">
						<div class="card-body">
							<b>Kontak Kami</b> <br />
							E-mail :
							<a href="mailto:fauzancodekop@gmail.com"
								>fauzancodekop@gmail.com</a
							>
							<br />
							Website : https://www.codekop.com/<br />
							<br />
							<b>Alamat :</b><br />
							Uj Harapan Kav. Daruttaqwa RT 005/014 No. 047, Kel. Bahagia, Kec.
							Babelan, Kab. Bekasi <br /><br />
						</div>
					</div>
					<div class="card mb-5" style="box-shadow: 0px 0px 15px #cdcdcd;">
						<div class="card-body" v-html="info.gme">
							<b>Google Maps</b> <br /><br />
							{{ info.gme }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
import { URL_API } from "../constants";
// @ is an alias to /src
export default {
    name: "kontak",
    data() {
        return {
        	info: []
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
            // console.log(response)
            }).catch(err => {
            	console.log(err);
            });
        }
    },
    async asyncData() {
        return await axios
        .get(URL_API + 'getmeta/kontak/null')
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
