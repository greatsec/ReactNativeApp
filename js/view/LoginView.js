import React, { Component } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  NativeModules
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import action from '../action';

import IconFont from '../IconFont';

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
    this.props.action.wechatLogin().then(({payload:weixincode})=>this.props.action.codeLogin({weixincode}))
    .then(action=>{
      if(!action.error){
        Actions.main();
      }
    });
  }

  render() {
    return (
      <View>
        <View style={{
            flexDirection:'row',
            alignItems:'center',
            height:45,
            marginHorizontal:15, marginTop:50,
            borderRadius:3,
            backgroundColor:'#fff'
          }}>
          <IconFont name="wechat" style={{backgroundColor:'transparent', marginLeft:10}} size={24} color="#BABABA" />
          <TextInput style={{
              flex:1,
              marginLeft:10,
              backgroundColor:'transparent',
            }} onChangeText={(username)=>this.setState({username})} value={this.state.username} />
        </View>

        <View style={{
            flexDirection:'row',
            alignItems:'center',
            height:45,
            marginHorizontal:15, marginTop:1,
            borderRadius:3,
            backgroundColor:'#fff'
          }}>
          <IconFont name="password" style={{backgroundColor:'transparent', marginLeft:10}} size={24} color="#BABABA" />
          <TextInput style={{
              flex:1,
              marginLeft:10,
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
            marginHorizontal:15, marginTop:5,
            borderRadius:3,
            backgroundColor:'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} onPress={this.onPressLogin.bind(this)} >
          <Text style={{ color:'#fff',fontSize:18}}>登陆</Text>
        </TouchableOpacity>
        <View style={{
            flexDirection:'row',
            marginHorizontal:20,
            justifyContent:'space-between'}}>
          <TouchableOpacity onPress={Actions.resetPassword}>
            <Text style={{marginHorizontal:20, marginVertical:15, color:'#419BF9', fontSize:14}}>忘记密码</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={Actions.register}>
            <Text style={{marginHorizontal:20, marginVertical:15, color:'#419BF9', fontSize:14}}>用户注册</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row', alignItems:'center'}}>
          <View style={{borderTopWidth:1,flex:1, marginHorizontal:15, borderColor:'#C3C3C3'}} />
          <Text style={{color:'#C3C3C3',fontSize:14}}>其他账号登陆</Text>
          <View style={{borderTopWidth:1,flex:1, marginHorizontal:15, borderColor:'#C3C3C3'}} />
        </View>

        <View style={{marginTop:45,flexDirection:'row', justifyContent:'center'}}>
          <TouchableOpacity style={{
              alignItems:'center', justifyContent:'center',
              backgroundColor:'#319BFD',
              height:44,width:44,
              marginRight:22,
              borderRadius:22}} onPress={this.onPressQQ.bind(this)}>
              <IconFont name="qq" style={{backgroundColor:'transparent'}} size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={{
              alignItems:'center', justifyContent:'center',
              backgroundColor:'#12DF26',
              height:44,width:44,
              marginLeft:22,
              borderRadius:22}} onPress={this.onPressWechat.bind(this)}>
              <IconFont name="wechat" style={{backgroundColor:'transparent'}} size={24} color="#fff" />
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
    wechatLogin: action.wechatLogin
  }, dispatch)
}))(V);
