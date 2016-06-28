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
  }
  componentDidMount(){
    this.onSwitchType('day');
  }

  onSwitchType(type){
    let { code: device } = this.props.device;
    let startTime, endTime;
    let showTime = moment();

    switch(type){
      case 'hour': {
        startTime = showTime.format('YYYYMMDD') + '00';
        endTime = showTime.format('YYYYMMDD') + '23';
      } break;
      case 'day': {
        startTime = showTime.format('YYYYMM') + '01';
        endTime = showTime.format('YYYYMM') + moment().daysInMonth();
      } break;
      case 'month': {
        startTime = showTime.format('YYYY') + '0101';
        endTime = showTime.format('YYYY') + '1231';
      } break;
    }

    this.setState({type,showTime});
    this.props.action.pmList({device,startTime,endTime,type});
  }
  onSwipe({direction}){
    if(direction !='left' && direction != 'right') return;

    let { code: device } = this.props.device;
    let startTime, endTime;
    let { showTime, type } = this.state;

    let func = direction == 'left' ? 'add' : 'subtract';
    switch(type){
      case 'hour': {
        showTime = showTime[func](1,'d');
        startTime = showTime.format('YYYYMMDD') + '00';
        endTime = showTime.format('YYYYMMDD') + '23';
      } break;
      case 'day': {
        showTime = showTime[func](1,'M');
        startTime = showTime.format('YYYYMM') + '01';
        endTime = showTime.format('YYYYMM') + moment().daysInMonth();
      } break;
      case 'month': {
        showTime = showTime[func](1,'y');
        startTime = showTime.format('YYYY') + '0101';
        endTime = showTime.format('YYYY') + '1231';
      } break;
    }

    this.setState({showTime});
    this.props.action.pmList({device,startTime,endTime,type});
  }
  render(){
    return (<View style={{marginTop:100, marginBottom:100, flex:1}}>
      <View style={{flexDirection:'row', height:36}}>
        <TouchableOpacity style={{flex:1, borderWidth:1}} onPress={()=>this.setState({chartType:'pmChart'})}>
          <Text>空气质量</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1, borderWidth:1}} onPress={()=>this.setState({chartType:'thChart'})}>
          <Text>温湿度</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row', height:36}}>
        <TouchableOpacity style={{flex:1, borderWidth:1}} onPress={this.onSwitchType.bind(this,'month')}>
          <Text>年</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1, borderWidth:1}} onPress={this.onSwitchType.bind(this,'day')}>
          <Text>月</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1, borderWidth:1}} onPress={this.onSwitchType.bind(this,'hour')}>
          <Text>日</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>{this.state.showTime.format()}</Text>
      </View>
      <View style={{flex:1}}>
        {this.props[this.state.chartType].map((o, i)=>{
          return <LineChart key={i} onSwipe={this.onSwipe.bind(this)} style={{flex:1}} data={o} />
        })}
      </View>

    </View>)
  }
}

export default connect(state=>({
  device: (_find(state.deviceList.list, {id:state.deviceList.selected}) || _find(state.deviceList.slist, {id:state.deviceList.selected})),
  pmChart: [{
    xVals:_map(state.deviceList.chart,'time'),
    dataSet:[{
      yVals:_map(state.deviceList.chart,'pm1'),
      colors:[0]
    },{
      yVals:_map(state.deviceList.chart,'pm25'),
      colors:[0]
    },{
      yVals:_map(state.deviceList.chart,'pm10'),
      colors:[0]
    }]
  }],
  thChart: [{
    xVals:_map(state.deviceList.chart,'time'),
    dataSet:[{
      yVals:_map(state.deviceList.chart,'temperature'),
      colors:[0]
    }]
  },{
    xVals:_map(state.deviceList.chart,'time'),
    dataSet:[{
      yVals:_map(state.deviceList.chart,'humidity'),
      colors:[0]
    }]
  }]
}),dispatch=>({
  action: bindActionCreators({
    pmList: action.pmList
  }, dispatch)
}))(V);
