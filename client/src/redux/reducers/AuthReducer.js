import { AuthAPI } from '../../api/api';

const SET_USER_DATA = '/auth/SET_USER_DATA';

const initialState = {
    isAuth: false,
    user: {},
    token: null,
};

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                isAuth: action.isAuth,
                user: { ...action.user },
                token: action.token,
            };
        default:
            return state;
    }
};

const setUserDataAction = (isAuth, user, token) => {
    return {
        type: SET_USER_DATA,
        isAuth,
        user,
        token,
    };
};

export const login = (login, password, setSubmitting) => {
    return async (dispatch) => {
        const response = await AuthAPI.login(login, password);
        setSubmitting(false);

        if (response.status === 200) {
            const { user, token } = response.data;
            dispatch(setUserDataAction(true, user, token));
        } else {
            console.log('Auth error', response);
        }
    };
};

export const join = (name, surname, login, password, setSubmitting) => {
    return async (dispatch) => {
        const response = await AuthAPI.join(name, surname, login, password);
        setSubmitting(false);

        if (response.status === 200) {
            const { user, token } = response.data;
            dispatch(setUserDataAction(true, user, token));
        } else {
            console.log('Auth error', response);
        }
    };
};
