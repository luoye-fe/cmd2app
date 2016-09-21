export const UPDATEENTRY = (state, value) => {
	state.cmd.entry = value;
};

export const ADDNEWOPTION = (state, key, parmas) => {
	state.cmd.globalOptions[key] = parmas;
};

export const DELOPTION = (state, index) => {
	state.cmd.globalOptions.splice(index, 1);
};

export const UPDATEOPTIONVAL = (state, index, value) => {
	state.cmd.globalOptions[index].value = value;
};

export const UPDATEOPTIONCHECKED = (state, index, value) => {
	state.cmd.globalOptions[index].checkedOption = value;
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
