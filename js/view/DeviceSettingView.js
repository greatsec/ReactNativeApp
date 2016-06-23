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

  onPressUnbind(){
    let {code} = this.props.device;
    this.props.action.deviceUnbind({code}).then(action=>{
      if(!action.error){
        Actions.callback({type: 'BODGE'});
      }
    });
  }
  render(){
    return (
      <View style={{marginTop:100}}>

        <View>
          <Text >设备设置</Text>
        </View>
        {this.props.device.canModifyName ? (
          <TouchableOpacity style={{height:40}} onPress={Actions.deviceModifyName}>
            <Text >修改名称</Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity style={{height:40}} onPress={Actions.deviceInfo}>
          <Text >设备信息</Text>
        </TouchableOpacity>

        {this.props.device.canShare ? (
          <TouchableOpacity style={{height:40}} onPress={Actions.deviceShare}>
            <Text >设备共享</Text>
          </TouchableOpacity>
        ) : null}

        {this.props.device.canOTA ? (
          <TouchableOpacity style={{height:40}} onPress={Actions.building}>
            <Text >设备系统升级</Text>
          </TouchableOpacity>
        ) : null}


        {this.props.device.canUnbind ? (
          <TouchableOpacity style={{height:40}} onPress={this.onPressUnbind.bind(this)}>
            <Text >解除绑定</Text>
          </TouchableOpacity>
        ) : null}

        {this.props.device.canNetConfig ? (
          <TouchableOpacity style={{height:40}} onPress={Actions.deviceNetConfig}>
            <Text >网络配置</Text>
          </TouchableOpacity>
        ) : null}


      </View>);
  }
}

export default connect(state=>({
  device: _find(state.deviceList.list, {id:state.deviceList.selected}) || _find(state.deviceList.slist, {id:state.deviceList.selected}),
}),dispatch=>({
  action: bindActionCreators({
    deviceUnbind: action.deviceUnbind,
    deviceRefresh: action.deviceRefresh
  }, dispatch)
}))(V);
