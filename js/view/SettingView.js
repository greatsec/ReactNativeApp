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
      <View style={{marginTop:100}}>

        <View>
          <Text >SettingView</Text>
        </View>

        <TouchableOpacity onPress={Actions.userinfo}>
          <Text>个人信息</Text>
        </TouchableOpacity>



      </View>);
  }
}

export default connect(state=>state)(V);
