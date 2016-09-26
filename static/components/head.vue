<template>
	<h1>{{metaJSON.title}}</h1>
</template>
<style scoped>
h1 {
	font-size: 28px;
	padding: 10px 15px 0;
	line-height: 28px;
	margin: 0;
}	
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
