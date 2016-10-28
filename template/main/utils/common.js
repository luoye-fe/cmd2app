import { exec } from 'child_process';

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
