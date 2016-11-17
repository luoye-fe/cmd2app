<template>
	<m-head></m-head>
	<m-main></m-main>
	<m-alert></m-alert>
	<m-client></m-client>
	<m-init></m-init>
	<m-welcome></m-welcome>
	<m-require-sudo-pwd></m-require-sudo-pwd>
</template>
<style lang="less">
@import url('../css/app.less');
</style>
<script>
import Alert from './alert.vue';

import Head from './head.vue';
import Main from './main.vue';
import Client from './client.vue';

import Init from './init.vue';

import Welcome from './welcome.vue';

import RequireSudoPwd from './require-sudo-pwd.vue';

export default {
	name: 'Index',
	components: {
		'm-alert': Alert,
		'm-head': Head,
		'm-main': Main,
		'm-client': Client,
		'm-init': Init,
		'm-welcome': Welcome,
		'm-require-sudo-pwd': RequireSudoPwd
	}
};
</script>
