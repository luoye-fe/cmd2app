let actions = {};

import { mixin } from 'utils';

import * as common from './common.js';
import * as cmd from './cmd.js';

mixin(actions, common);
mixin(actions, cmd);

export default actions;
