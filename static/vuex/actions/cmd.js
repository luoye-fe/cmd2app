export const updateEntry = (store, value) => store.dispatch('UPDATEENTRY', value);

export const updateSudo = (store, sudo) => store.dispatch('UPDATESUDO', sudo);

export const addNewOption = (store, params, command) => store.dispatch('ADDNEWOPTION', params, command);

export const delOption = (store, index) => store.dispatch('DELOPTION', index);

export const addCommand = (store, params) => store.dispatch('ADDCOMMAND', params);
