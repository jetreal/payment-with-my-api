import { combineReducers, createStore, applyMiddleware } from "redux";
import { reducer as formReducer } from 'redux-form';
import LoginReducer from "./reducers/LoginReducer";
import MainReducer from "./reducers/MainReducer";

import ReduxThunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga'
import rootSaga from "./sagas";


const sagaMiddleware = createSagaMiddleware()

const middleware = [ReduxThunk, sagaMiddleware]

let reducers = combineReducers({
  LoginReducer,
  MainReducer,
  form: formReducer
})

let store = createStore(
  reducers,
  applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSaga)

// window.store = store;

export default store;

