import { createAction } from 'redux-actions';

var logoutResult = createAction('LOGOUT_RESULT');

export var logout = () => dispatch => {
  return dispatch(logoutResult());
}
