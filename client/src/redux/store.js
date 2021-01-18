import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { myMiddleware } from './middlewares/NewsMiddlewares';
import { myPicMiddleware } from './middlewares/NewsPicMiddleware';

import { AuthReducer } from './reducers/AuthReducer';
import { NewsReducer } from './reducers/NewsReducer';
import { PicReducer } from './reducers/PicReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    news: NewsReducer,
    newsPic: PicReducer,
});

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware, myMiddleware, myPicMiddleware)),
);
