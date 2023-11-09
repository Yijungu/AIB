import rootReducer from './reducers';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const enhancer = composeWithDevTools(applyMiddleware(logger));
const store = createStore(rootReducer, enhancer);

export default store;
