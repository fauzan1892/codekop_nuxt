<template>
	<div id="footer">
		<div class="clearfix"></div>
		<!-- FOOTER -->
		<div class="footer">
			<div class="container">
				<div class="row">
					<div class="col-sm-6 col-md-3">
						<h4>POPULAR POSTS</h4>
						<ul>
							<span v-for="art in populer" :key="art.id_berita">
								<li>
								<nuxt-link :to="'/read/' + art.slug_berita + '.html'">{{
									art.judul
								}}</nuxt-link>
								<p>
									<span style="color:yellow;"
									><small
										>{{ art.tgl_input }} &mdash; {{ art.counter }}x
										Lihat</small
									></span
									>
								</p>
								</li>
							</span>
						</ul>
					</div>
					<div class="col-sm-6 col-md-3">
						<h4>LABELS</h4>
						<span v-for="lb in label" :key="lb.id_tag">
							<nuxt-link
								:to="'/tags/' + lb.slug_tag + ''"
								class="btn btn-success text-white btn-sm mt-1 mr-1"
							>
								<b>{{ lb.nama_tag }}</b>
							</nuxt-link>
						</span>
					</div>

					<div class="col-sm-6 col-md-3">
						<h4>PAGE</h4>
						<ul>
							<span v-for="h in hal" :key="h.id_halaman">
								<li>
								<router-link :to="'/p/' + h.slug_hal + '.html'" no-prefetch>
									{{ h.judul }}
								</router-link>
								</li>
							</span>
							<li><a href="https://www.codekop.com/app/login">Sign In</a></li>
							<li>
								<a href="https://www.codekop.com/app/sitemap.xml">Site Map</a>
							</li>
						</ul>
					</div>
					<div class="col-sm-6 col-md-3">
						<h4>HUBUNGI KAMI</h4>
						<p>{{ infoweb.title }}</p>
						<p><strong>E-mail.</strong> {{ infoweb.email }}</p>
						<!-- <p> <strong>Almt.</strong> Uj Harapan Kav. Daruttaqwa RT 005/014 No. 047, Kel. Bahagia, Kec. Babelan, Kab. Bekasi</p>-->
						<!--<p><strong>WA.</strong> 089618173609</p>-->
						<!--<p></p>-->
						<strong>Facebook</strong> :
						<a href="https://www.facebook.com/codekop/"
						>https://www.facebook.com/codekop/</a
						>
					</div>
				</div>
			</div>
		</div>
		<!-- END FOOTER -->
		<!-- COPYRIGHT -->
		<div class="copyright">
			<p class="text-center">{{ infoweb.footer }}</p>
			<p class="text-center">
				Dibuat dengan <i class="fa fa-heart text-danger"></i> di Bekasi
				Indonesia
			</p>
		</div>
  	</div>
</template>
<script>
import axios from "axios";
import { URL_API } from "../../constants";
export default {
  name: "Footer",
  props: ["infoweb"],
  data() {
    return {
      populer: [],
      label: [],
      hal: []
    };
  },
  created() {
    this.getPopuler(), this.getLabel(), this.getHal();
  },
  methods: {
    getPopuler() {
      axios
        .get(URL_API + "getberita_type?limit=three&type=populer")
        .then(response => {
          this.populer = response.data.content;
          // console.log(response)
        })
        .catch(err => {
          console.log(err);
        });
    },
    getLabel() {
      axios
        .get(URL_API + "label")
        .then(response => {
          this.label = response.data.content;
          // console.log(response)
        })
        .catch(err => {
          console.log(err);
        });
    },
    getHal() {
      axios
        .get(URL_API + "gethal")
        .then(response => {
          this.hal = response.data.content;
          // console.log(response)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
