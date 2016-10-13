import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';

import webpack from 'webpack';
import download from 'download-git-repo';
import ora from 'ora';
import request from 'request';
import { ncp } from 'ncp';
import asar from 'asar';
import { js as jsbeautify } from 'js-beautify';

import merge from './merge-pkg.js';
import logger from './logger.js';
import { babelDir } from './utils.js';

import webpackConfig from '../webpack/webpack.config.js';

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
				logger.fatal('Failed to download repo ' + template + ': ' + err.message.trim());
			};
			logger.success('Download repo succeed.');
			resolve();
		})
	})
};

export const checkLegal = function(targetPath) {
	return new Promise((resolve, reject) => {
		let spinner = ora('Checking repo legal ...').start();
		let resourcePkg = JSON.parse(fs.readFileSync(path.join(targetPath, 'package.json'), 'utf-8'));
		spinner.stop();
		if (!resourcePkg.cmd2app) {
			reject();
			logger.fatal('This repo is illegal for cmd2app. More info: https://github.com/luoye-fe/cmd2app');
		} else {
			logger.success('Check repo legal succeed.');
			resolve();
		}
	})
};

export const buildStatic = function(targetPath) {
	return new Promise((resolve, reject) => {
		let spinner = ora('Building static ...').start();
		webpackConfig.output.path = path.join(targetPath, 'render');
		webpack(webpackConfig, function(err, stats) {
			spinner.stop();
			if (err) {
				reject(error);
				logger.fatal(error);
			};
			logger.success('Build static succeed.');
			resolve();
		});
	})
};

export const buildMainUseBabel = function(targetPath) {
	return new Promise((resolve, reject) => {
		let spinner = ora('Transform file by babel ...').start();
		babelDir(path.join(__dirname, '../', 'template/main'), path.join(targetPath, './main'))
			.then(() => {
				spinner.stop();
				logger.success('Transform file succeed.');
				resolve();
			})
			.catch((err) => {
				spinner.stop();
				reject(err);
				logger.fatal(err);
			})
	})
};

export const generateMeatFile = function(targetPath, repoName) {
	return new Promise((resolve, reject) => {
		let resourcePkg = JSON.parse(fs.readFileSync(path.join(targetPath, 'package.json'), 'utf-8'));
		let cmd2appJSON = resourcePkg.cmd2app || {};
		cmd2appJSON.repository = `https://github.com/${repoName}`;
		let metaResult = '/*' +
			' * Meta for cmd2app.' +
			' */\n' +
			`window.metaJSON = ${JSON.stringify(cmd2appJSON)};`;
		fs.writeFile(path.join(targetPath, '../', 'render/meta.js'), metaResult, function(err) {
			if (err) {
				reject(err);
				logger.fatal(err);
			}
			// replace `title` info
			let indexHTMLPath = path.join(targetPath, '../', 'index.html');
			fs.writeFileSync(indexHTMLPath, fs.readFileSync(path.join(__dirname, '../', 'template/index.html'), 'utf-8').replace(/\{\{title\}\}/, cmd2appJSON.title || 'cmd2app'));
			resolve();
		});
	})
};

export const mergePackage = function(targetPath) {
	return new Promise((resolve, reject) => {
		let resourcePkg = fs.readFileSync(path.join(targetPath, 'package.json'));
		let mainPkg = fs.readFileSync(path.join(__dirname, '../', 'template/package.json'));
		let resultPkg = JSON.parse(merge(mainPkg, resourcePkg));
		resultPkg.main = './main/app.js';
		fs.writeFile(path.join(targetPath, '../package.json'), jsbeautify(JSON.stringify(resultPkg), {
			'indent_with_tabs': true,
			'indent_size': 4,
		}), (err) => {
			if (err) {
				reject(err);
				logger.fatal(err);
			}
			resolve();
		});
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
			logger.success(`Build asar succeed. app.asar in ${path.join(targetPath, '../dist/asar/app.asar')}`);
			resolve();
		})
	})
};
