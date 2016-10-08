import { ipcMain, BrowserWindow } from 'electron';

import { exec } from 'child_process';

ipcMain.on('command-will-run', (ev, command) => {
    let child = exec(command);
    let pid = child.pid;
    ev.sender.send('command-begin', pid);
    child.stdout.on('data', (data) => {
        // console.log(`stdout: ${data}`);
        ev.sender.send('command-runing', {
            data: data,
            pid: pid
        });
    });
    child.stderr.on('data', (data) => {
        // console.log(`stderr: ${data}`);
        ev.sender.send('command-runing', {
            data: data,
            pid: pid
        });
    });
    child.on('close', (code) => {
        // console.log(`Child exited with code ${code}`);
        ev.sender.send('command-close', pid);
    });
    child.on('error', () => {
        // console.log(`error: ${data}`);
    })
})

ipcMain.on('command-force-close', (ev, pid) => {
    try {
        process.kill(pid);
    } catch (e) {}
})
