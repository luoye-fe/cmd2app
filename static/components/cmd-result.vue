<template>
	<div class="form-group form-group-sm">
		<label>Result</label>
		<pre><code>{{sudo}}{{entry}}{{globaloption}}{{command}}</code></pre>
		<hr>
		<button type="button" class="btn btn-success btn-sm" @click="runCommand()">运行</button>
		<div style="margin-top: 15px;">
			<a class="btn btn-info btn-sm" href="javascript:void(0)" @click="openUrl(metaJSON.repository)">README.md</a>
		</div>
		<hr>
		<m-require-sudo-pwd :show-modal.sync="showModal" :apply="apply"></m-require-sudo-pwd>
	</div>
</template>
<script>
import store from 'store';
import actions from 'actions';

import { ipcRenderer } from 'electron';

import { openUrl } from 'utils/common.js';

import RequireSudoPwd from './require-sudo-pwd.vue';

export default {
	name: 'CmdResult',
	data() {
		return {
			sudo: '',
			entry: '',
			command: '',
			globaloption: '',
			showModal: false,
			currentCommand: ''
		};
	},
	vuex: {
		getters: {
			cmd: () => store.state.cmd,
			metaJSON: () => store.state.metaJSON
		}
	},
	components: {
		'm-require-sudo-pwd': RequireSudoPwd
	},
	ready() {
		ipcRenderer.on('command-require-sudo', (ev, command) => {
			this.currentCommand = command;
			this.showModal = true;
		});
	},
	methods: {
		generateRsult() {
			this.sudo = '';
			this.entry = ''
			this.globaloption = '';
			this.command = ' ';
			this.sudo = this.cmd.sudo ? 'sudo ' : '';
			this.entry = this.cmd.entry;
			Object.keys(this.cmd.globalOptions).forEach((item) => {
				let curOption = this.cmd.globalOptions[item];
				curOption.value === '' ? this.globaloption += ` --${item}` : this.globaloption += ` --${item}=${curOption.value}`;
			});
			if (this.cmd.command.key) {
				this.command += this.cmd.command.key;
				if (this.cmd.command.params) {
					this.cmd.command.params.forEach((item) => {
						this.command += item.value ? (' ' + item.value) : '';
					})
				}
				if (this.cmd.command.options) {
					Object.keys(this.cmd.command.options).forEach((item) => {
						let curOption = this.cmd.command.options[item];
						curOption.value === '' ? this.command += ` --${item}` : this.command += ` --${item}=${curOption.value}`;
					});
				}
			}
		},
		runCommand() {
			ipcRenderer.send('command-will-run', this.sudo + this.entry + this.globaloption + this.command);
			actions.addHistory(store, this.sudo + this.entry + this.globaloption + this.command);
		},
		openUrl: openUrl,
		apply(pwd) {
			ipcRenderer.send('command-will-run', this.currentCommand, pwd);
		}
	},
	watch: {
		'cmd': {
			handler() {
				this.generateRsult();
			},
			deep: true
		}
	}
};
</script>
