import { ipcMain, BrowserWindow } from 'electron';

import { execCmd, kill } from '../utils/common.js';

import { exec } from 'child_process';

let sudoPwd = '';
let resultCommand = '';

ipcMain.on('command-will-run', (ev, command, pwd) => {
	let preCommand = command;
	if (pwd) {
		sudoPwd = pwd;
	}
	if (/^sudo/.test(command)) {
		command = `echo ${sudoPwd} | ${command.replace('sudo', 'sudo -S')}`;
	}
	resultCommand = command;

	let child = null;

	child = exec(command, {
		env: {
			PATH: process.env.PATH
		}
	}, (err, stdout, stderr) => {
		if (err.signal === 'SIGKILL') {
			return;
		}
		if ((!!(err || stderr) || !sudoPwd) && /^sudo/.test(preCommand)) {
			ev.sender.send('command-require-sudo', preCommand);
			sudoPwd = '';
		}
	});

	let pid = child.pid;
	ev.sender.send('command-begin', pid);
	child.stdout.on('data', (data) => {
		ev.sender.send('command-runing', {
			data: data,
			pid: pid
		});
	});
	child.stderr.on('data', (data) => {
		ev.sender.send('command-runing', {
			data: data,
			pid: pid
		});
	});
	child.on('close', (code) => {
		ev.sender.send('command-close', pid);
	});
	child.on('error', (err) => {
		console.log(`error: ${err}`);
	});
});

ipcMain.on('command-force-close', (ev, pid) => {
	kill(pid);
});
