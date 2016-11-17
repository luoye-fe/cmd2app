export const alert = (store, params) => {
	store.dispatch('ALERT', params);
	setTimeout(() => {
		store.dispatch('HIDEALERT', params);
	}, params.duration || 2000);
};

export const toggleClient = (store, show) => {
	store.dispatch('TOGGLECLIENT', show);
};

export const setRequireSudoPwd = (store, obj) => {
	store.dispatch('SETREQUIRESUDOPWD', obj);
};

export const setSudoPwd = (store, pwd) => {
	store.dispatch('SETSUDOPWD', pwd);
};
