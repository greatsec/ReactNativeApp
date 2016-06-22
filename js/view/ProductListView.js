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
      <View style={{marginTop:100}}>

        <TouchableOpacity style={{height:48}} onPress={()=>Linking.openURL('https://item.taobao.com/item.htm?id=526010546355')}>
          <Text>安居侠气体检测仪</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{height:48}} onPress={()=>Linking.openURL('https://item.taobao.com/item.htm?id=526010546355')}>
          <Text>安居侠颗粒检测仪</Text>
        </TouchableOpacity>


      </View>);
  }
}

export default connect(state=>state)(V);
