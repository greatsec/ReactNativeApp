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

        <View style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>微信公众号</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>安居侠</Text>
            </View>
        </View>

        <View style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>客服电话</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>400 880 6306</Text>
            </View>
        </View>

      </View>);
  }
}

export default connect(state=>state)(V);
