<template>
	<div class="form-group form-group-sm">
		<label>Entry</label>
		<div class="con">
			<select @change="updateEntry($event)" class="form-control">
				<option v-for="key in metaJSON.bin" :value="key">{{key}}</option>
			</select>
			<div v-show="platform === 'darwin'">
				<input type="checkbox" @change="updateSudo" v-model="sudo" id="sudo"><label for="sudo">以管理员权限运行</label>
			</div>
		</div>
		<hr>
	</div>
</template>
<style scoped>
</style>
<script>
import store from 'store';
import actions from 'actions';

export default {
	name: 'Entry',
	data() {
		return {
			platform: process.platform,
			sudo: false
		}
	},
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON,
			entry: () => store.state.cmd.entry
		}
	},
	ready() {
		actions.updateEntry(store, this.metaJSON.bin[0]);
	},
	methods: {
		updateEntry(e) {
			actions.updateEntry(store, e.target.value, this.sudo);
		},
		updateSudo() {
			actions.updateSudo(store, this.sudo);
		}
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
