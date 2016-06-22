import React, { Component } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import action from '../action';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing : false
    };
  }

  componentDidMount(){
    this.setState({refreshing:true});
    Promise.all([
      this.props.action.deviceList(),
      this.props.action.deviceShareForMeList(),
    ]).then(()=>{this.setState({refreshing:false})});
  }

  onRefresh(){
    this.setState({refreshing:true});
    Promise.all([
      this.props.action.deviceList(),
      this.props.action.deviceShareForMeList(),
    ]).then(()=>{this.setState({refreshing:false})});
  }

  render(){
    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)}/>}
        style={{marginTop:100}}>
        {this.props.deviceList.map((o)=>{
          return (
          <TouchableOpacity key={'device_' + o.id} onPress={()=>{this.props.action.selectDevice(o.id);Actions.device()}}>
            <Text>{o.name}</Text>
            <Text>在线：{o.online}</Text>
          </TouchableOpacity>);
        })}

        <TouchableOpacity onPress={Actions.deviceAdd}>
          <Text>添加</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default connect(state=>({
  deviceList: [...state.deviceList.list, ...state.deviceList.slist]
}),dispatch=>({
  action: bindActionCreators({
    deviceList: action.deviceList,
    selectDevice: action.selectDevice,
    deviceShareForMeList: action.deviceShareForMeList
  }, dispatch)
}))(V);
