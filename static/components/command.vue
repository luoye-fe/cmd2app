<template>
	<div class="form-group form-group-sm">
		<label>Command</label>
		<div class="checked-command">
			<div class="row">
				<div class="col-xs-3">
					<select class="form-control" @change="selectCommand($event)" :disabled="disabled">
						<option value="null">无</option>
						<option v-for="(key, item) in metaJSON.command" :value="key">{{key}}</option>
					</select>
				</div>
			</div>
			<div class="flex-input">
				<input class="form-control" type="text" :disabled="disabled" v-for="(index, item) in currentCommand.params" :placeholder="item.desc" :value="item.value" @input="updateCommandParams($event, index)">
			</div>
			<div v-show="showAddOptionButton" class="form-group form-group-sm">
				<m-common-options :all-options="currentCommand.options" :is-command="true" :disabled="disabled"></m-common-options>
			</div>
			<div class="button-group">
				<button type="button" class="btn btn-primary btn-sm" @click="modifyCommand()">修改</button>
				<button type="button" class="btn btn-success btn-sm" @click="applyCommand()">确认</button>
			</div>
		</div>
	</div>
</template>
<style scoped>
.checked-command span {
	cursor: pointer;
}
.flex-input{
	padding: 10px 0;
	box-sizing: border-box;
}
.flex-input input {
	display: inline-block;vertical-align: middle;max-width: 200px;margin: 0 5px;
}
.flex-input input:nth-child(1){
	margin-left: 0;
}
.flex-input input:last-child{
	margin-right: 0;
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
				this.currentEntry = '';
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
				this.showAddOptionButton = !!(this.currentCommand.options);
			},
			deep: true
		}
	}
};
</script>
