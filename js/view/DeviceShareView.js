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

  onPressSubmit(){
    let {deviceId} = this.props;
    let {username} = this.state;
    this.props.action.deviceShare({
      deviceId,username
    }).then(action=>{
      if(!action.error) Actions.pop();
    })
  }
  render(){
    return (
      <View style={{marginTop:100}}>

        <View>
          <Text>选择你要反馈的问题类型</Text>
        </View>


        <TextInput onChangeText={username=>this.setState({username})} style={{height:40}}/>

        <TouchableOpacity onPress={this.onPressSubmit.bind(this)}>
          <Text>提交</Text>
        </TouchableOpacity>


      </View>);
  }
}

export default connect(state=>({
  deviceId: state.deviceList.selected
}),dispatch=>({
  action: bindActionCreators({
    deviceShare: action.deviceShare
  }, dispatch)
}))(V);
