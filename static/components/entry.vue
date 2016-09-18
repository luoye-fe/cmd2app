<template>
	<h1>Entry</h1>
	<select>
		<option v-for="(key, value) in metaJSON.bin" :value="value">{{key}}</option>
	</select>
</template>
<style scoped>
	
</style>
<script>
import store from 'store';

export default {
	name: 'Entry',
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON
		}
	}
};	
</script>
