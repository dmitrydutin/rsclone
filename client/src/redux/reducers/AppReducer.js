import { getAuthUserData } from './AuthReducer';

const SET_INITIALIZED_SUCCESS = '/app/SET_INITIALIZED_SUCCESS';
const CHANGE_THEME = '/app/CHANGE_THEME';
const CHANGE_LANGUAGE = '/app/CHANGE_LANGUAGE';

const initialState = {
    initialized: false,
    theme: 'light',
    language: 'english',
};

export const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };
        case CHANGE_THEME:
            return {
                ...state,
                theme: action.theme,
            };
        case CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language,
            };
        default:
            return state;
    }
};

const initializedSuccess = () => ({
    type: SET_INITIALIZED_SUCCESS,
});

const setThemeAction = (theme) => ({
    type: CHANGE_THEME,
    theme,
});

const setLanguageAction = (language) => ({
    type: CHANGE_LANGUAGE,
    language,
});

export const initializeApp = (token) => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData(token));

        promise.then(() => {
            dispatch(initializedSuccess());
        });
    };
};

export const setTheme = (theme) => {
    return (dispatch) => {
        dispatch(setThemeAction(theme));
    };
};

export const setLanguage = (language) => {
    return (dispatch) => {
        dispatch(setLanguageAction(language));
    };
};
