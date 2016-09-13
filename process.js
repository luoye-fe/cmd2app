import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';

import download from 'download-git-repo';
import ora from 'ora';
import request from 'request';
import { ncp } from 'ncp';
import asar from 'asar';

import merge from './merge-pkg.js';
import logger from './logger.js';

export const checkDistBranch = function(template) {
	return new Promise((resolve, reject) => {
		request({
			url: 'https://api.github.com/repos/' + template + '/branches',
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
			}
		}, function(err, res, body) {
			if (err) {
				reject(err);
				logger.fatal(err);
			};
			if (res.statusCode !== 200) {
				reject('Repo does not exist: ' + template);
				logger.fatal('Repo does not exist: ' + template);
			} else {
				let hasDist = JSON.parse(body).some(function(branch) {
					return branch.name === 'dist';
				});
				resolve(hasDist ? template + '#dist' : template);
			}
		})
	})
}

export const downloadGitRepo = function(from, to) {
	return new Promise((resolve, reject) => {
		let spinner = ora('Downloading repo ...').start();
		download(from, to, { clone: false }, function(err) {
			spinner.stop();
			if (err) {
				reject(err);
				logger.fatal('Failed to download repo ' + template + ': ' + err.message.trim())
			};
			logger.success('Download succeed "%s".', from);
			resolve();
		})
	})
};

export const copyElectronTemplate = function(targetPath) {
	return new Promise((resolve, reject) => {
		ncp(path.join(__dirname, 'template/'), targetPath, function(err) {
			if (err) {
				reject(err);
				logger.fatal(err);
			}
			resolve();
		});
	})
};

export const mergePackage = function(targetPath) {
	return new Promise((resolve, reject) => {
		let resourcePkg = fs.readFileSync(path.join(targetPath, 'package.json'));
		let mainPkg = fs.readFileSync(path.join(targetPath, '../package.json'));
		let resultPkg = merge(mainPkg, resourcePkg);
		fs.writeFile(path.join(targetPath, '../package.json'), resultPkg, (err) => {
			if (err) {
				reject(err);
				logger.fatal(err);
			}
			resolve();
		});
	})
};

export const generateMeatFile = function(targetPath) {
	return new Promise((resolve, reject) => {

	})
};

export const installNodeModule = function(targetPath) {
	return new Promise((resolve, rejcet) => {
		let spinner = ora('Installing node modules ...').start();
		exec(`cd ${targetPath} && npm install --loglevel=silent`, (error, stdout, stderr) => {
			spinner.stop();
			if (error) {
				reject(error);
				logger.fatal(error);
			}
			logger.success('Install node modules succeed.');
			resolve();
		})
	})
};

export const buildAsar = function(targetPath) {
	return new Promise((resolve, reject) => {
		let spinner = ora('Building asar ...').start();
		if (fs.existsSync(path.join(targetPath, './dist/asar/app.asar'))) {
			fs.unlinkSync(path.join(targetPath, './dist/asar/app.asar'));
		}
		asar.createPackage(targetPath, path.join(targetPath, '../dist/asar/app.asar'), function() {
			spinner.stop();
			logger.success('Build asar succeed.');
			resolve();
		})
	})
};
