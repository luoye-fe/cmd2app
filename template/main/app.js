// fix process.env.path on darwin
import fixPath from 'fix-path';
fixPath();

import path from 'path';
import { app, BrowserWindow, Tray, Menu } from 'electron';

import './ipc/index.js';

import env from './env.js';

let mainWindow = null;
let appIcon = null;
let forceQuit = false;
let indexPath = `file://${path.join(__dirname, '../index.html')}`;

let browserOptions = {
	width: 717,
	height: 717,
	center: true,
	resizable: false,
	maximizable: false,
	fullscreen: false,
	fullscreenable: false,
	show: false
};

function createWindow() {
	mainWindow = new BrowserWindow(browserOptions);

	mainWindow.webContents.on('did-finish-load', () => {
		mainWindow.show();
	});

	mainWindow.loadURL(indexPath);

	if (env === 'dev') {
		mainWindow.webContents.openDevTools();

		// 引入开发者工具 (引入后注释掉)
		// BrowserWindow.addDevToolsExtension('your dev tool path');
	}

	mainWindow.on('close', (e) => {
		if (!forceQuit && process.platform === 'darwin') {
			e.preventDefault();
			mainWindow.hide();
			return;
		}
		mainWindow = null;
		app.quit();
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') {
		app.quit();
	};
});

app.on('activate', function() {
	mainWindow.show();
});

app.on('before-quit', function() {
	forceQuit = true;
});
