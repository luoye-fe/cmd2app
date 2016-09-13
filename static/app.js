import Vue from 'vue';

const vm = new Vue({
	el: '#app',
	ready() {
		console.log(123);
	},
	template: `
	<div>
		<h1>test</h1>
	</div>
	`
});
