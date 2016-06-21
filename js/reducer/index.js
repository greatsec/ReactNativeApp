import { combineReducers } from 'redux';

import * as login from './login';
import * as codePush from './codePush';
import * as device from './device';

export default combineReducers({
  ...login,
  ...codePush,
  ...device
});
