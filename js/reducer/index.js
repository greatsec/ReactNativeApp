import { combineReducers } from 'redux';

import * as login from './login';
import * as codePush from './codePush';

export default combineReducers({
  ...login,
  ...codePush
});
