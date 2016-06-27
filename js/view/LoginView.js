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
    this.state = {
      ...this.props.loginForm
    };
  }

  onPressLogin(){
    let { username, password } = this.state;
    this.props.action.login({username, password})
      .then(action=>{
        if(!action.error){
          Actions.main();
        }
      });
  }
  onPressQQ(){
    this.props.action.qqLogin().then(({payload:qqcode})=>this.props.action.codeLogin({qqcode}))
    .then(action=>{
      if(!action.error){
        Actions.main();
      }
    });
  }

  onPressWechat(){
    this.props.action.wechatLogin().then(action=>console.log(action));
    this.props.action.wechatLogin().then(({payload:weixincode})=>this.props.action.codeLogin({weixincode}))
    .then(action=>{
      if(!action.error){
        Actions.main();
      }
    });
  }
  render() {
    return (
      <View style={{marginTop:100}}>
        <View style={{
            height:40,
            marginHorizontal:10, marginVertical:5,
            borderWidth:1,
            borderRadius:3
          }}>
          <TextInput style={{
              flex:1,
              marginHorizontal:5,
              backgroundColor:'transparent',
            }} onChangeText={(username)=>this.setState({username})} value={this.state.username} />
        </View>

        <View style={{
            height:40,
            marginHorizontal:10, marginVertical:5,
            borderWidth:1,
            borderRadius:3
          }}>
          <TextInput style={{
              flex:1,
              marginHorizontal:5,
              backgroundColor:'transparent',
            }} onChangeText={(password)=>this.setState({password})} value={this.state.password} />
        </View>

        {this.props.loginStatus.msg ?
        <View style={{
            height:20,
            marginHorizontal:10, marginVertical:5,
            borderRadius:3,
            backgroundColor:this.props.loginStatus.isError?'#f00':'#0f0',
            justifyContent:'center'}}>
          <Text style={{ marginLeft:5, backgroundColor:'transparent', color:'#fff'}}>{this.props.loginStatus.msg}</Text>
        </View>
        :null}

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:10, marginVertical:5,
            borderRadius:3,
            backgroundColor:'#00f',
            alignItems:'center', justifyContent:'center'
          }} onPress={this.onPressLogin.bind(this)} >
          <Text style={{ color:'#fff'}}>登陆1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:40,
            marginTop:10,
            marginHorizontal:10, marginVertical:5,
            borderRadius:3,
            backgroundColor:'#00f',
            alignItems:'center', justifyContent:'center'
          }} onPress={this.onPressQQ.bind(this)} >
          <Text style={{ color:'#fff'}}>QQ登陆</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:40,
            marginTop:10,
            marginHorizontal:10, marginVertical:5,
            borderRadius:3,
            backgroundColor:'#00f',
            alignItems:'center', justifyContent:'center'
          }} onPress={this.onPressWechat.bind(this)} >
          <Text style={{ color:'#fff'}}>微信登陆</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:40,
            marginTop:10,
            marginHorizontal:10, marginVertical:5,
            borderRadius:3,
            backgroundColor:'#00f',
            alignItems:'center', justifyContent:'center'
          }} onPress={this.props.action.wechatShare} >
          <Text style={{ color:'#fff'}}>微信分享</Text>
        </TouchableOpacity>



        <View style={{flexDirection:'row', height:50, justifyContent:'space-between'}}>
          <TouchableOpacity onPress={Actions.resetPassword}>
            <Text>忘记密码</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={Actions.register}>
            <Text>用户注册</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    login: action.login,
    codeLogin: action.codeLogin,
    qqLogin: action.qqLogin,
    wechatLogin: action.wechatLogin,
    wechatShare: action.wechatShare
  }, dispatch)
}))(V);
