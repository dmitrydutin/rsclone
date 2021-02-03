import { ChatAPI, cloudinary } from '../../api/api';

const SET_MESSAGES = '/chat/SET_MESSAGES';
const SET_DIALOGS = '/chat/SET_DIALOGS';
const SET_MESSAGE = '/chat/SET_MESSAGE';

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
        case SET_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message],
            };
        default:
            return state;
    }
};

const setMessagesAction = (messages) => ({
    type: SET_MESSAGES,
    messages,
});

const setMessageAction = (message) => ({
    type: SET_MESSAGE,
    message,
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

export const getDialogs = (token, userId, searchInput) => {
    return async (dispatch) => {
        const response = await ChatAPI.getDialogs(token, userId, searchInput);

        if (response.status === 200 && response.data.status === 200) {
            const { dialogs } = response.data;
            dispatch(setDialogsAction(dialogs));
        }
    };
};

export const uploadImage = (event, setFieldValue, setSubmitting) => {
    return async () => {
        setSubmitting(true);
        const response = await cloudinary.uploadImage(event.target.files[0]);
        setSubmitting(false);

        if (response.status === 200) {
            const { secure_url } = response.data;
            setFieldValue('uploadFile', secure_url);
        }
    };
};

export const createMessage = (token, message, url, dialogId, userId, setSubmitting) => {
    return async (dispatch) => {
        const response = await ChatAPI.createMessage(token, message, url, dialogId, userId);
        setSubmitting(false);

        if (response.status === 200 && response.data.status === 200) {
            const { message } = response.data;
            dispatch(setMessageAction(message));
        }
    };
};
