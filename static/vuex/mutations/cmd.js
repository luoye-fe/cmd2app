import Vue from 'vue';
export const UPDATEENTRY = (state, value) => {
	state.cmd.entry = value;
};

export const ADDNEWOPTION = (state, params, command) => {
	if (command) {
		state.cmd.command.options = params;
	} else {
		state.cmd.globalOptions = params;
	}
};

export const DELOPTION = (state, key, command) => {
	if (command) {
		Vue.delete(state.cmd.command.options, key);
	} else {
		Vue.delete(state.cmd.globalOptions, key);
	}
};

export const ADDCOMMAND = (state, params) => {
	state.cmd.command = params;
};
