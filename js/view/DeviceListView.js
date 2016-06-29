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

import _filter from 'lodash/filter';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount(){
    this.props.action.deviceRefresh();
  }

  onRefresh(){
    this.props.action.deviceRefresh();
  }

  render(){
    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={this.props.refreshing || false} onRefresh={this.onRefresh.bind(this)}/>}
        style={{marginTop:100}}>
        {this.props.deviceList.map((o)=>{
          return (
          <TouchableOpacity key={'device_' + o.id} style={{borderWidth:1,width:100}} onPress={()=>{this.props.action.selectDevice(o.id);Actions.device()}}>
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
  refreshing: state.deviceList.refreshing,
  deviceList: [..._filter(state.deviceList.list, o=>!o.unbind), ...state.deviceList.slist]
}),dispatch=>({
  action: bindActionCreators({
    deviceRefresh: action.deviceRefresh,
    selectDevice: action.selectDevice
  }, dispatch)
}))(V);
