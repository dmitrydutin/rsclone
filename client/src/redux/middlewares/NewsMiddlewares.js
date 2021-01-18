import { NewsAPI } from '../../api/api';

const UPDATE_POSTS = 'UPDATE_POSTS',
    INIT_POSTS = 'INIT_POSTS',
    FETCH = 'FETCH',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE';

const myMiddleware = (store) => (next) => (action) => {
    //try {

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
    // } catch (err) {
    //     store.dispatch({ type: FAILURE });
    // }
    next(action);
};

export { myMiddleware };
