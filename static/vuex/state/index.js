let state = {};

import { mixin } from 'utils';

import common from './common.js';
import metaJSON from './metaJSON.js';
import history from './history.js';

mixin(state, common);
mixin(state, metaJSON);
mixin(state, history);

export default state;
