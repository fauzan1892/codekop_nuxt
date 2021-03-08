<template>
	<div class="sub-nav">
		<span v-for="subs in subkat" :key="subs.id_subkat">
			<nuxt-link class="dropdown-item" :to="'/subkat/' + subs.slug_subkat">
				<b>{{ subs.nm_subkat }}</b>
			</nuxt-link>
		</span>
	</div>
</template>

<script>
import axios from "axios";
import { URL_API } from "../../constants";
export default {
	props: {
		inputKode: {
		required: true
		}
	},
	data() {
		return {
		subkat: []
		};
	},
	created() {
		this.getSubkat();
	},
	methods: {
		getSubkat() {
		axios
			.get(URL_API + "getsub/" + this.inputKode)
			.then(response => {
				this.subkat = response.data.subkat;
				// console.log(response)
			})
			.catch(err => {
				console.log(err);
			});
		}
	}
};
</script>
