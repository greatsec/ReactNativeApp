/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  AppState,
  BackAndroid,
  TouchableOpacity,
} from 'react-native';

import codePush from 'react-native-code-push';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Scene, Router, Actions,Reducer } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import configStore from './store/configStore';

import {capture} from 'react-native-screenshot';

import action from './action';
import * as view from './view';
import IconFont from './IconFont';

const RouterWithRedux = connect()(Router);
var first = null;

class TabIcon extends Component {
    render(){
      let iconName = this.props.selected ? this.props.activeIconName || this.props.iconName : this.props.iconName;
      let color = this.props.selected ? '#18B4ED' : '#B3B3B3';
        return (
          <View style={{alignItems:'center'}}>
            <IconFont name={iconName} style={{backgroundColor:'transparent'}} size={24} color={color} />
            <Text style={{color, fontSize:11}}>{this.props.iconText || this.props.title}</Text>
          </View>
        );
    }
}

class NavBar extends Component {
  render(){
    return (
      <Text>Nav</Text>
    );
  }
}

class BackButton extends Component {
  render(){
    return (
      <TouchableOpacity style={[this.props.style,{borderWidth:0}]} onPress={Actions.pop}>
        <Text style={{color:'#fff'}}>返回</Text>
      </TouchableOpacity>
    );
  }
}

const customRouterReducer = params => {

  const defaultReducer = Reducer(params);
  return (state, action)=>{
      if(action.type == 'BODGE') {
        if(state.children.length > 1) {
          state = Object.assign({}, state, {index: 0, children : state.children.slice(0,1)});
         }
      } else {
        state = defaultReducer(state, action);
      }
      return state;
  };
}
const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#f1f1f1',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

class App extends Component {
  componentDidMount(){
    this.props.action.useToken(this.props.token);
  }
  render(){
    return (
      <RouterWithRedux createReducer={customRouterReducer}
        getSceneStyle={getSceneStyle}
        navigationBarStyle={{backgroundColor:'#18B4ED'}}
        titleStyle={{color:'#fff'}}>
        <Scene key='login' component={view.LoginView} title='登陆' initial={this.props.initialLogin} hideNavBar={false} type='reset'/>
        <Scene key='resetPassword' component={view.ResetPasswordView} title='忘记密码' hideNavBar={false} />
        <Scene key='register' component={view.RegisterView} title='注册' hideNavBar={false} />
        <Scene key='provision' component={view.ProvisionView} title='条款' hideNavBar={false} />

        <Scene key='main' tabs={true} initial={!this.props.initialLogin} type='replace'>
          <Scene key='deviceList' component={ view.DeviceListView } title='我的设备' icon={TabIcon} iconText='设备' iconName='home' activeIconName='home-fill'/>
          <Scene key='discovery' component={ view.DiscoveryView } title='发现' icon={TabIcon} iconName='faxian' activeIconName='faxian-fill'/>
          <Scene key='message' component={ view.MessageView } title='消息' icon={TabIcon} iconName='message' activeIconName='message-fill'/>
          <Scene key='setting' component={ view.SettingView } title='我的' icon={TabIcon} iconName='my' activeIconName='my-fill'/>
        </Scene>
        <Scene key='device' tabs={true} type='push' >
          <Scene key='deviceData' component={view.DeviceDataView} title='检测' icon={TabIcon} iconName='search' backButton={BackButton} onRight={()=>Actions.deviceSetting()} rightTitle='更多'/>
          <Scene key='deviceChart' component={view.DeviceChartView} title='趋势' icon={TabIcon} iconName='qushi' onRight={()=>capture().then(uri=>Actions.shareImage({image:'file://'+uri}))} rightTitle='分享' />
        </Scene>
        <Scene key='deviceSetting' component={view.DeviceSettingView} title='设置' />
        <Scene key='deviceModifyName' component={view.DeviceModifyNameView} title='修改设备名称' />
        <Scene key='deviceInfo' component={view.DeviceInfoView} title='设备信息' />
        <Scene key='deviceShare' component={view.DeviceShareView} title='设备分享' />
        <Scene key='deviceNetConfig' component={view.DeviceNetConfigView} title='网络配置' />
        <Scene key='deviceOTA' component={view.DeviceOTAView} title='硬件升级' />
        <Scene key='deviceAdd' component={view.DeviceAdd1View} title='设备添加1' />
        <Scene key='deviceAdd2' component={view.DeviceAdd2View} title='设备添加2' />
        <Scene key='deviceAdd3' component={view.DeviceAdd3View} title='设备添加3' />
        <Scene key='bbs' component={view.BBSView} title='安居吧' />
        <Scene key='productList' component={view.ProductListView} title='产品列表' />
        <Scene key='bbsAdd' component={view.BBSAddView} title='添加帖子' />
        <Scene key='bbsAddReply' component={view.BBSAddReplyView} title='选择回复' />

        <Scene key='messageDetail' component={view.MessageDetailView} title='消息' />
        <Scene key='userinfo' component={view.UserInfoView} title='个人信息'/>
        <Scene key='modifyName' component={view.ModifyNameView} title='修改姓名' />
        <Scene key='modifyPassword' component={view.ModifyPasswordView} title='修改密码' />
        <Scene key='bindMobile' component={view.BindMobileView} title='绑定手机号' />
        <Scene key='bindEmail' component={view.BindEmailView} title='绑定邮箱' />
        <Scene key='deviceShareList' component={view.DeviceShareListView} title='已分享' />
        <Scene key='feedback' component={view.FeedbackView} title='意见反馈'/>
        <Scene key='about' component={view.AboutView} title='关于'/>
        <Scene key='building' component={view.BuildingView} title='建设中' />
        <Scene key='shareImage' component={view.ShareImageView} title='分享到' />
    </RouterWithRedux>
    );
  }
}

const AppWithRedux = connect(state=>({
  token: state.loginUser && state.loginUser.token,
  initialLogin: !state.loginUser || !state.loginUser.token
}), dispatch=>({
  action: bindActionCreators({
    useToken: action.useToken
  },dispatch)
}))(App);

class AppWarp extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading:true,
      store: configStore(()=>this.setState({isLoading:false}))
    }

    this._handleAppStateChange = this.handleAppStateChange.bind(this);
    this._handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount(){
    AppState.addEventListener('change', this._handleAppStateChange);
	BackAndroid.addEventListener('hardwareBackPress', this._handleBackButton);

    if(!__DEV__){
      codePush.sync({installMode: codePush.InstallMode.ON_NEXT_RESUME});
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButton);
  }

  handleAppStateChange(appState){
    if (appState === 'active') {
      if(!__DEV__){
        codePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
      }

    }
  }

  handleBackButton(){
/*
    {
      if(!first){
        first = new Date().getTime();
        ToastAndroid.show('再按一次退出应用', 1000);
        setTimeout(function() {
            first=null;
        }, 1000);
      }else{
        if (new Date().getTime() - first < 1000) {
            BackAndroid.exitApp();
        }
      }
    }
    */
    {
      Actions.pop();
    }

    return true;
  }
  render() {
    if(this.state.isLoading){
      return null;
    }

    return (
      <Provider store={this.state.store}>
        <AppWithRedux />
      </Provider>

    );
  }
}

export default AppWarp;
