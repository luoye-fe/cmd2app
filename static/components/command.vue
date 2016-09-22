<template>
	<h1>Command</h1>
	<div class="checked-command">
		<select @change="selectCommand($event)" :disabled="disabled">
			<option value="null">无</option>
			<option v-for="(key, item) in metaJSON.command" :value="key">{{key}}</option>
		</select>
		<!-- <input type="text" v-for="(index, item) in command.params" :placeholder="item.desc" :value="item.value" @input="updateCommandParam(index, $event)"> -->
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
import store from 'store';
import actions from 'actions';

import { copyObj } from 'utils/common.js';

import CommonOptopn from './common-options.vue';

export default {
	name: 'Command',
	data() {
		return {
			showAddOptionButton: false,
			currentCommand: {},
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
				this.currentCommand = this.metaJSON.command[value];
			}
		},
		modifyCommand() {
			this.disabled = false;
		},
		applyCommand() {
			this.disabled = true;
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
