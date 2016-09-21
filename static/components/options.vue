<template>
	<h1>Options</h1>
	<button @click="addNewOptions()">新增参数</button>
	<div v-for="(optionIndex, optionItem) in optionsList">
		<select @change="updateOptionChecked(optionIndex, $event)">
			<option v-for="(index, item) in metaJSON.globalOptions" :value="item.key">{{item.key}}</option>
		</select>
		<input type="text" :placeholder="optionItem.desc" @input="updateOptionVal(optionIndex, $event)">
		<i class="iconfont icon-aliicon" @click="delOption(optionIndex)"></i>
	</div>
</template>
<style scoped>
.icon-aliicon {
	cursor: pointer;
}
</style>
<script>
import store from 'store';
import actions from 'actions';

export default {
	name: 'Options',
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON,
			optionsList: () => store.state.cmd.optionsList
		}
	},
	methods: {
		addNewOptions() {
			actions.addNewOption(store, {
				checkedOption: this.metaJSON.globalOptions[0].key,
				desc: this.metaJSON.globalOptions[0].desc,
				value: ''
			})
		},
		delOption(index) {
			actions.delOption(store, index);
		},
		updateOptionVal(index, e) {
			actions.updateOptionVal(store, index, e.target.value);
		},
		updateOptionChecked(index, e) {
			actions.updateOptionChecked(store, index, e.target.value);
		}
	}
};
</script>
