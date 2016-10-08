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
        cmd = `cd ${resourcePath} && echo ${sudo_pwd} | sudo -S npm link`;
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

function tryToApply(ev) {
    apply(() => {
        // success
        ev.sender.send('app-init-has-check', {
            error: 0
        });
    }, () => {
        // fail
        ev.sender.send('app-init-has-check', {
            error: 1
        });
    })
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
                })
            })(i)
        }
    })
}

ipcMain.on('app-init-will-check', (ev, metaJSON) => {
    let result = {};
    let cur = false;

    checkCommand(metaJSON)
        .then(() => {
            tryToApply(ev);
        })
        .catch(() => {
            ev.sender.send('app-init-has-check', {
                error: 0
            });
        })
});

ipcMain.on('app-init-input-pwd', (ev, pwd) => {
    sudo_pwd = pwd;
})
