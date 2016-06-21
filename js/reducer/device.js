import { handleActions } from 'redux-actions';

import _map from 'lodash/map';
import _find from 'lodash/find';

export var deviceList = handleActions({
  deviceListResult: (state, action) => (
    {...state,
      rawList:action.payload,
      list: _map(action.payload, (o)=>({
        id:o.id,
        name:o.name,
        data:o.pm,
        online:o.online,
        code:o.code,
      }))
    }),
  SELECT_DEVICE: (state, action) => ({...state, selected:action.payload}),
  deviceRealtimeData: (state, action) => {
    if(action.error) return state;
    let { send: code, recv } = action.payload;
    let arr = recv.split(',');
    if(arr[0] != '403') return state;
    let newList = state.list.map((o)=>{
      if(o.code == code){
        o.data.pm1 = arr[1];
        o.data.pm25 = arr[2];
        o.data.pm10 = arr[3];
        o.data.temperature = arr[4];
        o.data.humidity = arr[5];
      }
      return o;
    })

    return {...state, list:newList}
  }
},{
  rawList:[],
  list:[],
});
