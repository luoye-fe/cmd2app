export const ALERT = (state, params) => {
	for (let item in params) {
		state.alertConfig[item] = params[item];
	}
};

export const HIDEALERT = (state) => {
	state.alertConfig.show = false;
};


