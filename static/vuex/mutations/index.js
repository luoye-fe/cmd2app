let mutations = {};

import { mixin } from 'utils';

import * as common from './common.js';
import * as cmd from './cmd.js';

mixin(mutations, common);
mixin(mutations, cmd);

export default mutations;
