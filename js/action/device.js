import { createAction } from 'redux-actions';

var deviceRefreshRequest = createAction('DEVICE_REFRESH_REQUEST');
var deviceRefreshResult = createAction('DEVICE_REFRESH_RESULT',
  (token) => fetch(`http://www.tdong.cn/api/admin/device/list`, {
    headers:{'X-Auth-Token':token}
  })
    .then(response=>response.json())
    .then(json=>json.success?json.info: Promise.reject({code:json.status, msg:json.message}))
);

export var deviceRefresh = (token) => dispatch => {
  dispatch(deviceRefreshRequest());
  return dispatch(deviceRefreshResult(token));
}
