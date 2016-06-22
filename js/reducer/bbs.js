import { handleActions } from 'redux-actions';

export var bbs = handleActions({
  bbsPageResult: (state, action) => ({...state, list:action.payload.list}),
}, {list:[]});
