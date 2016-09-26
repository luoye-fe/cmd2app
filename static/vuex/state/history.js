import storge from 'utils/storge.js';
export default {
	commandHistory: storge.get('cmd2app-history-list-' + window.metaJSON.title) || []
};