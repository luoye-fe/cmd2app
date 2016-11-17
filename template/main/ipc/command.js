import { ipcMain, BrowserWindow } from 'electron';

import { execCmd } from '../utils/common.js';

import { spawn } from 'child_process';

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
	let child = execCmd(command);
	let pid = child.pid;
	ev.sender.send('command-begin', pid);
	child.stdout.on('data', (data) => {
		ev.sender.send('command-runing', {
			data: data,
			pid: pid
		});
	});
	child.stderr.on('data', (data) => {
		if (data && !sudoPwd && /^sudo/.test(preCommand)) {
			ev.sender.send('command-require-sudo', preCommand);
			sudoPwd = '';
			return;
		}
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
	if ((sudoPwd && process.platform === 'darwin') || /^echo/.test(resultCommand)) {
		// sudo 启动的进程会有多个 pid 存在
		execCmd(`echo ${sudoPwd} | sudo -S kill -9 ${pid}`, () => {
			execCmd(`echo ${sudoPwd} | sudo -S kill -9 ${parseInt(pid) + 2}`, () => {
				execCmd(`echo ${sudoPwd} | sudo -S kill -9 ${parseInt(pid) + 2 + 1}`);
			});
		});
	} else {
		try {
			process.kill(pid);
		} catch (e) {}
	}
});
