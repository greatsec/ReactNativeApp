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

import { LineChart } from 'react-native-chart';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  onSwipe(direction){
    this.setState({direction});
  }
  render(){
    return (<View style={{marginTop:100}}>
      <Text>{JSON.stringify(this.state.direction)}</Text>
      <LineChart onSwipe={this.onSwipe.bind(this)} style={{height:100}} data={{xVals:['1','2','3'],dataSet:[{yVals:[1,2,3], colors:[0]}]}} />
    </View>)
  }
}

export default connect()(V);
