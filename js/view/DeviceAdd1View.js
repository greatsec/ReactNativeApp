import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import action from '../action';

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

        <View>
          <Text >1</Text>
        </View>

        <TouchableOpacity style={{height:48}} onPress={Actions.deviceAdd2}>
          <Text>空气颗粒检测仪</Text>
        </TouchableOpacity>


      </View>);
  }
}

export default connect(state=>state)(V);
