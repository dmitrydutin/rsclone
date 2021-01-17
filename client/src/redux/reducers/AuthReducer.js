import { AuthAPI } from '../../api/api.js';

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    isAuth: false,
    role: null,
};

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

const setUserDataAction = (isAuth, role) => {
    return {
        type: SET_USER_DATA,
        payload: { isAuth, role },
    };
};

export const login = (login, password, setSubmitting) => {
    return async (dispatch) => {
        const response = await AuthAPI.login(login, password);
        setSubmitting(false);

        if (response.status === 200) {
            const { isAuth, role } = response.data;
            dispatch(setUserDataAction(isAuth, role));
        }
    };
};
