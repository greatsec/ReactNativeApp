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
    this.props.action.getCurrentWifiSSID();
  }
  render(){
    return (
      <View>
        <View style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>设备型号</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.props.device.type}</Text>
            </View>
        </View>

        <View style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>连接的wifi名称</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.props.ssid}</Text>
            </View>
        </View>
        <View style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>设备系统版本</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.props.device.version}</Text>
            </View>
        </View>

        <View style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>产品条码</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.props.device.code}</Text>
            </View>
        </View>

        <View style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>IP地址</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.props.device.ip}</Text>
            </View>
        </View>

        <View style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>MAC地址</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.props.device.mac}</Text>
            </View>
        </View>

      </View>);
  }
}

export default connect(state=>({
  ssid:state.wifi.name,
  device: _find(state.deviceList.list, {id:state.deviceList.selected}) || _find(state.deviceList.slist, {id:state.deviceList.selected}),
}),dispatch=>({
  action: bindActionCreators({
    getCurrentWifiSSID: action.getCurrentWifiSSID
  }, dispatch)
}))(V);
