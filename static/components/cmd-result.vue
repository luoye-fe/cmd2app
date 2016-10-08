<template>
	<div class="form-group form-group-sm">
		<label>Result</label>
		<pre><code>{{entry}}{{globaloption}}{{command}}</code></pre>
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

import { openUrl } from 'utils/common.js';

export default {
	name: 'CmdResult',
	data() {
		return {
			entry: '',
			command: '',
			globaloption: '',
		};
	},
	vuex: {
		getters: {
			cmd: () => store.state.cmd,
			metaJSON: () => store.state.metaJSON
		}
	},
	methods: {
		generateRsult() {
			this.entry = ''
			this.globaloption = '';
			this.command = ' ';
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
			ipcRenderer.send('command-will-run', this.entry + this.globaloption + this.command);
			actions.addHistory(store, this.entry + this.globaloption + this.command);
		},
		openUrl: openUrl
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
