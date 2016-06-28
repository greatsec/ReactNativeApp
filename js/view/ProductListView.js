import React, { Component } from 'react';
import {
  Linking,
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
            backgroundColor:'#fff'}} onPress={()=>Linking.openURL('https://item.taobao.com/item.htm?id=526010546355')}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>安居侠气体检测仪</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={()=>Linking.openURL('https://item.taobao.com/item.htm?id=526010546355')}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>安居侠颗粒检测仪</Text>
            </View>
        </TouchableOpacity>

      </View>);
  }
}

export default connect(state=>state)(V);
