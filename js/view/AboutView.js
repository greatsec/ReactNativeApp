import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import action from '../action';

import codePush from 'react-native-code-push';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
  }
  render(){
    return (
      <View style={{marginTop:100}}>


        <TextInput style={{height:40}}/>
        <Text >1111</Text>


      </View>);
  }
}

export default connect(state=>state)(V);
