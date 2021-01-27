import { NewsAPI } from '../../api/api';

const INIT_POSTS = 'INIT_POSTS';
const FETCH_INIT_POSTS = 'FETCH_INIT_POSTS';
const FETCH_UPDATE_POSTS = 'FETCH_UPDATE_POSTS';
const UPDATE_POSTS = 'UPDATE_POSTS';
const ADD_COMMENTS = 'ADD_COMMENTS';
const FETCH_ADD_COMMENTS = 'FETCH_ADD_COMMENTS';
const initialState = {
    arrPost: [],
};

const NewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_UPDATE_POSTS:
            return { ...state, arrPost: [action.query, ...state.arrPost] };
        case FETCH_INIT_POSTS:
            return {
                arrPost: action.query,
            };
        case FETCH_ADD_COMMENTS:
            state.arrPost[action.index].comments.push(action.query);
            return {...state,
            };
        default:
            return state;
    }
};

const newsMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case INIT_POSTS:
            NewsAPI.getPosts(action.token)
                .then((response) => {
                    return response.data;
                })
                .then((el) => {
                    // el.list.forEach((element) => {
                    //     element.comment = [];
                    // });
                    store.dispatch({
                        type: 'FETCH_INIT_POSTS',
                        query: el.list,
                    });
                });
            break;
        case UPDATE_POSTS:
            NewsAPI.sendPost(action.token, action.query).then(() => {
                const newPost = { ...action.query, comments: [] };
                store.dispatch({
                    type: 'FETCH_UPDATE_POSTS',
                    query: newPost,
                });
            });
            break;
        case ADD_COMMENTS:
            const index = store.getState().news.arrPost.findIndex((el) => {
                return el.id === action.post.id;
            });
            console.log(action.query);
            const res = NewsAPI.sendComment(action.token, action.query);
            console.log(res);
            store.dispatch({
                type: 'FETCH_ADD_COMMENTS',
                query: action.query,
                index,
            });

            break;
        default:
            break;
    }

    next(action);
};

export {NewsReducer, newsMiddleware };
