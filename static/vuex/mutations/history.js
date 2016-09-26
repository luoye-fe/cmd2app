import storge from 'utils/storge.js';
export const ADDHISTORY = (state, record) => {
	state.commandHistory.push(record);
	storge.set('cmd2app-history-list-' + window.metaJSON.title, state.commandHistory);
};

export const DELHISTORY = (state, index) => {
	state.commandHistory.splice(index, 1);
	storge.set('cmd2app-history-list-' + window.metaJSON.title, state.commandHistory);
};
