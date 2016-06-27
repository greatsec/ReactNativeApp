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

  onPressMobile(){
    if(this.props.user.mobile){
      this.props.action.unbindMobile();
    }else{
      Actions.bindMobile();
    }
  }
  onPressEmail(){
    if(this.props.user.email){
      this.props.action.unbindEmail();
    }else{
      Actions.bindEmail();
    }
  }

  onPressQQ(){
    if(this.props.user.qqcode){
      this.props.action.updateCode({qqcode:''});
    }
    else{
      this.props.action.qqLogin().then(({payload:qqcode})=>this.props.action.updateCode({qqcode}));
    }
  }

  onPressWechat(){
    if(this.props.user.weixincode){
      this.props.action.updateCode({weixincode:''});
    }else{
      this.props.action.wechatLogin().then(({payload:weixincode})=>this.props.action.updateCode({weixincode}));
    }
  }

  render(){
    return (
      <View style={{marginTop:100}}>

        <View>

          <Text style={{height:40}}>用户名: {this.props.user.loginName}</Text>

          <TouchableOpacity style={{height:40}} onPress={Actions.modifyName}>
            <Text >真实姓名 {this.props.user.name}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{height:40}} onPress={this.onPressMobile.bind(this)}>
            <Text >手机号 {this.props.user.mobile}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{height:40}} onPress={this.onPressEmail.bind(this)}>
            <Text >邮箱 {this.props.user.email}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{height:40}} onPress={this.onPressQQ.bind(this)}>
            <Text >QQ {this.props.user.qqcode}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{height:40}} onPress={this.onPressWechat.bind(this)}>
            <Text >微信 {this.props.user.weixincode}</Text>
          </TouchableOpacity>

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
  user:state.loginUser
}),dispatch=>({
  action: bindActionCreators({
    logout: action.logout,
    unbindEmail: action.unbindEmail,
    unbindMobile: action.unbindMobile,
    qqLogin: action.qqLogin,
    wechatLogin: action.wechatLogin,
    updateCode: action.updateCode,
  }, dispatch)
}))(V);
