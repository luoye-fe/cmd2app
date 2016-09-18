<template>
	<h1>Command</h1>
</template>
<style scoped>
	
</style>
<script>
import store from 'store';

export default {
	name: 'Command',
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON
		}
	}
};	
</script>
