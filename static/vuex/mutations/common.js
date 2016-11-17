export const ALERT = (state, params) => {
	for (let item in params) {
		state.alertConfig[item] = params[item];
	}
};

export const HIDEALERT = (state) => {
	state.alertConfig.show = false;
};

export const TOGGLECLIENT = (state, show) => {
	state.showClient = show;
};

export const SETREQUIRESUDOPWD = (state, obj) => {
	state.requireSudoPwd = obj;
};

export const SETSUDOPWD = (state, pwd) => {
	state.sudoPwd = pwd;
};
