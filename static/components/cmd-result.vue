<template>
	<div class="form-group form-group-sm">
		<div class="button-group">
			<button type="button" class="btn btn-success btn-sm" @click="applyAll()">确认所有参数</button>
		</div>
		<hr>
		<label>Result</label>
		<pre><code>{{cmdStr}}</code></pre>
		<hr>
		<button type="button" class="btn btn-success btn-sm" @click="runCommand()">运行</button>
		<div style="margin-top: 15px;">
			<a class="btn btn-info btn-sm" href="javascript:void(0)" @click="openUrl(metaJSON.repository)">README.md</a>
		</div>
		<hr>
	</div>
</template>
<script>
import store from 'store';
import actions from 'actions';

import { ipcRenderer } from 'electron';

import { openUrl, generateCmdRsult, copyObj } from 'utils/common.js';

import Event from './event.vue';

export default {
	name: 'CmdResult',
	data() {
		return {
			sudo: '',
			entry: '',
			globalOptions: [],
			commandEntry: '',
			commandParams: [],
			commandOptions: [],
			cmdStr: ''
		};
	},
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON,
			commandHistory: () => store.state.commandHistory,
			sudoPwd: () => store.state.sudoPwd
		}
	},
	ready() {
		Event.$on('send-entry', (obj) => {
			this.sudo = obj.sudo || false;
			this.entry = obj.entry || '';
		})
		Event.$on('send-global-options', (obj) => {
			this.globalOptions = obj || [];
		})
		Event.$on('send-command-entry', (obj) => {
			this.commandEntry = obj || '';
		})
		Event.$on('send-command-params', (obj) => {
			this.commandParams = obj || [];
		})
		Event.$on('send-command-options', (obj) => {
			this.commandOptions = obj || [];
		})
		Event.$on('should-generate', () => {
			this.generateRsult();
		})
	},
	methods: {
		generateRsult() {
			this.cmdStr = generateCmdRsult(this.sudo, this.entry, this.globalOptions, this.commandEntry, this.commandParams, this.commandOptions);
		},
		runCommand() {
			if (this.cmdStr === '') {
				actions.alert(store, {
					show: true,
					title: '提示',
					msg: '先点击「确认所有参数」再运行',
					type: 'info'
				})
				return;
			};
			ipcRenderer.send('command-will-run', this.cmdStr);
			let flag = false;
			for (let i = 0; i < this.commandHistory.length; i++) {
				if (this.commandHistory[i].cmdStr === this.cmdStr) {
					actions.alert(store, {
						show: true,
						title: '提示',
						msg: '历史记录已存在，就不重复添加了哦',
						type: 'info'
					})
					flag = true;
					return;
				}
			}
			if (!flag) {
				actions.addHistory(store, copyObj({
					sudo: this.sudo,
					entry: this.entry,
					globalOptions: this.globalOptions,
					commandEntry: this.commandEntry,
					commandParams: this.commandParams,
					commandOptions: this.commandOptions,
					cmdStr: this.cmdStr
				}));
			}
		},
		openUrl: openUrl,
		applyAll() {
			Event.$emit('i-will-recive-all');
			Event.$emit('should-generate');
		}
	}
};
</script>
