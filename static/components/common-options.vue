<template>
	<div>
		<button type="button" @click="addOption()" :disabled="disabled" class="btn btn-default btn-sm">新增参数</button>
		<div v-for="(index, optionItem) in currentOption" class="row">
			<div class="col-xs-3">
				<select class="form-control" v-model="optionItem.checked" @change="updateDesc($event)" :disabled="optionItem.disabled || disabled">
					<option v-for="(key, item) in allOptions" :value="key">{{key}}</option>
				</select>
			</div>
			<div class="col-xs-6">
				<input class="form-control" style="width: 100%;" type="text" :placeholder="optionItem.desc" v-model="optionItem.value" :disabled="optionItem.disabled || disabled">
			</div>
			<div class="col-xs-3">
				<button type="button" class="btn btn-danger btn-sm" @click="delOption(index)">删除</button>
				<button type="button" class="btn btn-primary btn-sm" @click="modifyOption(index)">修改</button>
				<button type="button" class="btn btn-success btn-sm" @click="applyOption(index)">确认</button>
			</div>
		</div>
	</div>
</template>
<style scoped>
.icon-aliicon {
	cursor: pointer;
}
.row {
	padding: 10px 0 5px;box-sizing: border-box;
}
</style>
<script>
import Vue from 'vue';

import store from 'store';
import actions from 'actions';

import Event from './event.vue';

export default {
	name: 'CommonOptions',
	data() {
		return {
			currentOption: []
		};
	},
	props: ['allOptions', 'isCommand', 'disabled'],
	ready() {
		Event.$on('applyAllOption', (isFromEvent) => {
			this.currentOption.forEach((item, index) => {
				this.applyOption(index, isFromEvent);
			})
		})
	},
	methods: {
		addOption() {
			if (this.currentOption.length >= Object.keys(this.allOptions).length) {
				actions.alert(store, {
					show: true,
					title: '提示',
					msg: '已达最大 Option 数',
					type: 'warning'
				})
				return;
			}
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
		applyOption(index, isFromEvent) {
			let tempcheck = {};
			for (let i = 0; i < this.currentOption.length; i++) {
				let item = this.currentOption[i];
				if (item.disabled) {
					tempcheck[item.checked] = true;
				}
			}
			if (tempcheck[this.currentOption[index].checked] && !isFromEvent) {
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
