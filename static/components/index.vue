<template>
	<m-alert></m-alert>
	<m-head></m-head>
	<m-entry></m-entry>
	<m-options></m-options>
	<m-command></m-command>
	<m-client></m-client>
</template>
<style lang="less">
@import "~bootstrap/less/bootstrap.less";
@import "../css/prism-coy.css";
</style>
<script>
import Alert from './alert.vue';

import Head from './head.vue';
import Entry from './entry.vue';
import Options from './options.vue';
import Command from './command.vue';
import Client from './client.vue';

export default {
	name: 'Index',
	components: {
		'm-alert': Alert,
		'm-head': Head,
		'm-entry': Entry,
		'm-options': Options,
		'm-command': Command,
		'm-client': Client
	}
};
</script>
