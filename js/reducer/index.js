import { combineReducers } from 'redux';

import * as login from './login';
import * as device from './device';
import * as nav from './nav';
import * as bbs from './bbs';

export default combineReducers({
  ...login,
  ...device,
  ...nav,
  ...bbs,
});
