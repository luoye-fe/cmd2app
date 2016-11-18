import { exec } from 'child_process';
import psTree from 'ps-tree';
import sudo from 'sudo-prompt';

export const copyObj = (source) => {
	return JSON.parse(JSON.stringify(source));
};

export const normalizePath = (path) => {
	if (/\s/.test(path)) {
		path = "'" + path + "'";
	}
	return path.replace(/\\/g, '/');
};

export const objType = (obj) => {
	return Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1];
};

export const execCmd = (command, cb) => {
	return exec(command, {
		env: {
			PATH: process.env.PATH
		}
	}, (err, stout, sterr) => {
		if (objType(cb) === 'Function') {
			cb(err, stout, sterr);
		}
	});
};

export const kill = (pid, signal = 'SIGKILL', callback = function() {}) => {
	if (process.platform !== 'win32') {
		let resultKilCmd = [];
		psTree(pid, (err, children) => {
			[pid].concat(
				children.map(function(p) {
					return p.PID;
				})
			).forEach(function(tpid) {
				resultKilCmd.push(` sudo -S kill -9 ${tpid}`);
			});
			try {
				execCmd(`echo ${global.pwd} |${resultKilCmd.join(' &&')}`);
			} catch (e) {}
			callback();
		});
	} else {
		try {
			process.kill(pid, signal);
		} catch (ex) {}
		callback();
	}
};
