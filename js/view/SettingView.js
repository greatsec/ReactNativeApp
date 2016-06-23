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
          <Text >SettingView</Text>
        </View>

        <TouchableOpacity style={{height:48}} onPress={Actions.userinfo}>
          <Text>个人信息</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{height:48}} onPress={Actions.deviceShareList}>
          <Text>设备分享</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{height:48}} onPress={Actions.feedback}>
          <Text>意见反馈</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{height:48}} onPress={Actions.about}>
          <Text>关于</Text>
        </TouchableOpacity>



      </View>);
  }
}

export default connect(state=>state)(V);
