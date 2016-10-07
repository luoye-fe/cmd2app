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

function tryToApply() {
    apply(() => {
        // success
        
    }, () => {
        // fail
        
    })
}

ipcMain.on('app-init-will-check', (ev, metaJSON) => {
    let result = {};
    let cur = false;
    for (let i = 0; i < metaJSON.bin.length; i++) {
        (function(j) {
            commandExists(metaJSON.bin[j], (err, exist) => {
                if (!exist) {
                    // tryToApply();
                    cur = true;
                    console.log(cur);
                    ev.sender.send('app-init-has-check', {
                        error: 1
                    });
                    return;
                }
            })
        })(i)
    }
    console.log(cur);
    if (!cur) {
        ev.sender.send('app-init-has-check', {
            error: 0
        });
    }
});

ipcMain.on('app-init-input-pwd', (ev, pwd) => {
    sudo_pwd = pwd;
})
