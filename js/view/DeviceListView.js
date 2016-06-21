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
    this.props.action.deviceList().then(action=>{
      this.setState({refreshing:false});
    });
  }

  onRefresh(){
    this.setState({refreshing:true});
    this.props.action.deviceList().then(action=>{
      this.setState({refreshing:false});
    });
  }

  render(){
    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)}/>}
        style={{marginTop:100}}>
        {this.props.deviceList.list.map((o)=>{
          return <TouchableOpacity key={o.id} onPress={()=>{this.props.action.selectDevice(o.id);Actions.device({id:o.id})}}>
            <Text>{o.name}</Text>
          </TouchableOpacity>
        })}
      </ScrollView>
    );
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    deviceList: action.deviceList,
    selectDevice: action.selectDevice,
  }, dispatch)
}))(V);
