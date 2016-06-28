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
            backgroundColor:'#fff'}} onPress={Actions.bbs}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>安居吧</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.productList}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>安居侠系列</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.building}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>其他设备</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.building}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>设备互联</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.building}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>智能场景</Text>
            </View>
        </TouchableOpacity>
      </View>);
  }
}

export default connect(state=>state)(V);
