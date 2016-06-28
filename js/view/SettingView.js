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
      <View>

        <TouchableOpacity style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.userinfo}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>个人信息</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.deviceShareList}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>设备分享</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.feedback}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>意见反馈</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.about}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>关于</Text>
            </View>
        </TouchableOpacity>
      </View>);
  }
}

export default connect(state=>state)(V);
