<template>
	<m-entry></m-entry>
	<m-options></m-options>
	<m-command></m-command>
	<m-cmd-result></m-cmd-result>
</template>
<script>
import Entry from './entry.vue';
import Options from './options.vue';
import Command from './command.vue';
import CmdResult from './cmd-result.vue';

export default {
	name: 'Main',
	components: {
		'm-entry': Entry,
		'm-options': Options,
		'm-command': Command,
		'm-cmd-result': CmdResult
	}
};
</script>
