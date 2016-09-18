<template>
	<m-alert></m-alert>
	<m-head></m-head>
	<m-main></m-main>
	<m-client></m-client>
</template>
<style lang="less">
@import url('../css/app.less');
.main-con {
	padding: 20px;
	box-sizing: border-box;
}
</style>
<script>
import Alert from './alert.vue';

import Head from './head.vue';
import Main from './main.vue';
import Client from './client.vue';

export default {
	name: 'Index',
	components: {
		'm-alert': Alert,
		'm-head': Head,
		'm-main': Main,
		'm-client': Client
	}
};
</script>
