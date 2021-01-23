import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { AuthReducer } from './reducers/AuthReducer';
import { NewsReducer, newsMiddleware } from './reducers/NewsReducer';
import { PicReducer } from './reducers/PicReducer';
import { ThemeReducer } from './reducers/ThemeReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    news: NewsReducer,
    newsPic: PicReducer,
    theme: ThemeReducer,
});

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware, newsMiddleware)),
);
