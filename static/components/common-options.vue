<template>
	<div>
		<button type="button" @click="addOption()" class="btn btn-default btn-sm">新增参数</button>
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
			</div>
		</div>
	</div>
</template>
<script>
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
	props: ['allOptions', 'isCommand'],
	ready() {
		Event.$on('i-will-recive-all', () => {
			if (this.isCommand) {
				Event.$emit('send-command-options', this.currentOption);
			} else {
				Event.$emit('send-global-options', this.currentOption);
			}
		});
		Event.$on('modify-command', (obj) => {
			if (this.isCommand) {
				this.currentOption = obj.commandOptions;
			} else {
				this.currentOption = obj.globalOptions;
			}
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
			this.currentOption.splice(index, 1);
		}
	}
};
</script>
<style scoped>
.icon-aliicon {
	cursor: pointer;
}
.row {
	padding: 10px 0 5px;box-sizing: border-box;
}
</style>
