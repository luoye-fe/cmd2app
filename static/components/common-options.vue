<template>
	<button @click="addOption()" :disabled="disabled">新增参数</button>
	<div v-for="(index, optionItem) in currentOption">
		<select v-model="optionItem.checked" @change="updateDesc($event)" :disabled="optionItem.disabled">
			<option v-for="(key, item) in allOptions" :value="key">{{key}}</option>
		</select>
		<input type="text" :placeholder="optionItem.desc" v-model="optionItem.value" :disabled="optionItem.disabled">
		<i class="iconfont icon-aliicon" @click="delOption(index)"></i>
		<button @click="modifyOption(index)">修改</button>
		<button @click="applyOption(index)">确认</button>
	</div>
</template>
<style scoped>
.icon-aliicon {
	cursor: pointer;
}
</style>
<script>
import Vue from 'vue';

import store from 'store';
import actions from 'actions';

export default {
	name: 'CommonOptions',
	data() {
		return {
			currentOption: []
		};
	},
	props: ['allOptions', 'isCommand', 'disabled'],
	methods: {
		addOption() {
			this.currentOption.push({
				checked: Object.keys(this.allOptions)[0],
				value: '',
				desc: this.allOptions[Object.keys(this.allOptions)[0]].desc,
				disabled: false
			})
		},
		updateDesc(e) {
			this.currentOption.forEach((item) => {
				if (item.checked === e.target.value) {
					item.desc = this.allOptions[e.target.value].desc;
				}
			})
		},
		delOption(index) {
			actions.delOption(store, this.currentOption[index].checked, this.isCommand);
			this.currentOption.splice(index, 1);
		},
		modifyOption(index) {
			this.currentOption[index].disabled = false;
		},
		applyOption(index) {
			let tempcheck = {};
			for (let i = 0; i < this.currentOption.length; i++) {
				let item = this.currentOption[i];
				if (item.disabled) {
					tempcheck[item.checked] = true;
				}
			}
			if (tempcheck[this.currentOption[index].checked]) {
				actions.alert(store, {
					show: true,
					title: '提示',
					msg: '参数已存在',
					type: 'danger'
				})
				return;
			}
			this.currentOption[index].disabled = true;
			let cur = {};
			this.currentOption.forEach((item) => {
				if (item.disabled) {
					cur[item.checked] = {
						value: item.value
					}
				}
			})
			actions.addNewOption(store, cur, this.isCommand);
		}
	}
};
</script>
