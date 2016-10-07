import 'shelljs/global';
import fs from 'fs';

import chalk from 'chalk';

import customConfig from '../config/custom.config.js';

if (!fs.existsSync(customConfig.electronPath)) {
	console.log(chalk.red.bold('\nError: electron path not exist.\n'));
	console.log('pleause check you electron path. (set in ' + chalk.magenta('config/custom.config.js') + ')\n');
	exit(1);
}

console.log(chalk.cyan.bold('\nProcessing start electron dev main process ... \n'));

exec(`${customConfig.electronPath} template/main/app.babel.js --env=dev`);
