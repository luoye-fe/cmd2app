let mutations = {};

import { mixin } from 'utils';

import * as common from './common.js';
import * as history from './history.js';

mixin(mutations, common);
mixin(mutations, history);

export default mutations;
