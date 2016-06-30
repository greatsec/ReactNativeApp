import React, { Component } from 'react';
import {
  RefreshControl,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import action from '../action';


import _find from 'lodash/find';

var {height, width} = Dimensions.get('window')
let aqiToMore = (aqi)=>{
  if(aqi <= 50) return {text:'优',color:'#20D800'};
  if(aqi <= 100) return {text:'良',color:'#F6E900'};
  if(aqi <= 150) return {text:'轻度污染',color:'#FF7F00'};
  if(aqi <= 200) return {text:'中度污染',color:'#F10000'};
  if(aqi <= 300) return {text:'重度污染',color:'#C800BE'};
  return {text:'严重污染',color:'#7C0075'};
}

let aqiList = [
  {range:[0,50],color:'#20D800',title:'优'},
  {range:[50,100],color:'#F6E900',title:'良'},
  {range:[100,150],color:'#FF7F00',title:'轻度污染'},
  {range:[150,200],color:'#F10000',title:'中度污染'},
  {range:[200,300],color:'#C800BE',title:'重度污染'},
  {range:[300,500],color:'#7C0075',title:'严重污染'}];

  class BottomTabBar extends Component {

  renderTabOption(tab, i){
    let isActive = this.props.activeTab === i;
    let textColor = isActive ? '#00b0ee' : '#888';
    let icon = isActive ? tab.activeIcon || tab.icon : tab.icon;

    return (
      <TouchableOpacity key={i} style={{flex:1, alignItems:'center', justifyContent:'center', marginBottom:2}} onPress={()=>this.props.goToPage(i)}>

        <Text style={{marginTop:5,color:textColor,fontSize:14}}>{tab.title}</Text>
      </TouchableOpacity>
    );
  }

  render(){
    return (
      <View style={{flexDirection:'row', marginBottom:5, borderTopWidth:1, borderColor:'#bbb'}}>
        {this.props.tabs.map((tab, i)=> this.renderTabOption(tab,i))}
      </View>
    );
  }
}

class V extends Component {
    constructor(props){
            super(props);

            let s = {
              main:{ name: 'PM2.5', data:'--', unit:'ug/m³',
                levelTitle:'空气质量',currentLevel:0,
                levels:[
                  {range:[-10,-1],color:'#20D800',title:'--'},
                  {range:[0,50],color:'#20D800',title:'优'},
                  {range:[50,100],color:'#F6E900',title:'良'},
                  {range:[100,150],color:'#FF7F00',title:'轻度污染'},
                  {range:[150,200],color:'#F10000',title:'中度污染'},
                  {range:[200,300],color:'#C800BE',title:'重度污染'},
                  {range:[300,500],color:'#7C0075',title:'严重污染'}]
              },
              dataset:[
                { name:'PM1.0', data:'--', unit:'ug/m³'},
                { name:'PM10', data:'--', unit:'ug/m³'},
                { name:'温度', data:'--', unit:'℃'},
                { name:'湿度', data:'--', unit:'％'}
              ],
              PM1:'--',
              PM25:'--',
              PM10:'--',
              temperature:'--',
              humidity:'--'
            };
            s.main.currentLevel = 0;
            this.state = s;
            this.state.aqi = aqiToMore(0);
  }

  componentDidMount(){

    this._interval = setInterval(this.updateData.bind(this), 5000);
  }
  updateData(){
    if(this.props.isFocus){
      if(!this.stop){
        this.stop = true;
        this.props.action.deviceRealtimeData(this.props.device.code).then(action=>{
          this.stop = false;
        });
      }
    }
  }
  componentWillUnmount(){
    if(this._interval){
      clearInterval(this._interval);
    }
  }
  /*render(){
    return (
      <View>
        <Text style={{marginTop:100}}>设备名称：{this.props.device.name}</Text>
        <Text style={{marginTop:10}}>PM1.0：{this.props.device.data.pm1}</Text>
        <Text style={{marginTop:10}}>PM2.5：{this.props.device.data.pm25}</Text>
        <Text style={{marginTop:10}}>PM10：{this.props.device.data.pm10}</Text>
        <Text style={{marginTop:10}}>温度：{this.props.device.data.temperature}</Text>
        <Text style={{marginTop:10}}>湿度：{this.props.device.data.humidity}</Text>
      </View>
    )
  }*/
  render(){

    let {main} =  this.state;
    main.curLevel = main.levels[main.currentLevel];
    return (
      <View style={{flex:1}}>
          <ScrollView tabLabel={{title:'检测', icon:'search'}}>
            <Image source={require('./img/device_bg.png')} style={{flex:1,height:180, width,alignItems:'flex-end', flexDirection:'row'}}>
              {this.props.address? (
                <View style={{marginBottom:10, marginLeft:5}}>
                  <Text style={{backgroundColor:'transparent', color:'#fff', fontSize:48}}>{this.state.curTemp}</Text>
                </View>
              ) : null}
              {this.props.address? (
                <View style={{flex:1,marginBottom:10, justifyContent:'center'}}>
                  <View style={{flexDirection:'row', marginBottom:5}}>
                    <View style={{alignItems:'center', justifyContent:'center', marginHorizontal:10}}>
                      <Text style={{backgroundColor:'transparent', color:'#fff'}}>{this.state.weatherType}</Text>
                    </View>
                    <View style={{backgroundColor:this.state.aqi.color,borderRadius:10,height:20, width:92, alignItems:'center', justifyContent:'center'}}>
                      <Text style={{backgroundColor:'transparent', color:'#fff', fontSize:14}}>室外·空气{this.state.aqi.text}</Text>
                    </View>
                  </View>
                  <Text style={{backgroundColor:'transparent', color:'#fff', fontSize:14}}>{this.state.fengxiang}|{this.state.fengli}</Text>
                </View>
              ) : null}
              {this.props.address? (
                <View style={{marginBottom:10, marginRight:5}}>
                  <Text style={{backgroundColor:'transparent', color:'#fff', fontSize:16}}>{this.props.address}</Text>
                </View>
              ) : null}

            </Image>
            <View style={{marginTop:5,alignItems:'stretch', marginBottom:10}}>
              <View style={{alignItems:'center'}}>
                <Text style={{marginTop:10,fontSize:22,color:'#646464'}}>PM2.5</Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                <View style={{flex:1}}></View>
                <Text style={{fontSize:38,color:main.curLevel.color}}>{this.props.device.data.pm25}</Text>
                <Text style={{flex:1}}>ug/m³</Text>
              </View>
              <View style={{alignItems:'center', marginTop:10}}>
                <View style={{width:115, height:18,backgroundColor:this.props.aqi.color, alignItems:'center', justifyContent:'center', borderRadius:15}}>
                  <Text style={{color:'#fff',fontSize:12}}>{this.props.aqi.title}</Text>
                </View>
              </View>
              <View style={{alignItems:'center',}}>
                <View style={{flexDirection:'row'}}>
                  {aqiList.map((o,i)=>{
                    if(this.props.aqi.color == o.color){
                        return (
                          <View key={i} style={{height:5,width:18,alignItems:'center'}} >
                            <View style={{
                                height:10, width:6,
                                borderTopWidth: 6,
                                borderRightWidth: 3,
                                borderBottomWidth: 0,
                                borderLeftWidth: 3,
                                borderTopColor: this.props.aqi.color,
                                borderRightColor: 'transparent',
                                borderBottomColor: 'transparent',
                                borderLeftColor: 'transparent'
                              }}/>
                          </View>);
                    }
                    return <View key={i} style={{height:5,width:18}} />
                  })}
                </View>
              </View>

              <View style={{marginTop:10, alignItems:'center'}}>
                <View style={{flexDirection:'row'}}>
                {aqiList.map((o,i)=>{
                  return <View key={i} style={{height:5,width:18,backgroundColor:o.color}} />
                })}
                </View>
              </View>
            </View>
            <View>
              <View style={{flexDirection:'row', height:80, alignItems:'stretch'}}>
                <View style={{flex:1, borderRadius:5, marginLeft:10, marginRight:5,borderWidth:1, borderColor:'#bbb'}}>
                  <Text style={{marginLeft:15, marginTop:15, fontSize:20, color:'#646464'}}>PM1.0</Text>
                  <Text style={{position:'absolute', right:20, bottom:20,fontSize:30,color:'#4786F6'}}>{this.props.device.data.pm1}</Text>
                  <Text style={{position:'absolute', right:20, bottom:5}}>ug/m³</Text>
                </View>
                <View style={{flex:1,borderRadius:5, marginLeft:5, marginRight:10,borderWidth:1, borderColor:'#bbb'}}>
                  <Text style={{marginLeft:15, marginTop:15,fontSize:20, color:'#646464'}}>PM10</Text>
                  <Text style={{position:'absolute', right:20, bottom:20,fontSize:30,color:'#4786F6'}}>{this.props.device.data.pm10}</Text>
                  <Text style={{position:'absolute', right:20, bottom:5}}>ug/m³</Text>
                </View>
              </View>
              <View style={{flexDirection:'row', marginTop:10,marginBottom:10, height:80, alignItems:'stretch'}}>
                <View style={{flex:1,borderRadius:5, marginLeft:10, marginRight:5, borderWidth:1, borderColor:'#bbb'}}>
                  <Text style={{marginLeft:15, marginTop:15,fontSize:20, color:'#646464'}}>温度</Text>
                  <Text style={{position:'absolute', right:10, bottom:5,fontSize:30, color:'#4786F6'}}>{this.props.device.data.temperature}℃</Text>

                </View>
                <View style={{flex:1,borderRadius:5, marginLeft:5, marginRight:10, borderWidth:1, borderColor:'#bbb'}}>
                  <Text style={{marginLeft:15, marginTop:15,fontSize:20, color:'#646464'}}>湿度</Text>
                  <Text style={{position:'absolute', right:10, bottom:5,fontSize:30, color:'#4786F6'}}>{this.props.device.data.humidity}%</Text>
                </View>
              </View>
            </View>
          </ScrollView>
      </View>
    );
  }
}

export default connect(state=>
{
  let ret = {
    device: (_find(state.deviceList.list, {id:state.deviceList.selected}) || _find(state.deviceList.slist, {id:state.deviceList.selected})),
    isFocus: (state.nav.focusName == 'deviceData') || (state.nav.focusName == 'device' && state.nav.jumpName == 'deviceData')
  };

  let v = parseInt(ret.device.data.pm25);
  let aqi = _.find(aqiList, (o)=>(o.range[0] <= v && v <= o.range[1]));
  ret.aqi = aqi || {title:'error',color:'#000'};
  return ret;
}
,dispatch=>({
  action: bindActionCreators({
    selectDevice: action.selectDevice,
    deviceRealtimeData: action.deviceRealtimeData
  }, dispatch)
}))(V);
