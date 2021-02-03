import { ProfileAPI, cloudinary } from '../../api/api.js';

const SET_USER_DATA = '/profile/SET_USER_DATA';
const SET_POSTS_COUNT = '/profile/SET_POSTS_COUNT';
const SET_LIKES_COUNT = '/profile/SET_LIKES_COUNT';
const SET_COMMENTS_COUNT = '/profile/SET_COMMENTS_COUNT';

const initialState = {
    user: null,
    postsCount: 0,
    likesCount: 0,
    commentsCount: 0,
};

export const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                user: { ...action.user },
            };
        case SET_POSTS_COUNT:
            return {
                ...state,
                postsCount: action.postsCount,
            };
        case SET_LIKES_COUNT:
            return {
                ...state,
                likesCount: action.likesCount,
            };
        case SET_COMMENTS_COUNT:
            return {
                ...state,
                commentsCount: action.commentsCount,
            };
        default:
            return state;
    }
};

const setUserDataAction = (user) => ({
    type: SET_USER_DATA,
    user,
});

const setPostsCountAction = (postsCount) => ({
    type: SET_POSTS_COUNT,
    postsCount,
});

const setLikesCountAction = (likesCount) => ({
    type: SET_LIKES_COUNT,
    likesCount,
});

const setCommentsCountAction = (commentsCount) => ({
    type: SET_COMMENTS_COUNT,
    commentsCount,
});

export const getUserData = (token, id) => {
    return async (dispatch) => {
        const response = await ProfileAPI.getUserData(token, id);

        if (response.status === 200 && response.data.status === 200) {
            const { user } = response.data;
            dispatch(setUserDataAction(user));
        }
    };
};

export const getPostsCount = (token, userId) => {
    return async (dispatch) => {
        const response = await ProfileAPI.getPostsCount(token, userId);

        if (response.status === 200 && response.data.status === 200) {
            const { postsCount } = response.data;
            dispatch(setPostsCountAction(postsCount));
        }
    };
};

export const getLikesCount = (token, userId) => {
    return async (dispatch) => {
        const response = await ProfileAPI.getLikesCount(token, userId);

        if (response.status === 200 && response.data.status === 200) {
            const { likesCount } = response.data;
            dispatch(setLikesCountAction(likesCount));
        }
    };
};

export const getCommentsCount = (token, userId) => {
    return async (dispatch) => {
        const response = await ProfileAPI.getCommentsCount(token, userId);

        if (response.status === 200 && response.data.status === 200) {
            const { commentsCount } = response.data;
            dispatch(setCommentsCountAction(commentsCount));
        }
    };
};

export const editUserData = (token, userId, user, setSubmitting) => {
    return async (dispatch) => {
        const response = await ProfileAPI.editUserData(token, userId, user);
        setSubmitting(false);

        if (response.status === 200 && response.data.status === 200) {
            const { user } = response.data;
            dispatch(setUserDataAction(user));
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
            setFieldValue('avatar', secure_url);
        }
    };
};
