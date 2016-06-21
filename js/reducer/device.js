import { handleActions } from 'redux-actions';

import _find from 'lodash/find';

export var deviceList = handleActions({
  deviceListResult: (state, action) => ({...state, list:action.payload}),
  SELECT_DEVICE: (state, action) => ({...state, selected:action.payload})
},{
  list:[],
});
