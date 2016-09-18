<template>
	<h1>Options</h1>
</template>
<style scoped>
	
</style>
<script>
import store from 'store';

export default {
	name: 'Options',
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON
		}
	}
};	
</script>
