import { createAction } from 'redux-actions';
import { getSSID, startConfig, stopConfig } from 'react-native-nufront-wifi';
import action from '../action';

var deviceRefreshStatus = createAction('DEVICE_REFRESH_STATUS');

export var deviceRefresh = () => dispatch => {
  dispatch(deviceRefreshStatus(true));

  let {deviceList, deviceShareForMeList} = action;
  return Promise.all([
    dispatch(deviceList()),
    dispatch(deviceShareForMeList())
  ]).then(()=>dispatch(deviceRefreshStatus(false)));
};

var _selectDevice = createAction('SELECT_DEVICE');

export var selectDevice = (id) => dispatch => {
  dispatch(_selectDevice(id));
};

var _getCurrentWifiSSIDResult = createAction('GET_CURRENT_WIFI_SSID_RESULT');
export var getCurrentWifiSSID = () => dispatch => {
  getSSID((ssid)=>dispatch(_getCurrentWifiSSIDResult(ssid)));
};

export var saveWifiConfig = createAction('SAVE_WIFI_CONFIG');


export var startWifiConfig = createAction('WIFI_CONFIG_RESULT',
  params=>startConfig(params.ssid, params.key, params.code));

export var stopWifiConfig = createAction('STOP_WIFI_CONFIG', ()=>stopConfig());

export var changeChart = createAction('changeChart');

let geocoder = (params) => {
    let ak = 'zxZIPbW4VitTIoK27W2PSmafS4sq5tuY';
    let location = [params.latitude,params.longitude].join(',');
    return fetch(`http://api.map.baidu.com/geocoder/v2/?output=json&ak=${ak}&location=${location}`)
      .then(response=>response.json())
  };

const _updateDeviceDetailAddress = createAction('_updateDeviceDetailAddress');
export const updateDeviceDetailAddress = (id, latitude, longitude) => dispatch => {

  geocoder({latitude,longitude}).then(json=>{
    if(json.status==0){
        let { formatted_address } = json.result;
        dispatch(_updateDeviceDetailAddress({id,formatted_address}));
    }else{
    }
  });
};
