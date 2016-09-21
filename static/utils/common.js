import { shell } from 'electron';

export const openUrl = (url) => {
	shell.openExternal(url);
};

export const copyObj = (source) => {
	return JSON.parse(JSON.stringify(source));
};
