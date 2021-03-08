<template>
  	<div class="artikel">
		<div v-if="artikel == 'null'">
			<h4 class="pt-2 pb-2">" Tidak Ada Postingan "</h4>
		</div>
		<div v-else>
			<div class="row">
				<div class="col-sm-3" v-for="art in artikel" :key="art.id_berita">
					<div
						class="card mt-4"
						style="border-radius:10px;box-shadow: 0px 0px 15px #cdcdcd;min-height:380px;"
					>
						<nuxt-link
						:to="'/read/' + art.slug_berita + '.html'"
						class="text-card-home"
						>
							<span v-if="art.gambar == '0'">
								<img
								class="card-img-top"
								style="min-height:180px;border-radius:15px 15px 0px 0px;"
								:src="paginate.path_default"
								alt=""
								id="img-artikel"
								/>
							</span>
							<span v-else>
								<img
								class="card-img-top"
								style="min-height:180px;border-radius:10px 10px 0px 0px;"
								id="img-artikel"
								:src="paginate.path_img + '' + art.user + '/' + art.gambar"
								alt=""
								/>
							</span>
						</nuxt-link>
						<div class="card-body card-height">
							<h6 class="card-title" style="font-weight:550;height:82px;">
								<nuxt-link
								:to="'/read/' + art.slug_berita + '.html'"
								v-html="art.judul"
								class="text-card-home"
								>{{ art.judul }}</nuxt-link
								>
							</h6>
							<p style="color:#444;">
								<small>
								<i class="fa fa-calendar pr-1"></i>
								{{ getTanggal(art.tgl_input) }}
								</small>
							</p>
						</div>
						<div
						class="card-footer"
						style="background:#fff;border-radius:0px 0px 10px 10px;"
						>
							<div class="float-left">
								<span
								v-if="
									art.foto == 'default-user.png' ||
									art.foto == 'man101.png' ||
									art.foto == 'woman102.png'
								"
								>
									<img
										:src="paginate.path_default"
										alt="profil"
										class="rounded-circle"
										width="28"
										height="28"
									/>
								</span>
								<span v-else>
									<img
										:src="paginate.path_img + '' + art.user + '/' + art.foto"
										class="rounded-circle"
										width="28"
										height="28"
									/>
								</span>
							</div>
							<div class="float-left" style="padding-left:9px;padding-top:4px;">
								<nuxt-link :to="'/profil/' + art.user" class="aprofil">{{
								art.nm_member
								}}</nuxt-link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<br />
			<div class="clearfix"></div>
			<div v-if="paginate.pages == 1"></div>
			<div v-else>
				<nav aria-label="Page navigation">
					<div class="d-flex justify-content-center">
						<ul class="pagination mx-auto">
							<span v-if="paginate.pageNumber == 1">
								<li class="page-item active">
								<a
									class="page-link"
									href="javascript:void(0)"
									v-on:click="getArtikel(1)"
								>
									First
								</a>
								</li>
							</span>
							<span v-else>
								<li class="page-item">
								<a
									class="page-link"
									href="javascript:void(0)"
									v-on:click="getArtikel(1)"
								>
									First
								</a>
								</li>
							</span>
							<li class="page-item">
								<a
								class="page-link"
								href="javascript:void(0)"
								aria-label="Previous"
								v-on:click="decrement(paginate.pageNumber)"
								>
								<span aria-hidden="true">&laquo;</span>
								<span class="sr-only">Previous</span>
								</a>
							</li>
							<span v-for="paging in paginate.paging" :key="paging">
								<span v-if="paginate.pageNumber == paging">
									<li class="page-item active">
										<a
										class="page-link"
										v-on:click="getArtikel(paging)"
										href="javascript:void(0)"
										>{{ paging }}</a
										>
									</li>
								</span>
								<span v-else>
									<li class="page-item">
										<a
										class="page-link"
										v-on:click="getArtikel(paging)"
										href="javascript:void(0)"
										>{{ paging }}</a
										>
									</li>
								</span>
							</span>
							<li class="page-item">
								<span v-if="paginate.pageNumber == paginate.pages">
									<a
										class="page-link"
										href="javascript:void(0)"
										aria-label="Next"
									>
										<span aria-hidden="true">&raquo;</span>
										<span class="sr-only">Next</span>
									</a>
								</span>
								<span v-else>
									<a
										class="page-link"
										href="javascript:void(0)"
										v-on:click="increment(paginate.pageNumber)"
										aria-label="Next"
									>
										<span aria-hidden="true">&raquo;</span>
										<span class="sr-only">Next</span>
									</a>
								</span>
							</li>
							<span v-if="paginate.pageNumber == paginate.pages">
								<li class="page-item active">
									<a
										class="page-link active"
										href="javascript:void(0)"
										v-on:click="getArtikel(paginate.pages)"
									>
										Last
									</a>
								</li>
							</span>
							<span v-else>
								<li class="page-item">
									<a
										class="page-link active"
										href="javascript:void(0)"
										v-on:click="getArtikel(paginate.pages)"
									>
										Last
									</a>
								</li>
							</span>
						</ul>
					</div>
				</nav>
			</div>
		</div>
		<br />
		<div class="clearfix"></div>
  	</div>
</template>

<script>
import axios from "axios";
import { URL_API } from "../../constants";
export default {
  name: "home",
  props: ["url_berita"],
  data() {
    return {
      artikel: [],
      paginate: [],
      count: 1
    };
  },
  created() {
    this.getArtikel();
  },
  methods: {
    getArtikel(page = 1) {
      axios
        .get(URL_API + this.url_berita + "page=" + page)
        .then(response => {
          this.artikel = response.data.content;
          this.paginate = response.data.paginate;
          this.count = page;
          //console.log(response.data.content)
        })
        .catch(err => {
          console.log(err);
        });
    },
    increment(page) {
      page++;
      this.getArtikel(page);
      //console.log(page);
      this.count = page;
    },
    decrement(page) {
      if (page > 0) {
        page--;
        this.getArtikel(page);
        this.count = page;
      }
    },
    getTanggal(tgl) {
      return tgl;
    }
  }
};
</script>
