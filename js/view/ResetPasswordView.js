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

class ByMobile extends Component {
  render(){
    return <Text>ByMobile</Text>
  }
}

class ByEmail extends Component {
  render(){
    return <Text>ByEmail</Text>
  }
}

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
    const COMPONENT = this.state.component;
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

        <COMPONENT />

      </View>);
  }
}

export default connect(state=>state)(V);
