import { handleActions } from 'redux-actions';

export var wifi = handleActions({
  GET_CURRENT_WIFI_SSID_RESULT: (state, action) => ({...state, name:action.payload})
},{});
