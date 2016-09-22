export const updateEntry = (store, value) => store.dispatch('UPDATEENTRY', value);

export const addNewOption = (store, params) => store.dispatch('ADDNEWOPTION', params);

export const delOption = (store, index) => store.dispatch('DELOPTION', index);

export const updateOptionVal = (store, index, e) => store.dispatch('UPDATEOPTIONVAL', index, e);

export const updateOptionChecked = (store, index, e) => store.dispatch('UPDATEOPTIONCHECKED', index, e);

export const addCommand = (store, params) => store.dispatch('ADDCOMMAND', params);

export const delCommand = (store) => store.dispatch('DELCOMMAND');

export const updateCommandParam = (store, index, value) => store.dispatch('UPDATECOMMANDPARAM', index, value);

export const updateCommandOption = (store, value) => store.dispatch('UPDATECOMMADNOPTION', value);

export const updateCommandOptionVal = (store, value) => store.dispatch('UPDATECOMMANDOPTIONVAL', value);
