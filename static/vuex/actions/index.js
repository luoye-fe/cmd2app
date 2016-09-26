let actions = {};

import { mixin } from 'utils';

import * as common from './common.js';
import * as cmd from './cmd.js';
import * as history from './history.js';

mixin(actions, common);
mixin(actions, cmd);
mixin(actions, history);

export default actions;
