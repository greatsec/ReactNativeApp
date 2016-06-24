import { createAction } from 'redux-actions';
import * as qq from 'react-native-qq';

var logoutResult = createAction('LOGOUT_RESULT');

export var logout = () => dispatch => {
  return dispatch(logoutResult());
}

export var qqLogin = createAction('QQ_LOGIN', () => qq.login('get_simple_userinfo'));
