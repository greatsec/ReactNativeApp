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

import _find from 'lodash/find';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
    this.props.action.versionGet({type:'hardware'}).then(action=>{
      if(!action.error){
        let { code:lastVersion, url, publishDate } = action.payload;
        let msg = `最新版本${lastVersion}, 发布时间${publishDate}`;
        let currentVersion = this.props.device.version;
        //console.log('----xxx NewVer: ' + lastVersion);
        //console.log('----xxx curVer: ' + currentVersion);
        this.setState({lastVersion, url, publishDate, msg});
        if(lastVersion > currentVersion)
        {
          this.setState({result:false});
        }
        else {
          this.setState({result:true});
        }
      }else{
        this.setState({msg:'获取版本失败'});
        this.setState({result:true});
      }

    });
  }

  onPressSubmit(){
    let { lastVersion, url } = this.state;
    let { code } = this.props.device;
    console.log([]);
    this.props.action.deviceOTA(code,lastVersion,url).then(action=>this.setState({msg:action.error?'升级失败':'升级成功'}));
  }
  render(){
    let {lastVersion} = this.state;
    let newMsg = `已为最新版本${lastVersion}`;

    return (
      <View>

        <View style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>微信公众号</Text>
            </View>
        {
          this.state.result?(
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{newMsg}</Text>
            </View>
        ):(
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.state.msg}</Text>
            </View>)
        }
        </View>

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:15, marginTop:20,
            borderRadius:3,
            backgroundColor:this.state.result?'#888':'#18B4ED',
            alignItems:'center', justifyContent:'center'
        }} disabled={this.state.result} onPress={this.onPressSubmit.bind(this)} >
          <Text style={{ color:'#fff',fontSize:18}}>立即升级</Text>
        </TouchableOpacity>



        <View style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>客服电话</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>400 880 6306</Text>
            </View>
        </View>

      </View>);
  }
}

export default connect(state=>({
  device: _find(state.deviceList.list, {id:state.deviceList.selected})
}),dispatch=>({
  action: bindActionCreators({
    versionGet: action.versionGet,
    deviceOTA: action.deviceOTA
  }, dispatch)
}))(V);
