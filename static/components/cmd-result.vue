<template>
	<h1>Result</h1>
	<pre>
		<code>
{{entry}} {{command}} {{option}}
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
			cmmand: '',
			option: '',
		};
	},
	vuex: {
		getters: {
			cmd: () => store.state.cmd
		}
	},
	methods: {
		generateRsult() {
			this.entry = this.cmd.entry;
			this.option = '';
			this.cmd.optionsList.forEach((item) => {
				this.option += `--${item.checkedOption}=${item.value} `;
			});
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
