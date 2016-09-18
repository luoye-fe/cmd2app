import Vue from 'vue';

import store from 'store';

import Index from './components/index.vue';

const vm = new Vue({
	el: '#app',
	store: store,
	components: {
		'm-index': Index
	},
	template: `
	<div>
		<m-index></m-index>
	</div>
	`
});
