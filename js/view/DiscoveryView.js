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
          <Text>DiscoveryView</Text>
        </View>

        <TouchableOpacity style={{height:48}} onPress={Actions.bbs}>
          <Text>安居吧</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{height:48}} onPress={Actions.productList}>
          <Text>安居侠系列</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{height:48}} onPress={Actions.building}>
          <Text>其他设备</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{height:48}} onPress={Actions.building}>
          <Text>设备互联</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{height:48}} onPress={Actions.building}>
          <Text>智能场景</Text>
        </TouchableOpacity>


      </View>);
  }
}

export default connect(state=>state)(V);
