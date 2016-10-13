import { existsSync as exits, rmdirSync, mkdirSync } from 'fs';
import path from 'path';

import chalk from 'chalk';
import program from 'commander';
import inquirer from 'inquirer';

import { isEmptySync } from './utils.js';
import logger from './logger.js';
import { checkDistBranch, downloadGitRepo, checkLegal, generateMeatFile, buildStatic, buildMainUseBabel, mergePackage, installNodeModule, buildAsar } from './process.js';

program
	.usage('<repo-name> [path]')
	.on('--help', function() {
		console.log('  Examples:')
		console.log()
		console.log(chalk.gray('    # create a new app with an official repo'))
		console.log('    $ cmd2app init gomeplusFED/meixin-h5-proxy ./')
		console.log()
		console.log(chalk.gray('    # create a new app straight from a github repo'))
		console.log('    $ cmd2app init username/repo path')
		console.log()
	})
	.parse(process.argv)

if (program.args.length < 2) {
	program.help();
	process.exit(1);
}

console.log()
process.on('exit', function() {
	console.log()
})

let repoName = program.args[0];
let targetPath = program.args[1];
let prefix = path.isAbsolute(targetPath) ? '' : process.cwd();
let generatePath = path.join(prefix, targetPath);
let generateSrcPath = path.join(prefix, targetPath, 'src');
let generateReourcePath = path.join(prefix, targetPath, 'src', 'resource');

const run = async function() {
	await checkDistBranch(repoName);
	await downloadGitRepo(repoName, generateReourcePath);
	await checkLegal(generateReourcePath);
	await buildStatic(generateSrcPath);
	await buildMainUseBabel(generateSrcPath);
	await generateMeatFile(generateReourcePath, repoName);
	await mergePackage(generateReourcePath);
	await installNodeModule(generateSrcPath);
	await buildAsar(generateSrcPath);
	logger.success('All succeed.');
}

if (exits(generatePath) && !isEmptySync(generatePath)) {
	inquirer.prompt([{
		type: 'confirm',
		message: 'Target directory exists and is not empty, continue?',
		name: 'ok'
	}]).then((answers) => {
		if (answers.ok) {
			run();
		}
	})
} else {
	if (!exits(generatePath)) {
		mkdirSync(generatePath);
	}
	run();
}
