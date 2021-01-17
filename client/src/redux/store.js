import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { myMiddleware } from './middlewares/NewsMiddlewares';

import { AuthReducer } from './reducers/AuthReducer';
import { NewsReducer } from './reducers/NewsReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    news: NewsReducer,
});

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware, myMiddleware)),
);
