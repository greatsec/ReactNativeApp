import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import action from '../action';

import codePush from 'react-native-code-push';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
    codePush.checkForUpdate().then(e=>console.log(e));

    codePush.getUpdateMetadata().then(e=>console.log(e));
  }
  render(){
    return (
      <View style={{marginTop:100}}>


        <TextInput style={{height:40}}/>
        <Text >{this.state.text}</Text>

        <TouchableOpacity style={{borderBottomWidth:1, flexDirection:'row', height:40}}>
          <Text>软件版本12{__DEV__?'1':'2'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.props.action.getCurrentPackage().then(e=>console.log(e))} style={{borderBottomWidth:1, flexDirection:'row', height:40}}>
          <Text>数据版本</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.props.action.checkForUpdate().then(e=>console.log(e))} style={{borderBottomWidth:1, flexDirection:'row', height:40}}>
          <Text>检查</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.props.action.sync().then(e=>console.log(e))} style={{borderBottomWidth:1, flexDirection:'row', height:40}}>
          <Text>更新</Text>
        </TouchableOpacity>
      </View>);
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    checkForUpdate: action.checkForUpdate,
    getCurrentPackage: action.getCurrentPackage,
    sync: action.sync
  }, dispatch)
}))(V);
