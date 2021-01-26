import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { loadFromLocalStorage, saveToLocalStorage } from './helpers/localStorage';

import { AppReducer } from './reducers/AppReducer';
import { AuthReducer } from './reducers/AuthReducer';

const rootReducer = combineReducers({
    app: AppReducer,
    auth: AuthReducer,
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
    });
});

export default store;
