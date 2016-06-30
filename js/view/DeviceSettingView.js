import React, { Component } from 'react';
import {
  Alert,
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
    /*this.props.action.deviceUnbind({code}).then(action=>{
      if(!action.error){
        Actions.callback({type: 'BODGE'});
      }
    });*/

    Alert.alert('确认','确认删除设备吗？', [
        {text:'取消'},
        {text:'确定',onPress:()=>this.props.action.deviceUnbind({code}).then(action=>{
          if(action.error){

          }
          else{
            Actions.callback({type: 'BODGE'});
          }
        })}]);
  }
  render(){
    return (
      <View>
        <TouchableOpacity style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.deviceInfo}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>设备信息</Text>
            </View>
        </TouchableOpacity>

        {this.props.device.canModifyName ? (
          <TouchableOpacity style={{
              height:45, marginTop:1,
              flexDirection:'row',
              backgroundColor:'#fff'}} onPress={Actions.deviceModifyName}>
              <View style={{justifyContent:'center', marginLeft:15}}>
                <Text>C</Text>
              </View>
              <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:15}}>修改名称</Text>
              </View>
          </TouchableOpacity>
        ) : null}

        {this.props.device.canShare ? (
          <TouchableOpacity style={{
              height:45, marginTop:1,
              flexDirection:'row',
              backgroundColor:'#fff'}} onPress={Actions.deviceShare}>
              <View style={{justifyContent:'center', marginLeft:15}}>
                <Text>C</Text>
              </View>
              <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:15}}>设备共享</Text>
              </View>
          </TouchableOpacity>
        ) : null}

        {this.props.device.canOTA ? (
          <TouchableOpacity style={{
              height:45, marginTop:1,
              flexDirection:'row',
              backgroundColor:'#fff'}} onPress={Actions.deviceOTA}>
              <View style={{justifyContent:'center', marginLeft:15}}>
                <Text>C</Text>
              </View>
              <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:15}}>设备系统升级</Text>
              </View>
          </TouchableOpacity>
        ) : null}


        {this.props.device.canUnbind ? (
          <TouchableOpacity style={{
              height:45, marginTop:1,
              flexDirection:'row',
              backgroundColor:'#fff'}} onPress={this.onPressUnbind.bind(this)}>
              <View style={{justifyContent:'center', marginLeft:15}}>
                <Text>C</Text>
              </View>
              <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:15}}>解除绑定</Text>
              </View>
          </TouchableOpacity>
        ) : null}

        {this.props.device.canNetConfig ? (
          <TouchableOpacity style={{
              height:45, marginTop:1,
              flexDirection:'row',
              backgroundColor:'#fff'}} onPress={Actions.deviceNetConfig}>
              <View style={{justifyContent:'center', marginLeft:15}}>
                <Text>C</Text>
              </View>
              <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                <Text style={{fontSize:15}}>网络配置</Text>
              </View>
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
