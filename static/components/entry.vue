<template>
	<div class="form-group form-group-sm">
		<label>Entry</label>
		<select @change="updateEntry($event)" class="form-control">
			<option v-for="(key, value) in metaJSON.bin" :value="key">{{key}}</option>
		</select>
		<hr>
	</div>
</template>
<style scoped>
</style>
<script>
import store from 'store';
import actions from 'actions';

export default {
	name: 'Entry',
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON,
			entry: () => store.state.cmd.entry
		}
	},
	ready() {
		actions.updateEntry(store, Object.keys(this.metaJSON.bin)[0]);
	},
	methods: {
		updateEntry(e) {
			actions.updateEntry(store, e.target.value);
		}
	}
};
</script>
