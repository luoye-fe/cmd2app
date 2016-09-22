<template>
	<h1>Command</h1>
	<div class="checked-command">
		<select @change="selectCommand($event)" :disabled="disabled">
			<option value="null">无</option>
			<option v-for="(key, item) in metaJSON.command" :value="key">{{key}}</option>
		</select>
		<input type="text" :disabled="disabled" v-for="(index, item) in currentCommand.params" :placeholder="item.desc" :value="item.value" @input="updateCommandParams($event, index)">
		<div v-show="showAddOptionButton">
			<m-common-options :all-options="currentCommand.options" :is-command="true" :disabled="disabled"></m-common-options>
		</div>
		<div>
			<button @click="modifyCommand()">修改</button>
			<button @click="applyCommand()">确认</button>
		</div>
	</div>
</template>
<style scoped>
.checked-command span {
	cursor: pointer;
}
</style>
<script>
import Vue from 'vue';

import store from 'store';
import actions from 'actions';

import { copyObj } from 'utils/common.js';

import CommonOptopn from './common-options.vue';

import Event from './event.vue';

export default {
	name: 'Command',
	data() {
		return {
			showAddOptionButton: false,
			currentCommand: {},
			currentEntry: '',
			disabled: false
		};
	},
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON
		}
	},
	components: {
		'm-common-options': CommonOptopn
	},
	methods: {
		selectCommand(e) {
			let value = e.target.value;
			if (value === 'null') {
				this.currentCommand = {};
			} else {
				this.currentEntry = value;
				this.currentCommand = copyObj(this.metaJSON.command[value]);
			}
		},
		updateCommandParams(e, index) {
			Vue.set(this.currentCommand.params[index], 'value', e.target.value);
		},
		modifyCommand() {
			this.disabled = false;
			actions.addCommand(store, {})
		},
		applyCommand() {
			this.disabled = true;
			actions.addCommand(store, {
				key: this.currentEntry,
				params: this.currentCommand.params,
				options: {}
			})
			Event.$emit('applyAllOption', true);
		}
	},
	watch: {
		'currentCommand': {
			handler() {
				this.showAddOptionButton = !!Object.keys(this.currentCommand.options);
			},
			deep: true
		}
	}
};
</script>
