<template>
	<h1>Options</h1>
	<m-common-options :all-options="metaJSON.globalOptions" :is-command="false" :disabled="false"></m-common-options>
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
