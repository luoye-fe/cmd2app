export const updateEntry = (store, value) => {
	store.dispatch('UPDATEENTRY', value);
};

export const addNewOption = (store, newOption) => {
	store.dispatch('ADDNEWOPTION', newOption);
};

export const delOption = (store, index) => {
	store.dispatch('DELOPTION', index);
};

export const updateOptionVal = (store, index, e) => {
	store.dispatch('UPDATEOPTIONVAL', index, e);
};

export const updateOptionChecked = (store, index, e) => {
	store.dispatch('UPDATEOPTIONCHECKED', index, e);
};

export const addCommand = (store, params) => {
	store.dispatch('ADDCOMMAND', params);
};

export const delCommand = (store) => {
	store.dispatch('DELCOMMAND');
}
