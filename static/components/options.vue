<template>
	<div class="form-group form-group-sm" v-show="metaJSON.globalOptions">
		<label>Global Options</label>
		<m-common-options :all-options="metaJSON.globalOptions" :is-command="false"></m-common-options>
		<hr>
	</div>
</template>
<script>
import store from 'store';
import CommonOptopn from './common-options.vue';
export default {
	name: 'GlobalOptions',
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON
		}
	},
	components: {
		'm-common-options': CommonOptopn
	}
};
</script>
