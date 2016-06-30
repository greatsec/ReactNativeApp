import React, { Component } from 'react';
import {
  Image,
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

  render(){
    return (
        <ScrollView
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)}/>}
          >
          {this.props.bbs.list.map((o)=>{
            return (<View key={o.id} style={{borderBottomWidth:1, borderColor:'#BCBCBC',marginTop:2}}>
              <View style={{flexDirection:'row', marginTop:10, marginLeft:5,marginRight:5}}>
                <Text style={{flex:1,fontSize:18,color:'#000'}}>{o.createName}</Text>
                <Text style={{fontSize:15,color:'#8A8A8A'}}>{o.createDate}</Text>
              </View>

              <View style={{flexDirection:'row',marginLeft:5,marginRight:5,marginTop:5}}>

              {o.imageList.map((o2)=>{
                return (
                  <Image key={o2.image} source={{uri:'http://www.tdong.cn/'+o2.image}} style={{width:100,height:100,margin:1}} />
                );
              })}
              </View>
              <Text>{o.content}</Text>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}></View>
                <TouchableOpacity onPress={()=>Actions.bbsAddReply({id:o.id})} style={{marginRight:5}}>
                  <Text>回复</Text>
                </TouchableOpacity>
              </View>

              <View style={{marginBottom:10, marginLeft:5,marginRight:5}}>
                {o.replyList.map((o2)=>{
                  return (<View key={o2.id}>
                    <Text>
                    <Text style={{fontSize:15,color:'#3668BE'}}>{o2.createName||'匿名'}:</Text>
                    <Text style={{fontSize:15,color:'#000'}}>{o2.content}</Text></Text>
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
    bbsPage: action.bbsPage
  }, dispatch)
}))(V);
