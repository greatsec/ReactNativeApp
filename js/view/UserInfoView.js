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

          <Text style={{height:40}}>用户名: {this.props.user.loginName}</Text>

          <TouchableOpacity style={{height:40}} onPress={Actions.modifyName}>
            <Text >真实姓名 {this.props.user.name}</Text>
          </TouchableOpacity>
          <Text style={{height:40}}>手机号: {this.props.user.mobile}</Text>

          <Text style={{height:40}}>邮箱:{this.props.user.email}</Text>

          <TouchableOpacity style={{height:40}} onPress={Actions.modifyPassword}>
            <Text >修改密码</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{height:40}} onPress={()=>{this.props.action.logout();Actions.login()}}>
            <Text >退出</Text>
          </TouchableOpacity>
        </View>
      </View>);
  }
}

export default connect(state=>({
  user:state.loginUser.user
}),dispatch=>({
  action: bindActionCreators({
    logout: action.logout
  }, dispatch)
}))(V);
