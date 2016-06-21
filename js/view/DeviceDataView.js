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
  }
  render(){
    return <Text style={{marginTop:100}}>{this.props.device.name}</Text>
  }
}

export default connect(state=>({
  ...state,
  device: _find(state.deviceList.list, {id:state.deviceList.selected})
}),dispatch=>({
  action: bindActionCreators({
    selectDevice: action.selectDevice,
  }, dispatch)
}))(V);
