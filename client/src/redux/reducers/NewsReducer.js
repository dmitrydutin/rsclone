import { NewsAPI } from '../../api/api';

const SET_POSTS = '/news/SET_POSTS';
const SET_POST = '/news/SET_POST';
const SET_COMMENTS = '/news/SET_COMMENTS';
const SET_COMMENT = '/news/SET_COMMENT';
const SET_LIKE = '/news/SET_LIKE';

const initialState = {
    posts: [],
};

export const NewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: [...action.posts],
            };
        case SET_POST:
            return {
                ...state,
                posts: [action.post, ...state.posts],
            };
        case SET_COMMENTS:
            return {
                ...state,
                posts: state.posts.map((post, index) => {
                    if (index === action.index) {
                        post.comments = [...action.comments].reverse();
                        post.commentsCount = action.comments.length;
                    }
                    return post;
                }),
            };
        case SET_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post, index) => {
                    if (index === action.index) {
                        if (!post.comments) {
                            post.comments = [];
                        }
                        post.comments.push(action.comment);
                        post.commentsCount++;
                    }
                    return post;
                }),
            };
        case SET_LIKE:
            return {
                ...state,
                posts: state.posts.map((post, index) => {
                    if (index === action.index) {
                        if (action.like === 1) {
                            post.likes.splice(
                                post.likes.findIndex(
                                    (item) =>
                                        item.userId === action.userId &&
                                        item.postId === action.postId,
                                ),
                                1,
                            );
                        } else {
                            post.likes.push(action.like);
                        }
                    }
                    return post;
                }),
            };
        default:
            return state;
    }
};

const setPostsAction = (posts) => ({
    type: SET_POSTS,
    posts,
});

const setPostAction = (post) => ({
    type: SET_POST,
    post,
});

const setCommentsAction = (comments, index) => ({
    type: SET_COMMENTS,
    comments,
    index,
});

const setCommentAction = (comment, index) => ({
    type: SET_COMMENT,
    comment,
    index,
});

const setLikeAction = (like, userId, postId, index) => ({
    type: SET_LIKE,
    like,
    userId,
    postId,
    index,
});

export const getPosts = (token) => {
    return async (dispatch) => {
        const response = await NewsAPI.getPosts(token);

        if (response.status === 200 && response.data.status === 200) {
            const { posts } = response.data;

            dispatch(setPostsAction(posts));
        }
    };
};

export const setPost = ({ token, query, setSubmitting }) => {
    return async (dispatch) => {
        const response = await NewsAPI.sendPost(token, query);
        setSubmitting(false);

        if (response.status === 200 && response.data.status === 200) {
            const { post } = response.data;

            dispatch(
                setPostAction({
                    ...post,
                    likes: [],
                    commentsCount: 0,
                }),
            );
        }
    };
};

export const setComment = ({ posts, post, token, query, setSubmitting }) => {
    return async (dispatch) => {
        const index = posts.findIndex((el) => {
            return el.id === post.id;
        });

        const response = await NewsAPI.sendComment(token, query);

        setSubmitting(false);

        if (response.status === 200 && response.data.status === 200) {
            const { comment } = response.data;

            dispatch(
                setCommentAction(
                    {
                        ...comment,
                    },
                    index,
                ),
            );
        }
    };
};

export const getComments = ({ posts, postId, token }) => {
    return async (dispatch) => {
        const index = posts.findIndex((el) => {
            return el.id === postId;
        });

        const response = await NewsAPI.getComments(token, postId);

        if (response.status === 200 && response.data.status === 200) {
            const { comments } = response.data;
            dispatch(setCommentsAction(comments, index));
        }
    };
};

export const setLike = ({ posts, postId, userId, token }) => {
    return async (dispatch) => {
        const index = posts.findIndex((el) => {
            return el.id === postId;
        });

        const response = await NewsAPI.setLike(token, { postId });

        if (response.status === 200 && response.data.status === 200) {
            const { like } = response.data;

            dispatch(setLikeAction(like, userId, postId, index));
        }
    };
};
