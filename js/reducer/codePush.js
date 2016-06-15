import { handleActions } from 'redux-actions';

export var codePush = handleActions({
  'codePush/getUpdateMetadata':(state, action) => action.payload ? {...action.payload} : state
},{})
