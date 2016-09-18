export const alert = (store, params) => {
	store.dispatch('ALERT', params);
	setTimeout(() => {
		store.dispatch('HIDEALERT', params);
	}, params.duration || 2000);
};
