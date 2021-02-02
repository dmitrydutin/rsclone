import { ChatAPI } from '../../api/api';

const SET_MESSAGES = '/chat/SET_MESSAGES';
const SET_DIALOGS = '/chat/SET_DIALOGS';

const initialState = {
    messages: [],
    dialogs: [],
};

export const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state,
                messages: [...action.messages],
            };
        case SET_DIALOGS:
            return {
                ...state,
                dialogs: [...action.dialogs],
            };
        default:
            return state;
    }
};

const setMessagesAction = (messages) => ({
    type: SET_MESSAGES,
    messages,
});

const setDialogsAction = (dialogs) => ({
    type: SET_DIALOGS,
    dialogs,
});

export const getMessages = (token, dialogId) => {
    return async (dispatch) => {
        const response = await ChatAPI.getMessages(token, dialogId);

        if (response.status === 200 && response.data.status === 200) {
            const { messages } = response.data;
            dispatch(setMessagesAction(messages));
        }
    };
};

export const getDialogs = (token, userId) => {
    return async (dispatch) => {
        const response = await ChatAPI.getDialogs(token, userId);
        console.log(response);
        if (response.status === 200 && response.data.status === 200) {
            const { dialogs } = response.data;
            dispatch(setDialogsAction(dialogs));
        }
    };
};
