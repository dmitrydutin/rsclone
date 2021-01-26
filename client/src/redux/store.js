import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { loadFromLocalStorage, saveToLocalStorage } from './helpers/localStorage';

import { AuthReducer } from './reducers/AuthReducer';
import { LangReducer } from './reducers/LangReducer';
import { NewsReducer, newsMiddleware } from './reducers/NewsReducer';
import { PicReducer } from './reducers/PicReducer';
import { ThemeReducer } from './reducers/ThemeReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,

    news: NewsReducer,
    newsPic: PicReducer,
    theme: ThemeReducer,
    lang: LangReducer,
});

const store = createStore(
    rootReducer,
    loadFromLocalStorage(),
    composeWithDevTools(applyMiddleware(thunkMiddleware,newsMiddleware)),
);

store.subscribe(() => {
    saveToLocalStorage({
        auth: {
            token: store.getState().auth.token,
        },
    });
});

export default store;
