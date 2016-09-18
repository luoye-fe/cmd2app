let state = {};

import { mixin } from 'utils';

import common from './common.js';
import metaJSON from './metaJSON.js';

mixin(state, common);
mixin(state, metaJSON);

export default state;
