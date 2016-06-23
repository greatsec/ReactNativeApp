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

  onPressCode(){
    let {email} = this.state;
    this.props.action.bindEmailCode({email}).then(action=>console.log(action));
  }

  onPressSubmit(){
    let {email, code} = this.state;

    this.props.action.bindEmail({
      email, code
    }).then(action=>{
      if(!action.error) Actions.pop();
      console.log(action);
    })
  }
  render(){
    return (
      <View style={{marginTop:100}}>

        <TextInput onChangeText={email=>this.setState({email})} style={{height:40}}/>

        <TextInput onChangeText={code=>this.setState({code})} style={{height:40}}/>

        <TouchableOpacity onPress={this.onPressCode.bind(this)}>
          <Text>发送验证码</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.onPressSubmit.bind(this)}>
          <Text>提交</Text>
        </TouchableOpacity>


      </View>);
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    bindEmail: action.bindEmail,
    bindEmailCode: action.bindEmailCode
  }, dispatch)
}))(V);
