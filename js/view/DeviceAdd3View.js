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
      <View>
        <View style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>产品条码</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.props.code}</Text>
            </View>
        </View>

        <View style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <TextInput onChangeText={name=>this.setState({name})} style={{flex:1,marginLeft:15,
              backgroundColor:'transparent'}} placeholder='设备名称'/>
        </View>

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:15, marginTop:5,
            borderRadius:3,
            backgroundColor:'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} onPress={this.onPressSubmit.bind(this)} >
          <Text style={{color:'#fff',fontSize:18}}>配置 {this.state.second > 0 ? this.state.second : ''}</Text>
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
