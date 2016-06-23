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
    let {username:mobile} = this.state;
    this.props.action.mobileCode({mobile}).then(action=>console.log(action));
  }

  onPressSubmit(){
    let { username, newPassword, code} = this.state;
    this.props.action.forgetPassword({username, newPassword, code}).then(action=>{
      if(!action.error) Actions.pop();
    });
  }
  render(){
    return (<View>
      <TextInput onChangeText={username=>this.setState({username})} placeholder='手机号' />
      <TextInput onChangeText={newPassword=>this.setState({newPassword})} />
      <TextInput onChangeText={code=>this.setState({code})} />
      <TouchableOpacity onPress={this.onPressCode.bind(this)}>
        <Text>发送验证码</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.onPressSubmit.bind(this)}>
        <Text>提交</Text>
      </TouchableOpacity>
    </View>);
  }
}
let ByMobile = connect(state=>state,dispatch=>({
  action: bindActionCreators({
    forgetPassword: action.forgetPassword,
    mobileCode: action.mobileCode
  }, dispatch)
}))(V1);

class V2 extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
  }
  onPressCode(){
    let {username:email} = this.state;
    this.props.action.emailCode({email}).then(action=>console.log(action));
  }

  onPressSubmit(){
    let { username, newPassword, code} = this.state;
    this.props.action.forgetPassword({username, newPassword, code}).then(action=>{
      if(!action.error) Actions.pop();
    });
  }
  render(){
    return (<View>
      <TextInput onChangeText={username=>this.setState({username})} placeholder='邮箱' />
      <TextInput onChangeText={newPassword=>this.setState({newPassword})} />
      <TextInput onChangeText={code=>this.setState({code})} />
      <TouchableOpacity onPress={this.onPressCode.bind(this)}>
        <Text>发送验证码</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.onPressSubmit.bind(this)}>
        <Text>提交</Text>
      </TouchableOpacity>
    </View>)
  }
}

let ByEmail = connect(state=>state,dispatch=>({
  action: bindActionCreators({
    forgetPassword: action.forgetPassword,
    emailCode: action.emailCode
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
      <View style={{marginTop:100}}>

        <View>
          <Text >忘记密码</Text>
        </View>

        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{flex:1}} onPress={()=>this.setState({component:ByMobile})}>
            <Text>用手机</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{flex:1}} onPress={()=>this.setState({component:ByEmail})}>
            <Text>用邮箱</Text>
          </TouchableOpacity>
        </View>

        <Form />

      </View>);
  }
}

export default connect(state=>state)(V);
