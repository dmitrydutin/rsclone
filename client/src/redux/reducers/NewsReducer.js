import { NewsAPI } from '../../api/api';
const INIT_POSTS = 'INIT_POSTS',FETCH_INIT_POSTS = 'FETCH_INIT_POSTS',
    UPDATE_POSTS = 'UPDATE_POSTS';
const initialState = {
    arrPost: [],
};

const NewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POSTS:
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
    if (action.type == INIT_POSTS) {
        NewsAPI.getPosts()
            .then((response) => response.data)
            .then((el) => {
                store.dispatch({
                    type: 'FETCH_INIT_POSTS',
                    query: el,
                });
                console.log('INIT_POSTS');
            });
    }    
    next(action);
};

export { newsMiddleware };
export { NewsReducer };
