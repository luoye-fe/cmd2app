let state = {};

import { mixin } from 'utils';

import common from './common.js';
import metaJSON from './metaJSON.js';
import cmd from './cmd.js';

mixin(state, common);
mixin(state, metaJSON);
mixin(state, cmd);

export default state;
