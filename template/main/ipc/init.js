import path from 'path';
import { exec } from 'child_process';

import { ipcMain } from 'electron';

import commandExists from 'command-exists';

const platform = process.platform;
const resourcePath = path.join(__dirname, '../../resource');
let sudo_pwd = '';

function apply(success, fail) {
	let cmd = '';
    if (platform !== 'win32') {
    	cmd = `cd ${resourcePath} && echo ${sudo_pwd} | sudo npm link`;
    } else {
    	cmd = `cd ${resourcePath} && npm link`;
    }
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            fail();
            return;
        }
        success();
    });
}

function ipcToRenderForSudoPwd() {

}

function tryToApply() {
    apply(() => {
        // success
        ev.sender.send('app-init-has-check', {
            error: 0
        });
    }, () => {
        // fail
        if (platform !== 'win32') {
            ev.sender.send('app-init-has-check', {
                error: 1
            });
        } else {
            ev.sender.send('app-init-has-check', {
                error: 1
            });
        }
    })
}

ipcMain.on('app-init-will-check', (ev, metaJSON) => {
    let result = {};

    for (let i = 0; i < metaJSON.bin.length; i++) {
    	(function(j) {
            commandExists(metaJSON.bin[j], (err, exist) => {
                if (err) {
                    tryToApply();
                    return;
                }
            })
        })(i)
    }
});
