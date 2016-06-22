import { createAction } from 'redux-actions';

import mapValues from 'lodash/mapValues';
import forEach from 'lodash/forEach';
var token = '';

var httpServer = 'http://www.tdong.cn/';
//var httpServer = 'http://192.168.3.59:8080/';
var httpApiList = {
  'login': {url:'api/login', obtainToken:true},
  'deviceList': {url:'api/admin/device/list', withToken:true},
  'deviceShareForMeList': {url:'api/admin/device/share', withToken:true},
  'deviceShareList': {url:'api/admin/deviceshare/list', withToken:true},
  'deviceUpdateName':{url:'api/admin/device/updateDeviceName', withToken:true},

  'deviceShare': {url:'api/admin/deviceshare/share', withToken:true},
  'deviceUnshare': {url:'api/admin/deviceshare/unshare', withToken:true},
  'deviceBind': {url:'api/admin/device/bind', withToken:true},
  'deviceUnbind': {url:'api/admin/device/unbind', withToken:true},


  'updatePhoto': {url:'api/admin/user/updatePhoto', withToken:true},
  'versionGet': 'api/version/get',
  'adviceSave': {url:'api/admin/advice/save', withToken:true},
  'userUpdate': {url:'api/admin/user/update', withToken:true},
  'userUpdatePassword': {url:'api/admin/user/updatePassword', withToken:true},
  'bbsPage': {url:'api/admin/anjuba/page', withToken:true},
  'bbsAdd': {url:'api/admin/anjuba/save', withToken:true},
  'bbsAddReply': {url:'api/admin/anjuba/saveReply', withToken:true},

};

var wsServer = 'ws://www.tdong.cn:60002/websocket';
var wsApiList = {
  'deviceRealtimeData':'304'
};

var httpActions = mapValues(httpApiList, (actionConfig, actionName) => {
  if(typeof(actionConfig) === 'string') actionConfig = {url:actionConfig};
  let requestAction = createAction(actionName + 'Request');
  let resultAction = createAction(actionName + 'Result',
    params => {
      let url = actionConfig.url;
      let body = new FormData();
      params = {...params, developer:'lumin824@163.com'};
      forEach(params, (o, k)=>{ body.append(k,o || '')});
      let headers = {};
      if(actionConfig.headers) headers = {...actionConfig.headers};
      if(actionConfig.withToken) headers['X-Auth-Token'] = token;
      return fetch(`${httpServer}${url}`, {body, method:'POST', headers}).then(response=>response.json())
        .then(json=>{
          console.log(json);
          if(!json.success) return Promise.reject({code:json.status, msg:json.message});
          if(actionConfig.obtainToken) token = json.info.token;
          return json.info;
        });
    }, params=>params
  );

  return params => dispatch => {
    dispatch(requestAction(params));
    return dispatch(resultAction(params));
  }
});

var ws;
var wsActions = mapValues(wsApiList, (actionConfig, actionName) => {
  return createAction(actionName,
    (...params) => Promise.race([new Promise((resolve, reject) => {
      let paramsstring = params.join(',');
      if(ws){
        ws.onmessage = evt => resolve({send:paramsstring,recv:evt.data.replace(/\n/g,'')});
        ws.send(actionConfig + ',' + paramsstring);
      }else{
        ws = new WebSocket(wsServer);
        ws.onopen = () => ws.send(actionConfig + ',' + params.join(','));
        ws.onmessage = evt => resolve({send:paramsstring,recv:evt.data.replace(/\n/g,'')});
      }

    }),new Promise((resolve, reject) => {
      setTimeout(()=>reject({code:-1,msg:'超时'}), 100000);
    })])
  );
});

var useToken = createAction('useToken', t=>{
  token = t;
  return t;
});

export default {
  ...httpActions,
  ...wsActions,
  useToken
}
