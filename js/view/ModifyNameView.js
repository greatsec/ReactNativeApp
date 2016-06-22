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
    this.state = {
      name: this.props.name
    };
  }
  componentDidMount(){
  }

  onPressSubmit(){
    let {name} = this.state;
    this.props.action.userUpdate({name}).then(action=>{
      if(!action.error) Actions.pop();
    })
  }
  render(){
    return (
      <View style={{marginTop:100}}>

        <View>
          <Text >修改姓名</Text>
        </View>

        <View>
          <TextInput onChangeText={name=>this.setState({name})} style={{height:40}} value={this.state.name}/>
        </View>

        <TouchableOpacity onPress={this.onPressSubmit.bind(this)}>
          <Text>提交</Text>
        </TouchableOpacity>


      </View>);
  }
}

export default connect(state=>({
  name: state.loginUser.user.name
}))(V);

export default connect(state=>({
  name: state.loginUser.user.name
}),dispatch=>({
  action: bindActionCreators({
    userUpdate: action.userUpdate,
  }, dispatch)
}))(V);
