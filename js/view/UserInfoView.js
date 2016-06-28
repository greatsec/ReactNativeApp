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
      <View>

        <View style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>用户名</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.props.user.loginName}</Text>
            </View>
        </View>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.modifyName}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>真实姓名</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.props.user.name}</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={this.onPressMobile.bind(this)}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>手机号</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.props.user.mobile}</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={this.onPressEmail.bind(this)}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>邮箱</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.props.user.email}</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={this.onPressQQ.bind(this)}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>QQ</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.props.user.qqcode ? '已绑定' : '未绑定'}</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={this.onPressWechat.bind(this)}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>微信</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.props.user.weixincode ? '已绑定' : '未绑定'}</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.modifyPassword}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>修改密码</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={()=>{this.props.action.logout();Actions.login()}}>
            <View style={{justifyContent:'center', marginLeft:15}}>
              <Text>C</Text>
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>退出</Text>
            </View>
        </TouchableOpacity>
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
