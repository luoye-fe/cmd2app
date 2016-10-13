import fs from 'fs';
import path from 'path';

import * as babel from 'babel-core';
import rd from 'rd';


export const isEmptySync = (searchPath) => {
	try {
		var stat = fs.statSync(searchPath);
	} catch (e) {
		return true;
	}
	if (stat.isDirectory()) {
		var items = fs.readdirSync(searchPath);
		return !items || !items.length;
	}
	var file = fs.readFileSync(searchPath);
	return !file || !file.length;
};

export const babelDir = (src, dist) => {
	return new Promise((resolve, reject) => {
		if (!fs.existsSync(dist)) {
			fs.mkdirSync(dist);
		}
		rd.readFile(src, (err, files) => {
			if (err) reject(err);
			let cur = 0;
			files.forEach((item) => {
				babel.transformFile(item, {
					
				}, function(error, result) {
					if (error) reject(error);
					let target = path.join(dist, item.replace(src, ''));
					if (!fs.existsSync(target) && !fs.existsSync(target.replace(path.basename(target), ''))) {
						fs.mkdirSync(target.replace(path.basename(target), ''));
					}
					fs.writeFileSync(target, result.code);
					cur++;
					if (cur === files.length) {
						resolve();
					}
				});
			})
		})
	})
};
