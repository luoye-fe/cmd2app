import Vue from 'vue';
export const UPDATEENTRY = (state, value) => {
	state.cmd.entry = value;
};

export const ADDNEWOPTION = (state, params, command) => {
	if (command) {

	} else {
		state.cmd.globalOptions = params;
	}
};

export const DELOPTION = (state, key, command) => {
	if (command) {

	} else {
		delete state.cmd.globalOptions[key];
	}
};

export const ADDCOMMAND = (state, params) => {
	state.cmd.command = params;
};

export const DELCOMMAND = (state) => {
	state.cmd.command = {};
};

export const UPDATECOMMANDPARAM = (state, index, value) => {
	state.cmd.command.params[index].value = value;
};

export const UPDATECOMMADNOPTION = (state, value) => {
	state.cmd.command.options.forEach((item) => {
		if (item.key === value) {
			item.checked = true;
		} else {
			item.checked = false;
		}
	})
};

export const UPDATECOMMANDOPTIONVAL = (state, value) => {
	state.cmd.command.options.forEach((item) => {
		if (item.checked) {
			item.value = value;
		}
	})
};
