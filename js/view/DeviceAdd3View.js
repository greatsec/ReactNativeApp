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
    let {code} = this.props;
    let {name} = this.state;
    this.props.action.deviceBind({
      code, name
    }).then(action=>{
      if(!action.error){
        this.props.action.deviceRefresh();
        Actions.callback({type: 'BODGE'});
      }
    })
  }
  render(){
    return (
      <View style={{marginTop:100}}>

        <View>
          <Text >{this.props.code}</Text>
        </View>

        <TextInput onChangeText={name=>this.setState({name})} style={{height:40}}/>

        <TouchableOpacity style={{height:48}} onPress={this.onPressSubmit.bind(this)}>
          <Text>完成</Text>
        </TouchableOpacity>


      </View>);
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    deviceBind: action.deviceBind,
    deviceRefresh: action.deviceRefresh
  }, dispatch)
}))(V);
