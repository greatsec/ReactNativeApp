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
    let {oldPassword,newPassword} = this.state;

    this.props.action.userUpdatePassword({
      oldPassword, newPassword
    }).then(action=>{
      if(!action.error) Actions.pop();
    })
  }
  render(){
    return (
      <View style={{marginTop:100}}>
        <View>
          <Text >修改密码</Text>
        </View>

        <View>
          <TextInput onChangeText={oldPassword=>this.setState({oldPassword})} style={{height:40}} value={this.state.name}/>
        </View>

        <View>
          <TextInput onChangeText={newPassword=>this.setState({newPassword})} style={{height:40}} value={this.state.name}/>
        </View>

        <TouchableOpacity onPress={this.onPressSubmit.bind(this)}>
          <Text>提交</Text>
        </TouchableOpacity>


      </View>);
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    userUpdatePassword: action.userUpdatePassword,
  }, dispatch)
}))(V);
