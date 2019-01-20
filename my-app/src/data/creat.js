import {createStore,combineReducers,applyMiddleware} from 'redux'

import signReducer from './reducers/sign'

const reducers = {
  sign: signReducer
};

const middlewares = [];

let finalCreateStore = applyMiddleware(...middlewares)(createStore);

export default const store = finalCreateStore(reducers);



