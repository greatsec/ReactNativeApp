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
    this.props.action.mobileCode({mobile}).then(action=>console.log(action));
  }

  onPressSubmit(){
    let { mobile, password,code} = this.state;
    this.props.action.register({mobile, password,code}).then(action=>{
      if(!action.error) Actions.pop();
    });
  }
  render(){
    return (<View>
      <TextInput onChangeText={mobile=>this.setState({mobile})} placeholder='手机号' />
      <TextInput onChangeText={password=>this.setState({password})} />
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
    return (<View>
      <TextInput onChangeText={email=>this.setState({email})} placeholder='邮箱' />
      <TextInput onChangeText={password=>this.setState({password})} />
      <TouchableOpacity onPress={this.onPressSubmit.bind(this)}>
        <Text>提交</Text>
      </TouchableOpacity>
    </View>);
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
      <View style={{marginTop:100}}>

        <View>
          <Text >注册</Text>
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
