import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { loadFromLocalStorage, saveToLocalStorage } from './helpers/localStorage';

import { AppReducer } from './reducers/AppReducer';
import { AuthReducer } from './reducers/AuthReducer';
import { ChatReducer } from './reducers/ChatReducer';
import { NewsReducer } from './reducers/NewsReducer';
import { ProfileReducer } from './reducers/ProfileReducer';

const rootReducer = combineReducers({
    app: AppReducer,
    auth: AuthReducer,
    chat: ChatReducer,
    news: NewsReducer,
    profile: ProfileReducer,
});

const store = createStore(
    rootReducer,
    loadFromLocalStorage(),
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

store.subscribe(() => {
    saveToLocalStorage({
        auth: {
            token: store.getState().auth.token,
        },
        app: {
            theme: store.getState().app.theme,
            language: store.getState().app.language,
        },
    });
});

export default store;
