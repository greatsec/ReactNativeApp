import { combineReducers } from 'redux';

import * as login from './login';

export default combineReducers({
  ...login
});
