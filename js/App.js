/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  AppState,
  TouchableOpacity,
} from 'react-native';

import codePush from 'react-native-code-push';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import configStore from './store/configStore';

import action from './action';
import * as view from './view';

const RouterWithRedux = connect()(Router);

class TabIcon extends Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? "red" :"black"}}>{this.props.title}</Text>
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
      <TouchableOpacity style={[this.props.style,{borderWidth:1}]} onPress={Actions.pop}>
        <Text>BackButton</Text>
      </TouchableOpacity>
    );
  }
}

class App extends Component {
  componentDidMount(){
    this.props.action.useToken(this.props.token);
  }
  render(){

    console.log(view);
    return (
      <RouterWithRedux>
        <Scene key="login" component={ view.LoginView } title="登陆" initial={this.props.initialLogin} hideNavBar={true} type='reset'/>
        <Scene key='main' tabs={true} initial={!this.props.initialLogin} type='replace'>
          <Scene key="deviceList" component={ view.DeviceListView } title="设备" icon={TabIcon}/>
          <Scene key="discover" component={ view.DiscoveryView } title="发现" icon={TabIcon}/>
          <Scene key="message" component={ view.MessageView } title="消息" icon={TabIcon}/>
          <Scene key="setting" component={ view.SettingView } title="我的" icon={TabIcon}/>
        </Scene>
        <Scene key="device" tabs={true} type='push' >
          <Scene key='deviceData' component={view.DeviceDataView} title="检测" icon={TabIcon} backButton={BackButton}/>
          <Scene key='deviceChart' component={view.DeviceChartView} title="趋势" icon={TabIcon} />
        </Scene>
        <Scene key='userinfo' component={view.UserInfoView} title='个人信息'/>
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
  }

  componentDidMount(){
    AppState.addEventListener('change', this._handleAppStateChange);

    if(!__DEV__){
      codePush.sync({installMode: codePush.InstallMode.ON_NEXT_RESUME});
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  handleAppStateChange(appState){
    if (appState === 'active') {
      if(!__DEV__){
        codePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
      }

    }
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
