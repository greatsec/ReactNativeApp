import {
  AsyncStorage,
} from 'react-native';

import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';


import promise from 'redux-promise';
import thunk from 'redux-thunk';

import reducer from '../reducer';


export default configStore = (onComplete)=>{

  var createAppStore = applyMiddleware(
    promise,
    thunk,
    createLogger()
  )(createStore);
  const store = createAppStore(reducer,autoRehydrate());
  persistStore(store, { storage: AsyncStorage, whitelist:['loginForm','loginUser'], log:true}, onComplete);
  return store;
}
