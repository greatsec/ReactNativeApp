import React, { Component } from 'react';
import {
  RefreshControl,
  ScrollView,
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
      refreshing:false
    };
  }

  componentDidMount(){
    this.setState({refreshing:true});
    this.props.action.bbsPage({pageNo:1,pageSize:10}).then(action=>{
      this.setState({refreshing:false});
    });
  }

  onRefresh(){
    this.setState({refreshing:true});
    this.props.action.bbsPage({pageNo:1,pageSize:10}).then(action=>{
      this.setState({refreshing:false});
    });
  }
  onPressReplay(id){
    this.props.action.bbsAddReply({
      id, content:'content_111', address:'address_222'
    });
  }
  render(){
    return (
        <ScrollView
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)}/>}
          style={{marginTop:100}}>
          {this.props.bbs.list.map((o)=>{
            return (<View key={o.id} style={{borderWidth:1,marginTop:2}}>
              <Text>{o.content}</Text>
              <TouchableOpacity onPress={()=>this.onPressReplay(o.id)}>
                <Text>回复</Text>
              </TouchableOpacity>
              <View>
                {o.replyList.map((o2)=>{
                  return (<View key={o2.id}>
                    <Text>{o2.createName||'匿名'}:{o2.content}</Text>
                  </View>);
                })}
              </View>
            </View>)
          })}

          <TouchableOpacity onPress={Actions.bbsAdd}>
            <Text>添加</Text>
          </TouchableOpacity>
        </ScrollView>
      );
  }
}

export default connect(state=>({
  bbs: state.bbs
}),dispatch=>({
  action: bindActionCreators({
    bbsPage: action.bbsPage,
    bbsAddReply: action.bbsAddReply
  }, dispatch)
}))(V);
