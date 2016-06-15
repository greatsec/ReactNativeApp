/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppState,
} from 'react-native';

import codePush from 'react-native-code-push';

import { Provider } from 'react-redux';
import configStore from './store/configStore';

import { AboutView } from './view';

class App extends Component {

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
        <AboutView />
      </Provider>

    );
  }
}

export default App;
