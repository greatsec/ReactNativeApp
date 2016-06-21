import { combineReducers } from 'redux';

import * as login from './login';
import * as codePush from './codePush';
import * as device from './device';
import * as nav from './nav';

export default combineReducers({
  ...login,
  ...codePush,
  ...device,
  ...nav
});
