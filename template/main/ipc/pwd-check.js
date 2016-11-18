import { ipcMain } from 'electron';

import { execCmd } from '../utils/common.js';

ipcMain.on('pwd-check', (ev, pwd) => {
	execCmd(`echo ${pwd} | sudo -S ls`, (err) => {
		if (err) {
			ev.sender.send('pwd-checked', {
				error: 1
			});
		} else {
			global.pwd = pwd;
			ev.sender.send('pwd-checked', {
				error: 0
			});
		}
	});
});

