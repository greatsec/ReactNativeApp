/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  AppState,
} from 'react-native';

import codePush from 'react-native-code-push';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
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

class App extends Component {
  componentDidMount(){
    this.props.action.useToken(this.props.token);
  }
  render(){

    console.log(view);
    return (
      <RouterWithRedux>
        <Scene key="login" component={ view.LoginView } title="登陆" initial={this.props.initialLogin}/>
        <Scene key="about" component={ view.AboutView } title="关于" type="replace"/>
        <Scene key="deviceList" component={ view.DeviceListView } title="关于" type="replace" initial={!this.props.initialLogin}/>
        <Scene key="device" tabs={true}>
          <Scene key='deviceData' component={view.DeviceDataView} title="检测" icon={TabIcon} />
          <Scene key='deviceChart' component={view.DeviceChartView} title="趋势" icon={TabIcon} />
        </Scene>
    </RouterWithRedux>
    );
  }
}

const AppWithRedux = connect(state=>({
  token: state.loginUser && state.loginUser.token,
  initialLogin: true,//!state.loginUser || !state.loginUser.token
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
