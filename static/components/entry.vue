<template>
	<div class="form-group form-group-sm">
		<label>Entry</label>
		<div class="con">
			<select v-model="checkedEntry" class="form-control">
				<option v-for="key in metaJSON.bin" :value="key">{{key}}</option>
			</select>
			<div v-show="platform === 'darwin'">
				<input type="checkbox" v-model="sudo" id="sudo"><label for="sudo">以管理员权限运行</label>
			</div>
		</div>
		<hr>
	</div>
</template>
<style scoped>
</style>
<script>
import store from 'store';

import Event from './event.vue';

export default {
	name: 'Entry',
	data() {
		return {
			platform: process.platform,
			sudo: false,
			checkedEntry: ''
		}
	},
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON
		}
	},
	ready() {
		this.checkedEntry = this.metaJSON.bin[0];
		Event.$on('i-will-recive-all', () => {
			Event.$emit('send-entry', {
				entry: this.checkedEntry,
				sudo: this.sudo
			})
		});
		Event.$on('modify-command', (obj) => {
			this.sudo = obj.sudo;
			this.entry = obj.entry;
		})
	}
};
</script>
<style scoped>
.con {
	width: 100%;font-size: 0;
}
.con select {
	font-size: 14px;
	display: inline-block;vertical-align: middle;
	width: 50%;
}
.con>div {
	font-size: 14px;
	display: inline-block;vertical-align: middle;
	width: 50%;
	box-sizing: border-box;
	padding-left: 20px;
}
.con>div input {
	margin-right: 5px;
}
</style>
