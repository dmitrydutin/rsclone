import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { AuthReducer } from './reducers/AuthReducer';

const rootReducer = combineReducers({
    auth: AuthReducer
});

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
