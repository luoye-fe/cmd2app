export const mixin = (source, target) => {
	for (var i in target) {
		if (target.hasOwnProperty(i)) {
			source[i] = target[i];
		}
	}
	return source;
};

let utils = {};

utils.mixin = mixin;

import * as common from './common.js';
import * as storge from './storge.js';
mixin(utils, common);
mixin(utils, storge);


export default utils;
