import { shell } from 'electron';

export const openUrl = (url) => {
	shell.openExternal(url);
};

export const copyObj = (source) => {
	return JSON.parse(JSON.stringify(source));
};

export const generateCmdRsult = (sudo = '', entry = '', globalOptions = [], commandEntry = '', commandParams = [], commandOptions = []) => {
	let cmdStr = '';
	cmdStr = '';
	cmdStr += sudo ? 'sudo ' : '';
	cmdStr += entry;
	globalOptions.forEach((item) => {
		cmdStr += item.value ? ` --${item.checked}=${item.value}` : ` --${item.checked}`;
	});
	cmdStr += ' ';
	cmdStr += commandEntry === 'null' ? '' : commandEntry;
	commandParams.forEach((item) => {
		cmdStr += item.value ? ` ${item.value}` : '';
	});
	commandOptions.forEach((item) => {
		cmdStr += item.value ? ` --${item.checked}=${item.value}` : ` --${item.checked}`;
	});
	return cmdStr;
};
