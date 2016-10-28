import { execCmd } from './common.js';

const isUsingWindows = process.platform === 'win32';

const commandExistsUnix = function(commandName, callback) {
	var child = execCmd('command -v ' + commandName +
		' 2>/dev/null' +
		' && { echo >&1 \'' + commandName + ' found\'; exit 0; }',
		function(error, stdout, stderr) {
			callback(null, !!stdout);
		});
};

const commandExistsWindows = function(commandName, callback) {
	var child = execCmd('where ' + commandName,
		function(error) {
			if (error !== null) {
				callback(null, false);
			} else {
				callback(null, true);
			}
		}
	);
};

export const commandExists = function(commandName, callback) {
	if (isUsingWindows) {
		commandExistsWindows(commandName, callback);
	} else {
		commandExistsUnix(commandName, callback);
	}
};
