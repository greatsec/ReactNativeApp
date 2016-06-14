import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import codePush from 'react-native-code-push';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
    codePush.checkForUpdate().then(e=>this.setState({text:JSON.stringify(e)}));
  }
  render(){
    return (<View style={{marginTop:100}}>
      <TextInput style={{height:40}}/>
      <Text >{this.state.text}</Text></View>);
  }
}

export default V
