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

import _find from 'lodash/find';

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
          <Text>设备型号：{this.props.device.type}</Text>
        </View>
        <View>
          <Text>连接的wifi名称：</Text>
        </View>
        <View>
          <Text>设备系统版本：{this.props.device.version}</Text>
        </View>
        <View>
          <Text>产品条码：{this.props.device.code}</Text>
        </View>
        <View>
          <Text>IP地址：{this.props.device.ip}</Text>
        </View>
        <View>
          <Text>MAC地址：{this.props.device.mac}</Text>
        </View>


      </View>);
  }
}

export default connect(state=>({
  device: _find(state.deviceList.list, {id:state.deviceList.selected}) || _find(state.deviceList.slist, {id:state.deviceList.selected}),
}))(V);
