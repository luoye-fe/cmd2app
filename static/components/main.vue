<template>
	<m-entry></m-entry>
	<m-options></m-options>
	<m-command></m-command>
</template>
<script>
import Entry from './entry.vue';
import Options from './options.vue';
import Command from './command.vue';

export default {
	name: 'Main',
	components: {
		'm-entry': Entry,
		'm-options': Options,
		'm-command': Command
	}
};
</script>
