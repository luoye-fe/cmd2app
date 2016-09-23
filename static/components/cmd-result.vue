<template>
	<h1>Result</h1>
	<pre>
		<code>
{{entry}} {{globaloption}} {{command}}
		</code>
	</pre>
</template>
<script>
import store from 'store';
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
			cmd: () => store.state.cmd
		}
	},
	methods: {
		generateRsult() {
			this.entry = ''
			this.globaloption = '';
			this.command = '';
			this.entry = this.cmd.entry;
			Object.keys(this.cmd.globalOptions).forEach((item) => {
				let curOption = this.cmd.globalOptions[item];
				this.globaloption += `--${item}=${curOption.value}`;
			});
			if (this.cmd.command.key) {
				this.command += this.cmd.command.key + ' ';
				if (this.cmd.command.params) {
					this.cmd.command.params.forEach((item) => {
						this.command += (item.value || '') + ' ';
					})
				}
				if (this.cmd.command.options) {
					Object.keys(this.cmd.command.options).forEach((item) => {
						let curOption = this.cmd.command.options[item];
						this.command += `--${item}=${curOption.value}`;
					});
				}
			}
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
