<template>
	<h1>Client</h1>
</template>
<style scoped>
	
</style>
<script>
import store from 'store';

export default {
	name: 'Client',
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON
		}
	}
};	
</script>
