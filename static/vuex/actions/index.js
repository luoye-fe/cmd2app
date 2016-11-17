let actions = {};

import { mixin } from 'utils';

import * as common from './common.js';
import * as history from './history.js';

mixin(actions, common);
mixin(actions, history);

export default actions;
