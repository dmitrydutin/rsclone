import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { loadFromLocalStorage, saveToLocalStorage } from './helpers/localStorage';

import { AppReducer } from './reducers/AppReducer';
import { AuthReducer } from './reducers/AuthReducer';
import { NewsReducer } from './reducers/NewsReducer';

const rootReducer = combineReducers({
    app: AppReducer,
    auth: AuthReducer,
    news: NewsReducer,
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
