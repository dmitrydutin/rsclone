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

export const login = (login, password, setSubmitting, setErrors) => {
    return async (dispatch) => {
        const response = await AuthAPI.login(login, password);
        setSubmitting(false);

        if (response.status === 200) {
            if (response.data.status === 200) {
                const { user, token } = response.data;
                dispatch(setUserDataAction(true, user, token));
            } else {
                setErrors({ login: response.data.reason });
            }
        }
    };
};

export const join = (name, surname, login, password, setSubmitting, setErrors) => {
    return async (dispatch) => {
        const response = await AuthAPI.join(name, surname, login, password);
        setSubmitting(false);

        if (response.status === 200) {
            if (response.data.status === 200) {
                const { user, token } = response.data;
                dispatch(setUserDataAction(true, user, token));
            } else {
                setErrors({ login: response.data.reason });
            }
        }
    };
};

export const getAuthUserData = (token) => {
    return async (dispatch) => {
        const response = await AuthAPI.me(token);

        if (response.status === 200 && response.data.status === 200) {
            const { user } = response.data;
            dispatch(setUserDataAction(true, user, token));
        }

        return response;
    };
};

export const logout = (token) => {
    return async (dispatch) => {
        const response = await AuthAPI.logout(token);

        if (response.status === 200 && response.data.status === 200) {
            dispatch(setUserDataAction(false, {}, null));
        }
    };
};
