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


import { Provider } from 'react-redux';

import configStore from './store/configStore';
import { LoginView } from './view';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading:true,
      store: configStore(()=>this.setState({isLoading:false}))
    }
  }

  render() {
    if(this.state.isLoading){
      return null;
    }
    return (
      <Provider store={this.state.store}>
        <LoginView />
      </Provider>

    );
  }
}

export default App;
