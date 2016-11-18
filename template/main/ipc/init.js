import path from 'path';

import { ipcMain, dialog } from 'electron';

import { commandExists } from '../utils/command-exists.js';

import { normalizePath, execCmd } from '../utils/common.js';

const platform = process.platform;
const resourcePath = path.join(__dirname, '../../resource');

let dialogInfoObj = {
	type: 'info',
	buttons: [],
	title: '提示',
	message: '提示信息'
};

function apply(ev) {
	let cmd = '';
	let curr = normalizePath(resourcePath);
	if (platform !== 'win32') {
		cmd = `cd ${curr} && echo ${global.pwd} | sudo -S npm link`;
	} else {
		cmd = `cd ${curr} && npm link`;
	}
	execCmd(cmd, (err, stdout, stderr) => {
		if (err) {
			console.log(err);
		}
		ev.sender.send('app-init-has-check', {
			error: 0
		});
	});
}

function checkCommand(metaJSON) {
	return new Promise((resolve, reject) => {
		let cur = 0;
		for (let i = 0; i < metaJSON.bin.length; i++) {
			(function(j) {
				commandExists(metaJSON.bin[j], (err, exist) => {
					if (!exist) {
						resolve();
						return;
					} else {
						cur++;
						if (cur === metaJSON.bin.length) {
							reject();
						}
					}
				});
			})(i);
		}
	});
}

ipcMain.on('app-init-will-check', (ev, metaJSON) => {
	commandExists('npm', (err, exist) => {
		if (!exist) {
			ev.sender.send('app-init-has-check', {
				error: 1,
				type: 'nonpm',
				msg: 'You should install npm.'
			});
			return;
		}
		let result = {};
		let cur = false;

		checkCommand(metaJSON)
			.then(() => {
				apply(ev);
			})
			.catch((e) => {
				ev.sender.send('app-init-has-check', {
					error: 0
				});
			});
	});
});
