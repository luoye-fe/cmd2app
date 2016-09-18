<template>
	<alert :show.sync="alertConfig.show" :placement="alertConfig.placement" :duration="alertConfig.duration" :type="alertConfig.type" :width="alertConfig.width">
		<button type="button" class="close" v-show="alertConfig.dismissable" @click="alert(store, {show: false})">
			<span>×</span>
		</button>
		<span class="alert-icon-float-left" :class="iconClass"></span>
		<strong>{{alertConfig.title}}</strong>
		<p>{{alertConfig.msg}}</p>
	</alert>
</template>
<style scoped>
.alert-icon-float-left{
	font-size: 32px;
	margin-right: 5px;
	float: left;
}
</style>
<script>
import {
	alert
} from 'vue-strap';

import store from 'store';
import actions from 'actions';

export default {
	name: 'Alert',
	data() {
		return {
			store,
			iconMap: {
				success: 'ok',
				info: 'info',
				warning: 'info',
				danger: 'info'
			},
			iconClass: ''
		};
	},
	ready() {
		this.iconClass = `icon-${this.iconMap[this.alertConfig.type]}-circled`;
	},
	components: {
		alert
	},
	vuex: {
		getters: {
			alertConfig: () => store.state.alertConfig
		}
	},
	methods: {
		alert: actions.alert
	}
};
</script>
