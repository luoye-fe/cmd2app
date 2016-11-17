<template>
	<div class="form-group form-group-sm" v-show="metaJSON.command">
		<label>Command</label>
		<div class="checked-command">
			<div class="row">
				<div class="col-xs-3">
					<select class="form-control" v-model="checkedCommandEntry" @change="selectCommand">
						<option value="null">无</option>
						<option v-for="(key, item) in metaJSON.command" :value="key">{{key}}</option>
					</select>
				</div>
			</div>
			<div class="flex-input">
				<input class="form-control" type="text" v-for="(index, item) in currentCommandDetail.params" :placeholder="item.desc" v-model="item.value">
			</div>
			<div v-show="showAddOptionButton" class="form-group form-group-sm">
				<m-common-options :all-options="currentCommandDetail.options" :is-command="true"></m-common-options>
			</div>
			<pre v-show="currentCommandDetail.desc"><code>{{currentCommandDetail.desc}}</code></pre>
		</div>
		<hr>
	</div>
</template>
<script>
import Vue from 'vue';

import store from 'store';

import { copyObj } from 'utils/common.js';

import CommonOptopn from './common-options.vue';

import Event from './event.vue';

export default {
	name: 'Command',
	data() {
		return {
			showAddOptionButton: false,
			checkedCommandEntry: 'null',
			currentCommandDetail: {}
		};
	},
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON
		}
	},
	components: {
		'm-common-options': CommonOptopn
	},
	ready() {
		Event.$on('i-will-recive-all', () => {
			Event.$emit('send-command-entry', this.checkedCommandEntry);
			Event.$emit('send-command-params', this.currentCommandDetail.params);
		});
		Event.$on('modify-command', (obj) => {
			this.checkedCommandEntry = obj.commandEntry;
			this.currentCommandDetail = copyObj(this.metaJSON.command[this.checkedCommandEntry]);
			this.currentCommandDetail.params.forEach((item, index) => {
				Vue.set(this.currentCommandDetail.params[index], 'value', obj.commandParams[index].value);
			});
			this.showAddOptionButton = !!this.currentCommandDetail.options;
		})
	},
	methods: {
		selectCommand() {
			if (this.checkedCommandEntry !== 'null') {
				this.currentCommandDetail = copyObj(this.metaJSON.command[this.checkedCommandEntry]);
				this.currentCommandDetail.params.forEach((item, index) => {
					Vue.set(this.currentCommandDetail.params[index], 'value', '');
				});
				this.showAddOptionButton = !!this.currentCommandDetail.options;
			}
		}
	}
};
</script>
<style scoped>
.checked-command span {
	cursor: pointer;
}
.flex-input{
	padding: 10px 0;
	box-sizing: border-box;
}
.flex-input input {
	display: inline-block;vertical-align: middle;max-width: 200px;margin: 0 5px;
}
.flex-input input:nth-child(1){
	margin-left: 0;
}
.flex-input input:last-child{
	margin-right: 0;
}
</style>
