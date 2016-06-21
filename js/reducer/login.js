import { handleActions } from 'redux-actions';

export var loginStatus = handleActions({
  loginRequest: (state, action) => ({msg:'登陆中...', isError: false, isFetching: true}),
  loginResult: (state, action) => ({msg:action.error?action.payload.msg:'登陆成功', isError:action.error, isFetching:false})
},{
});

export var loginForm = handleActions({
  loginRequest: (state, action) => ({...state, newAccount:{...action.payload}}),
  loginResult: (state, action) => (action.error? state: state.newAccount)
}, {
});

export var loginUser = handleActions({
  loginResult: (state, action) => (action.error? state: action.payload),
  LOGOUT_RESULT: (state, action) => ({})
},{});
