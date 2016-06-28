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

class V1 extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
  }
  onPressCode(){
    let { mobile } = this.state;
    this.props.action.mobileCode({mobile});
  }

  onPressSubmit(){
    let { mobile, password,code} = this.state;
    this.props.action.register({mobile, password,code}).then(action=>{
      if(!action.error) Actions.pop();
    });
  }
  render(){
    return (
      <View style={[this.props.styel]}>
        <View style={{
            height:45,
            marginHorizontal:15, marginTop:50,
            borderTopRightRadius:3,borderTopLeftRadius:3,
            backgroundColor:'#fff'
          }}>
          <TextInput style={{
              flex:1,
              marginHorizontal:5,
              backgroundColor:'transparent',
            }} onChangeText={mobile=>this.setState({mobile})} placeholder='手机号' />
        </View>

        <View style={{
            height:45,
            marginHorizontal:15, marginTop:1,
            backgroundColor:'#fff'
          }}>
          <TextInput style={{
              flex:1,
              marginHorizontal:5,
              backgroundColor:'transparent',
            }} onChangeText={password=>this.setState({password})} placeholder='密码' />
        </View>

        <View style={{
            flexDirection:'row',
            height:45,
            marginHorizontal:15, marginTop:1,
            borderBottomRightRadius:3,borderBottomLeftRadius:3,
            backgroundColor:'#fff'
          }}>
          <TextInput style={{
              flex:1,
              marginHorizontal:5,
              backgroundColor:'transparent',
            }} onChangeText={code=>this.setState({code})} placeholder='验证码' />
          <TouchableOpacity style={{
              justifyContent:'center',
              backgroundColor:'#FF5E45',
              borderBottomRightRadius:3,
            }} onPress={this.onPressCode.bind(this)}>
            <Text style={{marginHorizontal:10,color:'#fff',fontSize:16}}>获取验证码</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:15, marginTop:25,
            borderRadius:3,
            backgroundColor:'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} onPress={this.onPressSubmit.bind(this)} >
          <Text style={{ color:'#fff',fontSize:18}}>确定</Text>
        </TouchableOpacity>
      </View>);
  }
}
let ByMobile = connect(state=>state,dispatch=>({
  action: bindActionCreators({
    register: action.register,
    mobileCode: action.mobileCode
  }, dispatch)
}))(V1);

class V2 extends Component {
  onPressSubmit(){
    let { email, password} = this.state;
    this.props.action.registerEmail({email, password}).then(action=>{
      if(!action.error) Actions.pop();
    });
  }
  render(){
    return (
      <View style={[this.props.styel]}>
        <View style={{
            height:45,
            marginHorizontal:15, marginTop:50,
            borderTopRightRadius:3,borderTopLeftRadius:3,
            backgroundColor:'#fff'
          }}>
          <TextInput style={{
              flex:1,
              marginHorizontal:5,
              backgroundColor:'transparent',
            }} onChangeText={email=>this.setState({email})} placeholder='邮箱' />
        </View>

        <View style={{
            height:45,
            marginHorizontal:15, marginTop:1,
            borderBottomRightRadius:3,borderBottomLeftRadius:3,
            backgroundColor:'#fff'
          }}>
          <TextInput style={{
              flex:1,
              marginHorizontal:5,
              backgroundColor:'transparent',
            }} onChangeText={password=>this.setState({password})} placeholder='密码' />
        </View>

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:15, marginTop:25,
            borderRadius:3,
            backgroundColor:'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} onPress={this.onPressSubmit.bind(this)} >
          <Text style={{ color:'#fff',fontSize:18}}>确定</Text>
        </TouchableOpacity>
      </View>
      );
  }
}

let ByEmail = connect(state=>state,dispatch=>({
  action: bindActionCreators({
    registerEmail: action.registerEmail
  }, dispatch)
}))(V2);

class V extends Component {
  constructor(props){
    super(props);
    this.state = {
      component: ByMobile
    };
  }
  componentDidMount(){
  }
  render(){
    const Form = this.state.component;
    return (
      <View>

        <View style={{flexDirection:'row', height:45, backgroundColor:'#fff'}}>

          {[{
            title:'手机注册',component:ByMobile
          },{
            title:'邮箱注册',component:ByEmail
          }].map(o=>{
            return (
              <TouchableOpacity key={o.title} style={{
                  flex:1,
                  alignItems:'center', justifyContent:'center'}}
                  onPress={()=>this.setState({component:o.component})}>
                <Text style={{color:'#18B4ED', fontSize:16}}>{o.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{flex:1}}>
        <Form style={{marginTop:100}} />
        </View>

      </View>);
  }
}

export default connect(state=>state)(V);
