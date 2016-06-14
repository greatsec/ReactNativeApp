/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import CodePush from 'react-native-code-push';


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
  }

  componentDidMount(){
    CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
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
