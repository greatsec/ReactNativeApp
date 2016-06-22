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
    let {type, content} = this.state;
    this.props.action.adviceSave({
      type,
      content
    }).then(action=>{
      if(!action.error) Actions.pop();
    })
  }
  render(){
    return (
      <View style={{marginTop:100}}>

        <View>
          <Text>选择你要反馈的问题类型</Text>
        </View>

        <TouchableOpacity onPress={()=>this.setState({type:1})}>
          <Text>问题反馈</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.setState({type:2})}>
          <Text>使用咨询</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.setState({type:3})}>
          <Text>产片建议</Text>
        </TouchableOpacity>

        <TextInput onChangeText={content=>this.setState({content})} style={{height:40}}/>

        <TouchableOpacity onPress={this.onPressSubmit.bind(this)}>
          <Text>提交</Text>
        </TouchableOpacity>


      </View>);
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    adviceSave: action.adviceSave
  }, dispatch)
}))(V);
