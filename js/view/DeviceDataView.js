import React, { Component } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import action from '../action';


import _find from 'lodash/find';


class V extends Component {
  componentDidMount(){

    this._interval = setInterval(this.updateData.bind(this), 5000);
  }
  updateData(){
    if(this.props.isFocus){
      if(!this.stop){
        this.stop = true;
        this.props.action.deviceRealtimeData(this.props.device.code).then(action=>{
          this.stop = false;
        });
      }
    }
  }
  componentWillUnmount(){
    if(this._interval){
      clearInterval(this._interval);
    }
  }
  render(){
    return (
      <View>
        <Text style={{marginTop:100}}>设备名称：{this.props.device.name}</Text>
        <Text style={{marginTop:10}}>PM1.0：{this.props.device.data.pm1}</Text>
        <Text style={{marginTop:10}}>PM2.5：{this.props.device.data.pm25}</Text>
        <Text style={{marginTop:10}}>PM10：{this.props.device.data.pm10}</Text>
        <Text style={{marginTop:10}}>温度：{this.props.device.data.temperature}</Text>
        <Text style={{marginTop:10}}>湿度：{this.props.device.data.humidity}</Text>
      </View>
    )
  }
}

export default connect(state=>({
  device: (_find(state.deviceList.list, {id:state.deviceList.selected}) || _find(state.deviceList.slist, {id:state.deviceList.selected})),
  isFocus: (state.nav.focusName == 'deviceData') || (state.nav.focusName == 'device' && state.nav.jumpName == 'deviceData')
}),dispatch=>({
  action: bindActionCreators({
    selectDevice: action.selectDevice,
    deviceRealtimeData: action.deviceRealtimeData
  }, dispatch)
}))(V);
