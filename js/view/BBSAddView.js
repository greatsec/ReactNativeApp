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
    let {content} = this.state;

    this.props.action.bbsAdd({content}).then(action=>{
      if(!action.error) Actions.pop();
    })
  }
  render(){
    return (
      <View style={{marginTop:100}}>

        <View>
          <Text >BBS</Text>
        </View>

        <TextInput onChangeText={content=>this.setState({content})} style={{height:40}}/>

        <TouchableOpacity onPress={this.onPressSubmit.bind(this)}>
          <Text>提交</Text>
        </TouchableOpacity>

      </View>);
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    bbsAdd: action.bbsAdd
  }, dispatch)
}))(V);
