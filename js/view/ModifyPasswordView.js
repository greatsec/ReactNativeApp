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
      <View>
        <View style={{
            height:45, marginTop:10,
            flexDirection:'row',marginHorizontal:15,
            borderTopLeftRadius:3,borderTopRightRadius:3,
            backgroundColor:'#fff'}}>
            <TextInput onChangeText={oldPassword=>this.setState({oldPassword})} style={{flex:1, marginHorizontal:10}} placeholder='旧密码'/>
        </View>

        <View style={{
            height:45, marginTop:1, marginHorizontal:15,
            borderBottomLeftRadius:3, borderBottomRightRadius:3,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <TextInput onChangeText={newPassword=>this.setState({newPassword})} style={{flex:1, marginHorizontal:10}} placeholder='新密码'/>
        </View>

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:15, marginTop:5,
            borderRadius:3,
            backgroundColor:'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} onPress={this.onPressSubmit.bind(this)} >
          <Text style={{ color:'#fff',fontSize:18}}>提交</Text>
        </TouchableOpacity>

      </View>);
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    userUpdatePassword: action.userUpdatePassword,
  }, dispatch)
}))(V);
