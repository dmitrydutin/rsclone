import { getAuthUserData } from './AuthReducer';

const SET_INITIALIZED_SUCCESS = '/app/SET_INITIALIZED_SUCCESS';

const initialState = {
    initialized: false,
};

export const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

const initializedSuccess = () => ({
    type: SET_INITIALIZED_SUCCESS,
});

export const initializeApp = (token) => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData(token));

        promise.then(() => {
            dispatch(initializedSuccess());
        });
    };
};
