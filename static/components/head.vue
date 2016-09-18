<template>
	<h1>{{metaJSON.title}}</h1>
</template>
<style scoped>
	
</style>
<script>
import store from 'store';

export default {
	name: 'Head',
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON
		}
	}
};	
</script>
