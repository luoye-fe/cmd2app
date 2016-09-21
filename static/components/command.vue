<template>
	<h1>Command</h1>
	<button @click="addCommand(),showCommand = true">新增命令</button>
	<div class="checked-command" v-show="showCommand">
		<select @change="addCommand($event)">
			<option v-for="(index, item) in metaJSON.command" :value="item.key">{{item.key}}</option>
		</select>
		<span @click="delCommand">删除</span>
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

export default {
	name: 'Command',
	data() {
		return {
			showCommand: false
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
				actions.addCommand(store, this.metaJSON.command[0]);
				return;
			}
			this.metaJSON.command.forEach((item) => {
				if (item.key === e.target.value) {
					actions.addCommand(store, item);
				}
			})
		},
		delCommand() {
			actions.delCommand(store);
			this.showCommand = false;
		}
	}
};
</script>
