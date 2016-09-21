<!-- <template>
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
			cmmand: '',
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
			this.entry = this.cmd.entry;
			this.globaloption = '';
			this.cmd.globalOptions.forEach((item) => {
				this.globaloption += `--${item.checkedOption}=${item.value} `;
			});
			// this.command += this.cmd.command.key + '';
			// this.cmd.params.forEach((item) => {
			// 	this.command += (item.value || '') + ' ';
			// })
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
 -->