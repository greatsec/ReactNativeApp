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
      <View>
        <View style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>当前网络</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.props.ssid}</Text>
            </View>
        </View>

        <View style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <TextInput onChangeText={key=>this.setState({key})} style={{flex:1,marginLeft:15}} placeholder='wifi密码'/>
        </View>

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:15, marginTop:5,
            borderRadius:3,
            backgroundColor:'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} onPress={this.onPressConfig.bind(this)} >
          <Text style={{color:'#fff',fontSize:18}}>配置 {this.state.second > 0 ? this.state.second : ''}</Text>
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
