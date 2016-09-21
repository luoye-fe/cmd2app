<template>
	<h1>Command</h1>
	<button @click="addCommand(),showCommand = true">新增命令</button>
	<div class="checked-command" v-show="showCommand">
		<select @change="addCommand($event)">
			<option v-for="(index, item) in metaJSON.command" :value="item.key">{{item.key}}</option>
		</select>
		<input type="text" v-for="(index, item) in command.params" :placeholder="item.desc" :value="item.value" @input="updateCommandParam(index, $event)">
		<button>新增命令参数</button>
		<div v-for="(index, item) in command.options">
			<!-- <select @change="updateCommandOption($event)">
				<option value="null">无</option>
				<option v-for="(index, item) in command.options" :value="item.key">{{item.key}}</option>
			</select>
			<input type="text" :placeholder="checkedCommandOptionDesc" v-show="showCommandOption" @input="updateCommandOptionVal($event)"> -->
		</div>
		<span @click="delCommand">删除</span>
		<p>{{{command.desc}}}</p>
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

export default {
	name: 'Command',
	data() {
		return {
			showCommand: false,
			showCommandOption: false,
			checkedCommandOptionIndex: 0,
			checkedCommandOptionDesc: ''
		};
	},
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON,
			command: () => store.state.cmd.command
		}
	},
	methods: {
		addCommand(e) {
			if (!e) {
				actions.addCommand(store, copyObj(this.metaJSON.command[0]));
				return;
			}
			this.metaJSON.command.forEach((item) => {
				if (item.key === e.target.value) {
					actions.addCommand(store, copyObj(item));
				}
			})
		},
		delCommand() {
			actions.delCommand(store);
			this.showCommand = false;
		},
		updateCommandParam(index, e) {
			actions.updateCommandParam(store, index, e.target.value);
		},
		updateCommandOption(e) {
			actions.updateCommandOption(store, e.target.value);
			if (e.target.value === 'null') {
				this.showCommandOption = false;
			} else {
				this.showCommandOption = true;
			}
			this.getCheckedCommandOptionIndex(e.target.value);
		},
		getCheckedCommandOptionIndex(target) {
			this.command.options.forEach((item, index) => {
				if (item.key === target) {
					this.checkedCommandOptionIndex = index;
					this.checkedCommandOptionDesc = item.desc;
				}
			})
		},
		updateCommandOptionVal(e) {
			actions.updateCommandOptionVal(store, e.target.value);
		}
	}
};
</script>
