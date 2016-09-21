export const UPDATEENTRY = (state, value) => {
	state.cmd.entry = value;
};

export const ADDNEWOPTION = (state, newOption) => {
	state.cmd.optionsList.push(newOption);
};

export const DELOPTION = (state, index) => {
	state.cmd.optionsList.splice(index, 1);
};

export const UPDATEOPTIONVAL = (state, index, value) => {
	state.cmd.optionsList[index].value = value;
};

export const UPDATEOPTIONCHECKED = (state, index, value) => {
	state.cmd.optionsList[index].checkedOption = value;
};

export const ADDCOMMAND = (state, params) => {
	state.cmd.command = params;
};

export const DELCOMMAND = (state) => {
	state.cmd.command = {};
};
