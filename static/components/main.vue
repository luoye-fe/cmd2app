<template>
	<div class="main-form">
		<m-entry></m-entry>
		<m-options></m-options>
		<m-command></m-command>
		<m-cmd-result></m-cmd-result>
		<m-history></m-history>
	</div>
</template>
<style scoped>
.main-form{
	padding: 10px 15px;
	box-sizing: border-box;
	padding-bottom: 150px;
}
</style>
<script>
import Entry from './entry.vue';
import Options from './options.vue';
import Command from './command.vue';
import CmdResult from './cmd-result.vue';
import History from './history.vue';

export default {
	name: 'Main',
	components: {
		'm-entry': Entry,
		'm-options': Options,
		'm-command': Command,
		'm-cmd-result': CmdResult,
		'm-history': History
	}
};
</script>
