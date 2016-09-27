<template>
	<div class="alert" transition="fade" v-show="alertConfig.show">
		<div class="alert_tip item" :class="alertConfig.type">
			<i class="iconfont" :class="iconClass"></i>
		</div>
		<div class="alert_main item">
			<h2>{{alertConfig.title}}</h2>
			<p>{{alertConfig.msg}}</p>
		</div>
	</div>
</template>
<style scoped>
.alert {
	padding: 10px 20px;
	border: 1px solid transparent;
	border-radius: 4px;
	position: fixed;
	left: 50%;
	top: 100px;
	transform: translate(-50%, -50%);
	-webkit-transform: translate(-50%, -50%);
	z-index: 999999;
	box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
}

.alert .alert_tip {
	line-height: 34px;
	margin-right: 10px;
	margin-right: 10px;
}

.alert .alert_tip i {
	font-size: 34px;
}

.alert .alert_tip.success {
	color: #52d368;
}

.alert .alert_tip.info {
	color: #1c7df8;
}

.alert .alert_tip.warning {
	color: #ffd769;
}

.alert .alert_tip.danger {
	color: #ef5858;
}

.alert_main {
	color: #fff;
}

.alert_main h2 {
	font-size: 16px;
	padding: 0;
	margin: 0;
}

.alert_main p {
	font-size: 14px;
	line-height: 24px;
	padding: 0;
	margin: 0;
}
</style>
<script>
import store from 'store';
import actions from 'actions';

export default {
	name: 'Alert',
	data() {
		return {
			iconClass: ''
		};
	},
	vuex: {
		getters: {
			alertConfig: () => store.state.alertConfig
		}
	},
	ready() {
		this.iconClass = `icon-${this.alertConfig.type}`;
	}
};
</script>
