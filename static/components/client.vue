<template>
	<div class="client">
		<div class="arrow" :class="{'arrow-close': !showClient}" @click="toggleClient()">
			<i class="iconfont icon-arrow-copy"></i>
		</div>
		<div class="client-list" :class="{'client-close': !showClient, 'client-open': showClient}" v-show="showClient" transition="height">
			<ul>
				<li></li>
			</ul>
		</div>
	</div>
</template>
<style scoped>
.client {
	position: fixed;bottom: 0;left: 0;width: 100%;
}
.arrow {
	width: 100%;
	text-align: center;
	cursor: pointer;
	background-color: rgba(51,56,66, 1);
	border-top-right-radius: 5px;
	border-top-left-radius: 5px;
}
.arrow i {
	display: inline-block;vertical-align: middle;
	color: #fff;
	font-size: 14px;
	line-height: 24px;
	transform: rotate(-90deg);
	transition: all ease 0.3s;
}
.arrow.arrow-close i{
	transform: rotate(90deg)!important;
}
.client-list {
	width: 100%;
	transition: all ease 0.2s;
}
.client-close {
	height: 0px;
}
.client-open {
	height: 130px;
}
</style>
<script>
import store from 'store';
import actions from 'actions';

export default {
	name: 'Client',
	data() {
		return {
			showClient: false
		}
	},
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON
		}
	},
	methods: {
		toggleClient() {
			this.showClient = !this.showClient;
			actions.toggleClient(store, this.showClient);
		}
	}
};	
</script>
