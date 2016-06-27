import { createAction } from 'redux-actions';
import * as qq from 'react-native-qq';
import * as wechat from 'react-native-wechat';

var logoutResult = createAction('LOGOUT_RESULT');

export var logout = () => dispatch => {
  return dispatch(logoutResult());
}

export var qqLogin = createAction('QQ_LOGIN', () => qq.login('get_simple_userinfo'));

export var wechatLogin = createAction('WECHAT_LOGIN',()=>new Promise((resolve, reject) => {
  wechat.sendAuthReq('snsapi_userinfo', '1234').then(code => {
    let APP_SECRET = 'ca67d5319eb1c22e469d0f8705439495';
    fetch(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wechat.APP_ID}&secret=${APP_SECRET}&code=${code}&grant_type=authorization_code`)
    .then(response => response.json())
    .then(json=>resolve(json.openid))
    .catch(reject);
  }).catch(reject);
}));

export var wechatShare = createAction('WECHAT_SHARE', ()=>wechat.sendMsgReq({text:'1234'},wechat.WXSceneTimeline));
