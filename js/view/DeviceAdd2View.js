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
    this.props.action.getCurrentWifiSSID();

    this._interval = setInterval(this.updateTick.bind(this), 1000);
  }

  updateTick(){
    let { second } = this.state;
    if(second > 0){
      second--;
      this.setState({second});
    }else if(second == 0){
      this.props.action.stopWifiConfig();
      second--;
      this.setState({second});
    }

  }
  componentWillUnmount(){
    if(this._interval){
      clearInterval(this._interval);
    }

    this.props.action.stopWifiConfig();
  }

  onPressConfig(){
    let { ssid } = this.props;
    let { key } = this.state;
    this.props.action.startWifiConfig({ssid, key})
    .then(action=>{
      if(!action.error){
        let code = action.payload;
        Actions.deviceAdd3({code});
      }
    });
    this.setState({second:120});
  }
  render(){
    return (
      <View style={{marginTop:100}}>

        <View>
          <Text >{this.props.ssid}</Text>
        </View>

        <TextInput onChangeText={key=>this.setState({key})} style={{height:40}}/>


        <TouchableOpacity style={{height:48}} onPress={this.onPressConfig.bind(this)}>
          <Text>配置 {this.state.second > 0 ? this.state.second : ''}</Text>
        </TouchableOpacity>


      </View>);
  }
}

export default connect(state=>({
  ssid: state.wifi.name
}),dispatch=>({
  action: bindActionCreators({
    getCurrentWifiSSID: action.getCurrentWifiSSID,
    startWifiConfig: action.startWifiConfig,
    stopWifiConfig: action.stopWifiConfig
  }, dispatch)
}))(V);