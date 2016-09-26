export const addHistory = (store, record) => {
	store.dispatch('ADDHISTORY', record);
};

export const delHistory = (store, index) => {
	store.dispatch('DELHISTORY', index);
};
