import { createAction } from 'redux-actions';

var loginRequest = createAction('LOGIN_REQUEST');
var loginResult = createAction('LOGIN_RESULT',
  (username, password) => fetch(`http://www.tdong.cn/api/login?username=${username}&password=${password}`)
    .then(response=>response.json())
    .then(json=>json.success?json.info: Promise.reject({code:json.status, msg:json.message}))
);

export var login = (username, password) => dispatch => {
  dispatch(loginRequest({username,password}));
  return dispatch(loginResult(username, password));
}
