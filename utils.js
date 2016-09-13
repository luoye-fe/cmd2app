import fs from 'fs';

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
