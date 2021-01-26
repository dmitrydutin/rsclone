import { NewsAPI } from '../../api/api';
const INIT_POSTS = 'INIT_POSTS',
    FETCH_INIT_POSTS = 'FETCH_INIT_POSTS',
    FETCH_UPDATE_POSTS = 'FETCH_UPDATE_POSTS',
    UPDATE_POSTS = 'UPDATE_POSTS';
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
        default:
            return state;
    }
};

const newsMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case INIT_POSTS:
            console.log(action.token);
            NewsAPI.getPosts(action.token)
                .then((response) => {
                    console.log(response.data);
                    return response.data;
                })
                .then((el) => {
                    console.log('POSTS INITED');
                    store.dispatch({
                        type: 'FETCH_INIT_POSTS',
                        query: el,
                    });
                });
            break;
        case UPDATE_POSTS:
            NewsAPI.sendPost(action.token, action.query).then(() => {
                store.dispatch({
                    type: 'FETCH_UPDATE_POSTS',
                    query: action.query,
                });
            });
            break;
        default:
            break;
    }

    next(action);
};

export { newsMiddleware };
export { NewsReducer };
