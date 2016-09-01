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

import _find from 'lodash/find';
import _map from 'lodash/map';
import moment from 'moment';

import { LineChart } from 'react-native-chart';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartType:'pmChart',
      showTime : moment()
    };

    this.chartType = [{title:'空气质量',key:'pmChart'},{title:'温湿度',key:'thChart'}];
    this.timeType = [{title:'年',key:'month', legendFormat:'YYYY年'},{title:'月',key:'day', legendFormat:'YYYY年MM月'},{title:'日',key:'hour', legendFormat:'YYYY年MM月DD日'}];
  }
  componentDidMount(){
    this.onSwitchType(_find(this.timeType, {key:'day'}));
  }

  rightButton(){
    return <Text>1</Text>
  }

  onSwitchType({key:type,legendFormat}){
    let { code: device } = this.props.device;
    let startTime, endTime;
    let showTime = moment();
    let xVals = [];
    let labelsToSkip = 0;
    switch(type){
      case 'hour': {
        startTime = showTime.format('YYYYMMDD') + '00';
        endTime = showTime.format('YYYYMMDD') + '23';
        labelsToSkip = 1;
        xVals = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];
      } break;
      case 'day': {
        startTime = showTime.format('YYYYMM') + '01';
        endTime = showTime.format('YYYYMM') + moment().daysInMonth();
        labelsToSkip = 1;
        xVals = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];

      } break;
      case 'month': {
        startTime = showTime.format('YYYY') + '0101';
        endTime = showTime.format('YYYY') + '1231';
        labelsToSkip = 0;
        xVals = ['01','02','03','04','05','06','07','08','09','10','11','12'];
      } break;
    }

    this.setState({type,showTime,legendFormat});
    this.props.action.changeChart({xVals,labelsToSkip});
    this.props.action.pmList({device,startTime,endTime,type});
  }
  onSwipe({direction}){
    if(direction !='left' && direction != 'right') return;

    let { code: device } = this.props.device;
    let startTime, endTime;
    let { showTime, type } = this.state;

    let func = direction == 'left' ? 'add' : 'subtract';
    let xVals = [];
    let labelsToSkip = 0;
    switch(type){
      case 'hour': {
        showTime = showTime[func](1,'d');
        startTime = showTime.format('YYYYMMDD') + '00';
        endTime = showTime.format('YYYYMMDD') + '23';
        labelsToSkip = 1;
        xVals = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];
      } break;
      case 'day': {
        showTime = showTime[func](1,'M');
        startTime = showTime.format('YYYYMM') + '01';
        endTime = showTime.format('YYYYMM') + moment().daysInMonth();
        labelsToSkip = 1;
        xVals = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];

      } break;
      case 'month': {
        showTime = showTime[func](1,'y');
        startTime = showTime.format('YYYY') + '0101';
        endTime = showTime.format('YYYY') + '1231';
        labelsToSkip = 0;
        xVals = ['01','02','03','04','05','06','07','08','09','10','11','12'];
      } break;
    }

    this.setState({showTime});
    this.props.action.changeChart({xVals,labelsToSkip});
    this.props.action.pmList({device,startTime,endTime,type});
  }

  render(){
    return (<View style={{flex:1}}>
      <View style={{flexDirection:'row', height:36}}>
        {this.chartType.map(o=>{
          return (
            <TouchableOpacity key={o.key} style={{
                flex:1,
                alignItems:'center', justifyContent:'center',
                backgroundColor:'#fff'
              }} onPress={()=>this.setState({chartType:o.key})}>
              <Text style={{color:(this.state.chartType == o.key) ?'red':'#18B4ED'}}>{o.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{flexDirection:'row', height:36}}>
        {this.timeType.map(o=>{
          return (
            <TouchableOpacity key={o.key} style={{
                flex:1,
                alignItems:'center', justifyContent:'center',
                backgroundColor:'#fff'
              }} onPress={()=>this.onSwitchType(o)}>
              <Text style={{color:(this.state.type == o.key) ?'red':'#18B4ED'}}>{o.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{alignItems:'center'}}>
        <Text style={{marginVertical:5}}>{this.state.showTime.format(this.state.legendFormat)}</Text>
      </View>
      <View style={{flex:1}}>
        {this.props[this.state.chartType].map((o, i)=>{
          return (<View style={{flex:1}} key={i}>
            <Text>{o.unit}</Text>
            <LineChart onSwipe={this.onSwipe.bind(this)} style={{flex:1}} {...o} />
          </View>);
        })}
      </View>

    </View>)
  }
}

export default connect(state=>({
  device: (_find(state.deviceList.list, {id:state.deviceList.selected}) || _find(state.deviceList.slist, {id:state.deviceList.selected})),
  pmChart: [{
    unit: 'ug/m³',
    data: {
      //xVals:_map(state.deviceList.chart,o=>o.time.substr(-2)),
      xVals:state.deviceList.xVals,
      dataSet:[{
        //yVals:_map(state.deviceList.chart,'pm1'),
        yVals: _map(state.deviceList.chart, o=>({
          val:o.pm1,
          xIndex: parseInt(o.time.substr(-2)) -1
        })),
        colors:['#50E3C2']
      },{
        //yVals:_map(state.deviceList.chart,'pm25'),
        yVals: _map(state.deviceList.chart, o=>({
          val:o.pm25,
          xIndex: parseInt(o.time.substr(-2)) - 1
        })),
        colors:['#F68447']
      },{
        //yVals:_map(state.deviceList.chart,'pm10'),
        yVals: _map(state.deviceList.chart, o=>({
          val:o.pm10,
          xIndex: parseInt(o.time.substr(-2)) - 1
        })),
        colors:['#D847F6']
      }]
    },
    leftAxis:{
      axisMinValue:0,
      axisMaxValue:500,
      labelCount:11
    },
    xAxis: {
      labelsToSkip: state.deviceList.labelsToSkip
    }
  }],
  thChart: [{
    unit: '℃',
    data: {
      xVals:state.deviceList.xVals,
      dataSet:[{
        yVals: _map(state.deviceList.chart, o=>({
          val:o.temperature,
          xIndex: parseInt(o.time.substr(-2)) - 1
        })),
        colors:['#50E3C2']
      }]
    },
    leftAxis:{
      axisMinValue:-20,
      axisMaxValue:70,
      labelCount:10
    },
    xAxis: {
      labelsToSkip: state.deviceList.labelsToSkip
    }
  },{
    unit: '％',
    data: {
      xVals:state.deviceList.xVals,
      dataSet:[{
        yVals: _map(state.deviceList.chart, o=>({
          val:o.humidity,
          xIndex: parseInt(o.time.substr(-2)) - 1
        })),
        colors:['#50E3C2']
      }]
    },
    leftAxis:{
      axisMinValue:0,
      axisMaxValue:100,
      labelCount:11
    },
    xAxis: {
      labelsToSkip: state.deviceList.labelsToSkip
    }
  }],type:state.deviceList.type
}),dispatch=>({
  action: bindActionCreators({
    pmList: action.pmList,
    changeChart: action.changeChart
  }, dispatch)
}))(V);
